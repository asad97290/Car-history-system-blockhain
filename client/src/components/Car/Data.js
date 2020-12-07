import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Data() {
  const [ token,setToken ] = useState( ()=>JSON.parse(localStorage.getItem("token")))
  const [car, setCar] = useState({});
  const [carHistory, setCarHistory] = useState([]);
  
  if (!token) {
    window.location.pathname = "/signin"
  }

  const { vin } = useParams();

  const url1 = `http://localhost:4000/channels/mychannel/chaincodes/fabcar?args=["${vin}"]&fcn=queryCar`;
  const url2 = `http://localhost:4000/channels/mychannel/chaincodes/fabcar?args=["${vin}"]&fcn=getHistoryForAsset`;
  let conf = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(url1, conf);
      setCar(() => response.data.result);
      const response2 = await axios.get(url2, conf);
      setCarHistory(() => response2.data.result);
    }
    fetchData();
  }, []);
  
  function copyText(id) {
    var text = document.getElementById(id).innerText;
    var elem = document.createElement("textarea");
    document.body.appendChild(elem);
    elem.value = text;
    elem.select();
    document.execCommand("copy");
    document.body.removeChild(elem);
}

  return (
    <div className="container">
      <div className="row justify-content-center row-content">
        <div className="col-12">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <img
                    className="d-block card-img-top img-thumbnails carImg"
                    src={car.carPic}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row my-2">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <h4>Details</h4>
                  <div className="row">
                    <div className="col-12 col-lg-6">
                      <div className="row">
                        <div className="col-6">
                          <p className="text-secondary">VIN</p>
                        </div>
                        <div className="col-6 d-flex">
                          <p className="h6" id="vin">{car.vin}</p><i onClick={()=>copyText('vin')}className="fa fa-clipboard mx-2" aria-hidden="true"></i>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <p className="text-secondary">Year</p>
                        </div>
                        <div className="col-6">
                          <p className="h6"> {car.year} </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <p className="text-secondary">Make</p>
                        </div>
                        <div className="col-6">
                          <p className="h6"> {car.make} </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="row">
                        <div className="col-6">
                          <p className="text-secondary">Model</p>
                        </div>
                        <div className="col-6">
                          <p className="h6"> {car.model} </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <p className="text-secondary">Color</p>
                        </div>
                        <div className="col-6">
                          <p style={{border: "1px solid black", width: "60px", height: "20px", backgroundColor: car.colour}}></p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <p className="text-secondary">Owner</p>
                        </div>
                        <div className="col-6 d-flex">
                          <p className="h6" id="ownerEmail"> {car.ownerEmail} </p><i onClick={()=>copyText('ownerEmail')}className="fa fa-clipboard mx-2" aria-hidden="true"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <h4>Car History</h4>
                  <div className="row">
                    <div className="col-12">
                      <ul className="timeline">
                        {carHistory.map((carInfo, index) => {
                          return (
                            <li key={index}>
                              <a style={{ color: "#DC3545" }}>
                                Transaction ID: {carInfo.TxId}{" "}
                              </a>
                              <a
                                className="float-right"
                                style={{ color: "#DC3545" }}
                              >
                                {" "}
                                {new Date(carInfo.Timestamp).toDateString()}
                                {" "}
                              </a>
                              <p>
                                VIN: {carInfo.Value.vin}
                                <br />
                                Email: {carInfo.Value.ownerEmail}
                                <br />
                                Model: {carInfo.Value.make}{" "}
                                {carInfo.Value.model}
                                {carInfo.Value.year}
                                <br />
                                <div className="d-flex">
                                Color:&nbsp;<p style={{border: "1px solid black", width: "60px", height: "20px", backgroundColor: carInfo.Value.colour}}></p></div>
                              </p>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Data;
