import React from "react";
import QRCode from "qrcode";
import QrReader from "react-qr-reader";
import { useState } from "react";
import axios from "axios";

export default function Data() {
  const [qr, setQr] = useState("");
  const [token, setToken] = useState("");

  let conf = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      "Content-Type": "application/json",
    },
  };

  const handleSubmit = (qr) => {
    const url1 = `http://localhost:4000/channels/mychannel/chaincodes/fabcar?args=["${qr}"]&fcn=getHistoryForAsset`;

    if (token) {
      axios.get(url1, conf).then((response) => {
        if (response.data.result.length === 0) {
          alert("Invalid VIN Number");
        } else {
          window.location.pathname = "/car/" + qr + "/" + token;
        }
      });
    } else {
      alert("Signin First to Continue");
    }
  };

  const handleError = (error) => {
    alert(error);
  };

  const handleScan = (result) => {
    if (result) {
      axios
        .get(
          `http://localhost:4000/channels/mychannel/chaincodes/fabcar?args=["${result}"]&fcn=getHistoryForAsset`,
          conf
        )
        .then((response) => {
          if (response.data.result.length === 0) {
            alert("Invalid VIN Number");
          } else {
            window.location.pathname = "/car/" + result;
          }
        });

      console.log("------------------", result);
      // setToken(() => JSON.parse(localStorage.getItem("token")));
    }
  };

  return (
    <div>
      <QrReader
        delay={300}
        style={{ width: "100%" }}
        onError={handleError}
        onScan={handleScan}
      />
      {/* <h3>result: {qr}</h3> */}
    </div>
  );
}
