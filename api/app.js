"use strict";
const log4js = require("log4js");
const logger = log4js.getLogger("BasicNetwork");
const util = require("util");
const express = require("express");
const app = express();
const path = require("path");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const expressJWT = require("express-jwt");
const jwt = require("jsonwebtoken");
const bearerToken = require("express-bearer-token");
const cors = require("cors");
const constants = require("./config/constants.json");
const https = require("https");
const fs = require("fs");
const nano = require("nano")("http://admin:password@localhost:5990");
// const host = process.env.HOST || constants.host;
const port = process.env.PORT || constants.port;

const helper = require("./app/helper");
const invoke = require("./app/invoke");
const query = require("./app/query");

app.options("*", cors());
app.use(cors());
let offDb;
let authDb;
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
// set secret variable
app.set("secret", "thisismysecret");
app.use(
  expressJWT({
    secret: "thisismysecret",
  }).unless({
    path: ["/users", "/users/login", "/profile-img-upload","/getCarHistory"],
  })
);
app.use(bearerToken());

logger.level = "debug";

app.use((req, res, next) => {
  logger.debug("New req for %s", req.originalUrl);
  if (
    req.originalUrl.indexOf("/users") >= 0 ||
    req.originalUrl.indexOf("/profile-img-upload") >= 0 ||
    req.originalUrl.indexOf("/users/login") >= 0 ||
    req.originalUrl.indexOf("/getCarHistory") >= 0
  ) {
    return next();
  }
  var token = req.token;
  jwt.verify(token, app.get("secret"), (err, decoded) => {
    if (err) {
      console.log(`Error ================:${err}`);
      res.send({
        success: false,
        message:
          "Failed to authenticate token. Make sure to include the " +
          "token returned from /users call in the authorization header " +
          " as a Bearer token",
      });
      return;
    } else {
      req.userCnic = decoded.userCnic;
      req.orgname = decoded.orgName;
      logger.debug(
        util.format(
          "Decoded from JWT token: userCnic - %s, orgname - %s",
          decoded.userCnic,
          decoded.orgName
        )
      );
      return next();
    }
  });
});

async function createOffChainDB() {
  try {

    offDb = nano.use("alice");
  } catch (e) {
    // failed
    console.error(e);
  }
}

async function createAuthDB() {
  try {
    const databases = await nano.db.list();
    if (databases.indexOf("auth") < 0) {
      await nano.db.create("auth");
    }
    authDb = nano.use("auth");
  } catch (e) {
    // failed
    console.error(e);
  }
}
createOffChainDB();
createAuthDB();

// var server = http.createServer(app).listen(port, function () {
//   console.log(`Server started on ${port}`);
// });

// logger.info("****************** SERVER STARTED ************************");
// logger.info("***************  http://%s:%s  ******************", host, port);
// server.timeout = 240000;

https
  .createServer(
    { key: fs.readFileSync("./asad.key"), cert: fs.readFileSync("./asad.crt") },
    app
  )
  .listen(port, () => {
    console.log(`Server started on  ${port}`);
  });

/*app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});*/

function getErrorMessage(field) {
  var response = {
    success: false,
    message: field + " field is missing or Invalid in the request",
  };
  return response;
}
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

const s3 = new aws.S3({
  accessKeyId: "AKIAJIMFQZGUCDYUCACA",
  secretAccessKey: "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",
  Bucket: "car-history-pic",
});

const profileImgUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "car-history-pic",
    acl: "public-read",
    key: function (req, file, cb) {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          "-" +
          Date.now() +
          path.extname(file.originalname)
      );
    },
  }),
  limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("profileImage");

// Register and enroll user
app.post("/users", async function (req, res) {
  var email = req.body.email;
  var userCnic = req.body.userCnic;
  var password = req.body.password;
  var orgName = req.body.orgName;
  logger.debug("End point : /users");
  logger.debug("Email : " + email);
  logger.debug("User name : " + userCnic);
  logger.debug("Org name  : " + orgName);
  if (!email) {
    res.json(getErrorMessage("'email'"));
    return;
  }
  if (!userCnic) {
    res.json(getErrorMessage("'userCnic'"));
    return;
  }
  if (!password) {
    res.json(getErrorMessage("'password'"));
    return;
  }
  if (!orgName) {
    res.json(getErrorMessage("'orgName'"));
    return;
  }

  let user = null;

  try {
    user = await authDb.get(email);    
  } catch(e) {
    console.error(e.statusCode);
  }

  if (user) {
    res.json({success: false, message: "A user with this email already exists!"});
    return;
  }

  try {
    const query = {
      selector: {
        cnic: { "$eq": userCnic},
      }
    };
    const users = await authDb.find(query);
    if (users.docs && users.docs.length > 0) {
      res.json({success: false, message: "A user with this CNIC already exists!"});
      return;
    }
  } catch(e) {
    console.error(e.statusCode);
  }

  let response = await helper.getRegisteredUser(userCnic, orgName, true);

  logger.debug(
    "-- returned from registering the userCnic %s for organization %s",
    userCnic,
    orgName
  );
  if (response && typeof response !== "string") {
    logger.debug(
      "Successfully registered the userCnic %s for organization %s",
      userCnic,
      orgName
    );

    let r = await authDb.insert({email: email, password, password, cnic: userCnic, org: orgName, x509Identity: response.x509Identity}, email);
    console.log('authDb Response', r);
    res.json(response);
  } else {
    logger.debug(
      "Failed to register the userCnic %s for organization %s with::%s",
      userCnic,
      orgName,
      response
    );
    res.json({ success: false, message: response });
  }
});

