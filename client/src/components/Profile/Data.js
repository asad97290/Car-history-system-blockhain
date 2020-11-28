import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
  Tab,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

function Data() {
  const [ token,setToken ] = useState(() =>
    JSON.parse(localStorage.getItem("token"))
  );
  
  const [ email,setEmail ] = useState(() =>
    localStorage.getItem("email")
  );

  const [organization, setOrganization ] = useState(() =>
    localStorage.getItem("organization")
  );

  if (!token) {
    window.location.pathname = "/signin"
  }

  const url = "http://localhost:4000/channels/mychannel/chaincodes/fabcar";
  const url2 = url + `?args=["${email}"]&fcn=queryCarsByOwner`;
  
  let conf = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const [cars, setCars] = useState([]);
  const data = {};
  const [selectedFile, setSelectedFile] = useState({ selected: null });
  
  axios.get(url2, conf).then((response) => {
    setCars(response.data.result);
  });

  const singleFileChangedHandler = (event) => {
    setSelectedFile({
      selected: event.target.files[0],
    });
  };

  function singleFileUploadHandler(event) {
    event.preventDefault();
    let data = new FormData();
    if (selectedFile.selected) {
      data.append(
        "profileImage",
        selectedFile.selected,
        selectedFile.selected.name
      );
      axios
        .post("http://localhost:4000/profile-img-upload", data, {
          headers: {
            accept: "application/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          },
        })
        .then((response) => {
          if (200 === response.status) {
            // If file size is larger than expected.
            if (response.data.error) {
              if ("LIMIT_FILE_SIZE" === response.data.error.code) {
                console.log("LIMIT");
              } else {
                // If not the given file type
                console.log("Response ===> ", response.data);
              }
            } else {
              // Success
              createCarAsset(event, response.data.location);
              document.getElementById("vin").value = "";
              document.getElementById("make").value = "";
              document.getElementById("model").value = "";
              document.getElementById("color").value = "";
              document.getElementById("carImage").value = "";
              document.getElementById("year").value = "";
            }
          }
        })
        .catch((error) => {
          console.log("Error ===> ", error);
        });
    } else {
      // if file not selected throw error
      alert("Please upload file");
    }
  }
  function transferOwnership(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const args = [];
    for (let key of formData.keys()) {
      args.push(formData.get(key));
    }
    data["fcn"] = "changeCarOwner";
    data["chaincodeName"] = "fabcar";
    data["channelName"] = "mychannel";
    data["args"] = args;
    axios.post(url, data, conf).then(function (response) {alert("Success")});
    document.getElementById("carVin").value = "";
    document.getElementById("carOwner").value = "";
  }

  function changeCarColour(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const args = [];
    for (let key of formData.keys()) {
      args.push(formData.get(key));
    }
    data["fcn"] = "changeCarColor";
    data["chaincodeName"] = "fabcar";
    data["channelName"] = "mychannel";
    data["args"] = args;
    console.log("Color ===> ", data["args"][1])
    axios.post(url, data, conf).then(function (response) {alert("Success")});
    document.getElementById("carVin").value = "";
  }

  function createCarAsset(event, loc) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const args = [];
    for (let key of formData.keys()) {
      args.push(formData.get(key));
    }
    args.pop();
    args.push(email);
    args.push(loc);
    data["fcn"] = "createCar";
    data["chaincodeName"] = "fabcar";
    data["channelName"] = "mychannel";
    data["args"] = args;

    axios.post(url, data, conf).then(function (response) {alert("Success")}).catch(error => {alert("Something Went Wrong! Try Again.")});
    document.getElementById("carVin").value = "";
    document.getElementById("color").value = "";
    document.getElementById("make").value = "";
    document.getElementById("model").value = "";
    document.getElementById("year").value = "";
    document.getElementById("carOwner").value = "";
  }

  return (
    <Container className="mb-5">
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Success
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">Transaction Executed Successfully</div>
          </div>
        </div>
      </div>
      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
        <Row>
          <Col sm={8}>
            <Tab.Content>
              <Tab.Pane eventKey="#link1" className="text-center">
                <h4>My Car(s)</h4>
                <br />
                <div className="container">
                  <div className="row">
                    {cars.map((car, index) => {
                      return (
                        <div key={index} className="col-12 col-md-6 mb-4">
                          <div className="card p-3 d-flex align-content-between flex-wrap">
                            <div style={{ height: "150px"}}>
                              <img
                                src={car.carPic}
                                className="card-img-top mh-100 mw-100"
                                alt="..."
                              />
                            </div>
                            <div className="card-body text-left">
                              <h5 className="card-title text-dark font-weight-bold">
                                {car.make} {car.model} {car.year}
                              </h5>
                              <Link
                                to={"/car/" + car.vin}
                                className="btn btn-danger"
                              >
                                View
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="#link2" className="text-center">
                <h4>Asset Creation (Car)</h4>
                <Form
                  className="text-left addForm py-4 mb-3"
                  onSubmit={singleFileUploadHandler}
                >
                  <Form.Group>
                    <Form.Label>VIN *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Your VIN Here"
                      required
                      name="vin"
                      id="vin"
                      minLength="17"
                      maxLength="17"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Year *</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="2019, 2020, etc"
                      required
                      id="year"
                      name="year"
                      min="2010"
                      max="2021"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Make *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Toyota, Honda etc"
                      required
                      id="make"
                      name="make"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Model *</Form.Label>
                    <Form.Control
                      type="text"
                      id="model"
                      placeholder="Corolla, Civic etc"
                      required
                      name="model"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Color *</Form.Label>
                    <Form.Control
                      type="color"
                      id="color"
                      placeholder="Enter Color Here"
                      required
                      name="color"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Image *</Form.Label>
                    <Form.Control
                      onChange={singleFileChangedHandler}
                      type="file"
                      id="carImage"
                      placeholder="Upload Image of Car"
                      required
                      name="carPic"
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 mt-2 btn-danger"
                    data-toggle="modal"
                    id="submit"
                  >
                    Submit
                  </Button>
                </Form>
              </Tab.Pane>
              <Tab.Pane eventKey="#link3" className="text-center">
                <h4>Ownership Transfership (Car)</h4>
                <Form
                  className="text-left addForm py-4 mb-3"
                  onSubmit={transferOwnership}
                >
                  <Form.Group>
                    <Form.Label>VIN *</Form.Label>
                    <Form.Control
                      type="text"
                      id="carVin"
                      placeholder="Enter Your VIN Here"
                      required
                      name="vin"
                      minLength="17"
                      maxLength="17"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Email *</Form.Label>
                    <Form.Control
                      type="text"
                      id="carOwner"
                      placeholder="Enter Owner's Name"
                      required
                      name="ownerEmail"
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 mt-2 btn-danger"
                    data-toggle="modal"
                    
                  >
                    Submit
                  </Button>
                </Form>
              </Tab.Pane>
              <Tab.Pane eventKey="#link4" className="text-center">
                <h4>Update Car Color</h4>
                <Form
                  className="text-left addForm py-4 mb-3"
                  onSubmit={changeCarColour}
                >
                  <Form.Group>
                    <Form.Label>VIN *</Form.Label>
                    <Form.Control
                      type="text"
                      id="carVin"
                      placeholder="Enter Your VIN Here"
                      required
                      name="vin"
                      minLength="17"
                      maxLength="17"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Car *</Form.Label>
                    <Form.Control
                      type="color"
                      id="Colour"
                      // placeholder="Enter Owner's Name"
                      required
                      name="Colour"
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 mt-2 btn-danger"
                    data-toggle="modal"
                    data-target="#exampleModal"
                  >
                    Submit
                  </Button>
                </Form>
              </Tab.Pane>
            </Tab.Content>
          </Col>
          <Col sm={4}>
            <h4>Hello, {email} </h4>
             <h6>Organization: {organization === "Org1"? "Manufacturer":"Car Owner"} </h6>
            <br/>
            <ListGroup>
              <ListGroup.Item action href="#link1">
                My Car(s)
              </ListGroup.Item>
              {organization === "Org1" ? <>
              <ListGroup.Item action href="#link2">
              Create Car
            </ListGroup.Item>
            <ListGroup.Item action href="#link3">
              Transfer Ownership
            </ListGroup.Item></> :
            <>
          <ListGroup.Item action href="#link3">
            Transfer Ownership
          </ListGroup.Item>
          <ListGroup.Item action href="#link4">
          Change Car Color
        </ListGroup.Item></>
            }
              
            </ListGroup>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}

export default Data;
