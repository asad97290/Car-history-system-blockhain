import React from 'react';
import axios from 'axios'
function Data() {

    let cert;
    const url = "https://192.168.0.111:4000/users/login";
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
        let userCnic = document.getElementById("file1").value.slice(12, -7)
        let orgName = document.getElementById("file1").value.slice(-7, -3)
        let data = {
            userCnic,
            orgName,
            certificate: cert
        }
        axios.post(url, data, conf).then(response => {

            if (response.data.success) {
<<<<<<< HEAD
                localStorage.setItem("token", JSON.stringify(response.data.message.token))
                localStorage.setItem("email", userEmail)
                localStorage.setItem("organization", orgName)
                window.location.pathname = "/profile/" + userEmail
=======
                localStorage.setItem("token",JSON.stringify(response.data.message.token))
                localStorage.setItem("cnic",userCnic)
                localStorage.setItem("organization",orgName)
                window.location.pathname = "/profile/" + userCnic 
>>>>>>> 038d40efca917b5b97c3b892280a81dec9d7d5d1

            }
            else if (response.data.success === false) {
                alert("Wrong Certificate")
            }
<<<<<<< HEAD

=======
             
        }).catch((err)=> {
            alert(err)
>>>>>>> 038d40efca917b5b97c3b892280a81dec9d7d5d1
        })
    }

    return (
        <div className="container">
            <div className="row row-content text-center" >
                <div className="col-12 my-2 d-flex justify-content-center px-3">
                    <div style={{ maxWidth: "400px" }}>
                        <h2>Identity Certificate</h2>
                        <p>To signin into the network you have to upload the platform identity certificate which has been issued to you during your registration.</p>
                        <div className="px-3 py-2 mb-3 rounded text-white" style={{ backgroundColor: "#DC3545" }}>
                            <input onChange={(e) => showFile(e)} type="file" id="file1" />
                        </div>
                        <button onClick={login} className="btn btn-success" >Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Data;




