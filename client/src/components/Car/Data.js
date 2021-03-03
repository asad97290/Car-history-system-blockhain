import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Carousel, CarouselItem, Image } from "react-bootstrap";

function Data() {
  const [token, setToken] = useState(() =>
    JSON.parse(localStorage.getItem("token"))
  );
  const [car, setCar] = useState({});
  const [carHistory, setCarHistory] = useState([]);
  const [url, setImageURL] = useState("");

  if (!token) {
    window.location.pathname = "/signin";
  }

  const { vin } = useParams();

  const url1 = `https://192.168.0.111:4000/channels/mychannel/chaincodes/fabcar?args=["${vin}"]&fcn=queryCar`;
  const url2 = `https://192.168.0.111:4000/channels/mychannel/chaincodes/fabcar?args=["${vin}"]&fcn=getHistoryForAsset`;
  let conf = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  useEffect(async () => {
    const response = await axios.get(url1, conf);
    setCar(() => response.data.result);
    const response2 = await axios.get(url2, conf);
    setCarHistory(() => response2.data.result);
    // const canvas = await QRCode.toCanvas(response.data.result.vin, { errorCorrectionLevel: 'H' })
    // var container = document.getElementById('qrcode')
    // container.appendChild(canvas)
    const url = await QRCode.toDataURL(vin);
    setImageURL(url);
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
                  <Carousel
                    interval={null}
                    id="carousel-example-generic"
                    data-ride="carousel"
                    indicators={false}
                    className="d-none d-lg-block"
                  >
                    <CarouselItem className="carousel-item-imgs">
                      <Image
                        className="d-block mh-100 mx-auto"
                        src={car.carPic}
                        alt=""
                      />
                    </CarouselItem>
                  </Carousel>
                  <Carousel
                    interval={null}
                    id="carousel-example-generic2"
                    data-ride="carousel"
                    indicators={false}
                    className="d-none d-md-block d-lg-none"
                  >
                    <CarouselItem className="carousel-item-imgs3">
                      <Image
                        className="d-block mh-100 mx-auto"
                        src={car.carPic}
                        alt=""
                      />
                    </CarouselItem>
                  </Carousel>
                  <Carousel
                    interval={null}
                    id="carousel-example-generic3"
                    data-ride="carousel"
                    indicators={false}
                    className="d-flex justify-content-center align-items-center d-md-none bg-black"
                    style={{ height: "400px" }}
                  >
                    <CarouselItem className="carousel-item-imgs2 bg-black">
                      <Image
                        style={{
                          maxHeight: "400px",
                        }}
                        className="d-block mw-100 mx-auto"
                        src={car.carPic}
                        alt=""
                      />
                    </CarouselItem>
                  </Carousel>
                  {/* <img
                    className="d-block card-img-top img-thumbnails carImg"
                    src={car1}
                    alt=""
                  /> */}
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
                          <p className="h6" id="vin">
                            {car.vin}
                          </p>
                          <i
                            onClick={() => copyText("vin")}
                            className="fa fa-clipboard mx-2"
                            aria-hidden="true"
                          ></i>
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
                          <p
                            style={{
                              border: "1px solid black",
                              width: "60px",
                              height: "20px",
                              backgroundColor: car.colour,
                            }}
                          ></p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <p className="text-secondary">Owner CNIC</p>
                        </div>
                        <div className="col-6 d-flex">
                          <p className="h6" id="ownerCnic">
                            {" "}
                            {car.ownerCnic}{" "}
                          </p>
                          <i
                            onClick={() => copyText("ownerCnic")}
                            className="fa fa-clipboard mx-2"
                            aria-hidden="true"
                          ></i>
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
                                Transaction ID: {carInfo.TxId.slice(0, 40)}{" "}
                              </a>
                              <a
                                className="float-right"
                                style={{ color: "#DC3545" }}
                              >
                                {" "}
                                {new Date(
                                  carInfo.Timestamp
                                ).toLocaleString()}{" "}
                              </a>
                              <p>
                                VIN: {carInfo.Value.vin}
                                <br />
                                CNIC: {carInfo.Value.ownerCnic}
                                <br />
                                Status:{" "}
                                <span
                                  style={{
                                    color: "white",
                                    background: "black",
                                    padding: "2px",
                                    borderRadius: "7px",
                                  }}
                                >
                                  {carInfo.Value.status}
                                </span>
                                <br />
                                Model: {carInfo.Value.make}{" "}
                                {carInfo.Value.model} {carInfo.Value.year}
                                <br />
                                <div className="d-flex">
                                  Color:&nbsp;
                                  <p
                                    style={{
                                      border: "1px solid black",
                                      width: "60px",
                                      height: "20px",
                                      backgroundColor: carInfo.Value.colour,
                                    }}
                                  ></p>
                                </div>
                              </p>
                            </li>
                          );
                        })}
                      </ul>
                      <h3>QR code:</h3>
                      <img src={url} alt="car QR code" />
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