// Login and get jwt
app.post("/users/login", async function (req, res) {
  /*var userCnic = req.body.userCnic;*/
  var email = req.body.email;
  var password = req.body.password;

  logger.debug("End point : /users");
  logger.debug("Email : " + email);

  if (!email) {
    res.json(getErrorMessage("'email'"));
    return;
  }
  if (!password) {
    res.json(getErrorMessage("'password'"));
    return;
  }

  let user = null;
  try {
     user = await authDb.get(email);  
  } catch(e) {
    console.error(e.statusCode);
    res.json({success: false, message: "A user with this email does not exist!"});
    return;
  }
  console.log('user', user);

  if (password  !== user.password) {
    let response = {
      success: false,
      message: "Email/Password does not match!",
    };
    res.json(response);
    return;
  }

  let userCnic = user.cnic;
  let orgName = user.org;

  let certificate =  JSON.stringify(user.x509Identity.credentials.certificate);

  var token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + parseInt(constants.jwt_expiretime),
      email: email,
      userCnic: userCnic,
      orgName: orgName,
    },
    app.get("secret")
  );

  let isUserRegistered = await helper.isUserRegistered(
    userCnic,
    orgName,
    certificate
  );

  if (isUserRegistered) {
    res.json({ success: true, message: { token: token, userCnic: userCnic, orgName: orgName } });
  } else {
    res.json({
      success: false,
      message: `User with email ${email} is not registered with ${orgName}, Please register first.`,
    });
  }
});

// Invoke transaction on chaincode on target peers
app.post(
  "/channels/:channelName/chaincodes/:chaincodeName",
  async function (req, res) {
    try {
      logger.debug(
        "==================== INVOKE ON CHAINCODE =================="
      );
      var chaincodeName = req.params.chaincodeName;
      var channelName = req.params.channelName;
      var fcn = req.body.fcn;
      var args = req.body.args;
      logger.debug("channelName  : " + channelName);
      logger.debug("chaincodeName : " + chaincodeName);
      logger.debug("fcn  : " + fcn);
      logger.debug("args  : " + args);
      if (!chaincodeName) {
        res.json(getErrorMessage("'chaincodeName'"));
        return;
      }
      if (!channelName) {
        res.json(getErrorMessage("'channelName'"));
        return;
      }
      if (!fcn) {
        res.json(getErrorMessage("'fcn'"));
        return;
      }
      if (!args) {
        res.json(getErrorMessage("'args'"));
        return;
      }

      let message = await invoke.invokeTransaction(
        channelName,
        chaincodeName,
        fcn,
        args,
        req.userCnic,
        req.orgname,
        offDb
      );
      console.log(
        "message result is : -------------",
        JSON.stringify(message.result)
      );

      const response_payload = {
        result: message,
        error: null,
        errorData: null,
      };
      res.send(response_payload);
    } catch (error) {
      const response_payload = {
        result: null,
        error: error.name,
        errorData: error.message,
      };
      res.send(response_payload);
    }
  }
);

// Query transaction
app.get(
  "/channels/:channelName/chaincodes/:chaincodeName",
  async function (req, res) {
    try {
      logger.debug(
        "==================== QUERY BY CHAINCODE =================="
      );

      var channelName = req.params.channelName;
      var chaincodeName = req.params.chaincodeName;
      console.log(`chaincode name is :${chaincodeName}`);
      let args = req.query.args;
      let fcn = req.query.fcn;

      logger.debug("channelName : " + channelName);
      logger.debug("chaincodeName : " + chaincodeName);
      logger.debug("fcn : " + fcn);
      logger.debug("args : " + args);

      if (!chaincodeName) {
        res.json(getErrorMessage("'chaincodeName'"));
        return;
      }
      if (!channelName) {
        res.json(getErrorMessage("'channelName'"));
        return;
      }
      if (!fcn) {
        res.json(getErrorMessage("'fcn'"));
        return;
      }
      if (!args) {
        res.json(getErrorMessage("'args'"));
        return;
      }
      console.log("args==========>", args);
      args = args.replace(/'/g, '"');
      args = JSON.parse(args);
      logger.debug(args);
      console.log("------", req.userCnic);
      console.log("------", req.orgname);
      let message = await query.query(
        channelName,
        chaincodeName,
        args,
        fcn,
        req.userCnic,
        req.orgname
      );
      res.send(message);
    } catch (error) {
      const response_payload = {
        result: null,
        error: error.name,
        errorData: error.message,
      };
      res.send(response_payload);
    }
  }
);



app.get("/getCarHistory",async (req,res)=>{
  let vin = req.query.vin;
  let car = await offDb.get(vin)
  res.json({car})
})
//post car pics to aws s3
app.post("/profile-img-upload", (req, res) => {
  profileImgUpload(req, res, (error) => {
    console.log("request Ok", req.file);
    if (error) {
      console.log("errors", error);
      res.json({ error: error });
    } else {
      //  If File not found
      if (req.file === undefined) {
        console.log("Error: No File Selected!");
        res.json("Error: No File Selected");
      } else {
        //   If Success
        const imageName = req.file.key;
        const imageLocation = req.file.location; // Save the file name into database into profile model
        res.json({
          image: imageName,
          location: imageLocation,
        });
      }
    }
  });
});
