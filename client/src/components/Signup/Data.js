import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form} from 'react-bootstrap';

function Data() {
    const url = "http://localhost:4000/users";
    let conf = {
        headers: {
            "Content-Type": "application/json"
        }
    };   
   

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target)

        var data = {};
        for (let key of formData.keys()) {
            data[key] = formData.get(key);
        }
        axios.post(url, data, conf
        	).then(function (response) { 
                var email = document.getElementById("userEmail").value
                var orgName = document.getElementById("orgName").value
                var text = response.data.x509Identity.credentials.certificate
                text = JSON.stringify(text)
                const element = document.createElement("a");
                const file = new Blob([text], {type: 'application/json'});
                element.href = URL.createObjectURL(file);
                element.download = `${email}${orgName}.id`;
                document.body.appendChild(element);
                element.click();
                document.getElementById("userEmail").value = "";
                document.getElementById("orgName").value = "";
            }).catch(function (error) { console.log(error); });  
      
    }

    return (
        
        <div className="container">
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
            <div className="modal-body">Keep Certificate Safe</div>
            
          </div>
        </div>
      </div>
            <div className="row mx-auto justify-content-center row-content text-center" style={{ width: "95%" }}>
                <div className="col-12 ">
                    <h2>Organization Registration Form</h2>
                    <Form className="text-left addForm p-4 mb-3" onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Email *</Form.Label>
                            <Form.Control id="userEmail" type="email" placeholder="Enter Your Email Here" required name="userEmail" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Organization *</Form.Label>
                            <Form.Control as="select" required name="orgName" id="orgName">
                                <option value="Org1">Manufacturer</option>
                                <option value="Org2">Car Owner</option>
                            </Form.Control>
                        </Form.Group>

                        <Button data-toggle="modal" data-target="#exampleModal" type="submit" style={{backgroundColor: "#DC3545"}} className="w-100 mt-2">
                            Submit
                        </Button>
                    </Form>
                    <h6>Kindly store your Identity Certificate in a safe place as it will only be issued once</h6>
                </div>
            </div>
        </div>
    );
}

export default Data;