import React from 'react';
import axios from 'axios'
function Data() {

    let cert;
    const url = "http://localhost:4000/users/login";
    let conf = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const showFile = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      cert = (e.target.result)
    }
    reader.readAsText(e.target.files[0])
}
    const login = () => {
        let userEmail = document.getElementById("file1").value.slice(12, -7)
        let orgName = document.getElementById("file1").value.slice(-7, -3)
        let data = {
            userEmail,
            orgName,
            certificate:cert
        }
        axios.post(url, data, conf).then(response=>{

            if (response.data.success) {
                localStorage.setItem("token",JSON.stringify(response.data.message.token))
                window.location.pathname = "/profile/" + userEmail + "/" + response.data.message.token
            }
            else if (response.data.success === false) {
                alert ("Wrong Certificate")
            }
             
        })
    }

    return (
        <div className="container">
            <div className="row mx-auto justify-content-center row-content text-center" style={{width: "400px"}}>
                <div className="col-12 my-2">
                    <h2>Identity Certificate</h2>
                    <p>To signin into the network you have to upload the platform identity certificate which has been issued to you during your registration.</p>
                    <div className="px-3 py-2 mb-3 rounded text-white" style={{backgroundColor: "#DC3545"}}>
                        <input onChange={(e) => showFile(e)} type="file" id="file1"/>
                    </div>
                    <button  onClick={login} className="btn btn-success" >Login</button>
                </div>
            </div>
        </div>
    );
}

export default Data;




