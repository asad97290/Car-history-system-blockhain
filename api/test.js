const axios = require("axios");
const url = "http://localhost:4000/channels/mychannel/chaincodes/fabcar";
// let pk = null;
const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTgwMDkxMjQsInVzZXJDbmljIjoiNDIxMDE1Njc0NjUwIiwib3JnTmFtZSI6Ik9yZzEiLCJpYXQiOjE2MTc5NzMxMjR9.n-f-Kp6f1sXTyQLd_fA9obL-qtWvXu9WOqX90GBktpo'
  // let conf = {
//   headers: {
//     Authorization: `Bearer ${token}`,
//     "Content-Type": "application/json",
//   },
// };

const register = async () => {
	let d = {
	  userCnic: "421015674650",
	  orgName: "Org1",
	};
	try {
	  let resp = await axios.post("http://localhost:4000/users", d, {
		headers: { "Content-Type": "application/json" },
	  });
	  console.log("-----------------",resp.data);
	} catch (error) {
	  return error;
	}
  };
  // register()

const login = async () => {
  let d = {
    userCnic: "421015674650",
    orgName: "Org1",
	certificate:JSON.stringify(`-----BEGIN CERTIFICATE-----\nMIIChjCCAiygAwIBAgIUPEh6JD5tQ31ZIj6lRnRrZ8oqAJgwCgYIKoZIzj0EAwIw\naDELMAkGA1UEBhMCVVMxFzAVBgNVBAgTDk5vcnRoIENhcm9saW5hMRQwEgYDVQQK\nEwtIeXBlcmxlZGdlcjEPMA0GA1UECxMGRmFicmljMRkwFwYDVQQDExBmYWJyaWMt\nY2Etc2VydmVyMB4XDTIxMDQwOTEyNTEwMFoXDTIyMDQwOTEyNTYwMFowSTEwMA0G\nA1UECxMGY2xpZW50MAsGA1UECxMEb3JnMTASBgNVBAsTC2RlcGFydG1lbnQxMRUw\nEwYDVQQDEww0MjEwMTU2NzQ2NTAwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAAS7\nVZw6/hCX4v8eFbodc1M4yJiWE2TdTVjTpz+NFqW6JAfxpyG5m9S6mhZ9JXEmeiVs\nyL6P0TYS4EgbguwkXHgDo4HSMIHPMA4GA1UdDwEB/wQEAwIHgDAMBgNVHRMBAf8E\nAjAAMB0GA1UdDgQWBBQbJDqtkJNZE8p4gbjgxvLPCuRh/jAfBgNVHSMEGDAWgBTk\nB4Ms1YDze8keml1fUP82+hquyDBvBggqAwQFBgcIAQRjeyJhdHRycyI6eyJoZi5B\nZmZpbGlhdGlvbiI6Im9yZzEuZGVwYXJ0bWVudDEiLCJoZi5FbnJvbGxtZW50SUQi\nOiI0MjEwMTU2NzQ2NTAiLCJoZi5UeXBlIjoiY2xpZW50In19MAoGCCqGSM49BAMC\nA0gAMEUCIQDQnRvM/irTy4WBd8eAJcUPpEliiZGf1OX4KMr4Sp2VagIgUzKWc9wJ\nuaT489iSWhCoUoks9MLgsTPpIXMUs2kXrZg=\n-----END CERTIFICATE-----\n`) 
}
	try {
    let resp = await axios.post("http://localhost:4000/users/login", d, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("------------",resp.data);
  } catch (error) {
    return error;
  }
};
// login()



const addCar = async (pk) => {


  let data = {
    fcn: "createCar",
    chaincodeName: "fabcar",
    channelName: "mychannel",
    args: ["1X5YZ4567891248HT","2017","bugatti","veyron","blue and black","4210123131231","https://carhistorypictures.s3-ap-southeast-1.amazonaws.com/bugatti.jpeg"]
};

  return axios
    .post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((resp) => {
      console.log(resp.data.result);
    })
    .catch(function (error) {
      console.log(error);
    });
};

addCar();



async function queryCar(){
    try {
        let resp = await axios.get(`http://localhost:4000/channels/mychannel/chaincodes/fabcar?args=["2X5YZ4567891248HT"]&fcn=queryCar`,{
          headers: { 
            Authorization: `Bearer ${token}`,  
            "Content-Type": "application/json" },
        });
        console.log("------------",resp.data);
      } catch (error) {
        return error;
    }
}


// queryCar()