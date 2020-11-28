import React, { useState,Fragment } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import car from "../assets/cars/banner.png";
import axios from "axios"

function Body() {

    const[vin,setVin]= useState("")
    const[token,setToken]= useState("")

    const url1 = `http://localhost:4000/channels/mychannel/chaincodes/fabcar?args=["${vin}"]&fcn=getHistoryForAsset`;
    let conf = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
    
    const handleOnChange = ( event ) => {
        setVin(event.target.value)
        setToken(()=>JSON.parse(localStorage.getItem("token")))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (token) {
            axios.get(url1, conf).then(response => {
                console.log(response.data.result.length)
                if(response.data.result.length === 0){
                    alert("Invalid VIN Number")
                } 
                else{
                window.location.pathname = "/car/" + vin +"/"+token
                }
            });
        }
        else {
            alert("Signin First to Continue")
        }
    }

    

    return (
        <Fragment>
            <div className="bg-light ">
                <div className="container py-5">
                    <div className="row text-center">
                        <h2><span style={{color: "#DC3545"}}>Complete vehicle data all in one marketplace</span> - making automotive more secure, transparent and accessible by all</h2>
                        <div className="col-12 col-md-8" style={{ backgroundImage: `url(${car})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}>
                        </div>
                        <div className="col-12 col-md-4 py-5">
                            <div className="card bg-white rounded-lg py-5 px-4 shadow">
                                <div className="card-body">
                                    <h4 className="card-title">Get an in depth vehicle history report:</h4>
                                    <p className="text-secondary">350+ Million records and counting</p>
                                    <Form onSubmit={handleSubmit}>
                            <Form.Control onChange={handleOnChange} minLength="17" maxLength="17" className="my-0 bg-light py-1 amber-border text-center" id="vin" type="text" placeholder="ENTER VIN NUMBER" required name="vin" />
                        

                        <Button type="submit" className="btn btn-danger text-white w-100 mt-3 font-weight-bold">
                            SEARCH
                        </Button>
                    </Form>
                                    {/* <input  onChange={handleOnChange} className="form-control my-0 bg-light py-1 amber-border text-center" type="text" placeholder="ENTER VIN NUMBER"
                                        aria-label="Search" id="search" minLength={17} maxLength={17}/>
                                    <button className="btn btn-danger text-white w-100 mt-3 font-weight-bold" >SEARCH</button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white py-5">
                <div className="container">
                    <div className="row text-center d-flex align-items-center">
                        <h2 className="col-12">Shorten and simplify your car search</h2>
                        <p className="font-weight-light col-12">From distraction to satisfaction in a few moments</p>
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="row">
                                <div className="col-12 d-flex justify-content-center">
                                    <div className="p-4 bg-light border rounded-circle" style={{ width: "120px" }} >
                                        <svg style={{ width: "70px", fill: "#DC3545" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 235 235"><path d="M147 24.7c-14.2-7.9-30.6-9.8-46.2-5.4-32.2 9.2-50.9 42.8-41.8 75 4.4 15.6 14.7 28.5 28.9 36.4 9.2 5.1 19.3 7.7 29.5 7.7 5.6 0 11.2-.8 16.7-2.3 15.6-4.4 28.6-14.7 36.5-28.9 7.9-14.2 9.8-30.5 5.3-46.1-4.5-15.6-14.7-28.5-28.9-36.4zm21.8 81.6c-7.6 13.7-20.2 23.6-35.3 27.9-15.1 4.3-30.9 2.4-44.6-5.2S65.3 108.9 61 93.8c-8.9-31.1 9.3-63.7 40.4-72.5 5.3-1.5 10.7-2.3 16.1-2.3 9.9 0 19.6 2.5 28.5 7.5 13.7 7.6 23.6 20.1 27.9 35.2 4.3 15 2.5 30.9-5.1 44.6z"></path><path d="M187.4 57.8c-5.3-18.7-17.6-34.2-34.5-43.6C136 4.8 116.3 2.5 97.7 7.8c-38.5 11-61 51.2-50 89.8 5.3 18.7 17.6 34.2 34.5 43.6 14.7 8.2 31.9 11 48.5 8l1.8 6.3-3.8 1.1 18.6 65.4c.8 2.8 2.6 5.1 5.2 6.5 1.7.9 3.5 1.4 5.3 1.4 1 0 2-.1 3-.4 5.6-1.6 9-7.4 7.6-13.1l-18.7-65.8-3.4 1-.4.1-1.8-6.3c16.6-6.5 30.2-18.8 38.3-34.8 8.2-16.4 10-35.1 5-52.8zm-21.1 158.8c1.3 4.7-1.4 9.7-6.1 11-2.3.7-4.7.4-6.8-.8-2.1-1.2-3.6-3.1-4.2-5.3L131.1 158l15.5-4.4 1.7-.5 18 63.5zm-23.9-72.8l-.9.3 2.3 8.1-9.6 2.8-2.3-8.2-.9.2c-16.4 3.2-33.4.5-48-7.6-16.5-9.2-28.4-24.2-33.6-42.4C38.9 59.6 60.7 20.4 98.2 9.7c18.2-5.2 37.3-3 53.7 6.2 16.5 9.2 28.4 24.2 33.6 42.4 9.9 35.2-8.9 72.7-43.1 85.5z"></path><path d="M78.7 46.7c-5.1 6.7-8.6 14.6-10 22.8l2 .3c1.4-7.9 4.7-15.5 9.6-22 8.2-10.7 20-17.5 33.3-19.3l-.3-2c-13.8 2-26.1 9.1-34.6 20.2z"></path></svg>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <h5 className="mb-0 mt-4">ENTER VIN</h5>
                                    <p className="font-weight-light mt-0 text-muted">STEP 1</p>
                                    <p>The only thing you need to know.<br />Easily found in car documents.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="row">
                                <div className="col-12 d-flex justify-content-center">
                                    <div className="p-4 bg-light border rounded-circle" style={{ width: "120px" }} >
                                        <svg style={{ width: "70px", fill: "#DC3545" }} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 235 235"><path d="M91.2 110.3c-22.9 0-44.4-3.6-60.5-10.1-16.5-6.6-25.6-15.5-25.6-25v-34c0-9.5 9.1-18.4 25.6-25 16.2-6.5 37.7-10 60.5-10s44.4 3.6 60.5 10c16.5 6.6 25.6 15.5 25.6 25v34c0 9.5-9.1 18.4-25.6 25-16.2 6.5-37.7 10.1-60.5 10.1zm0-102.1C44.8 8.2 7.1 23 7.1 41.2v34c0 18.2 37.7 33.1 84.1 33.1s84.1-14.8 84.1-33.1v-34c0-18.2-37.7-33-84.1-33zm0 59.5c-48.1 0-77.6-15.5-77.6-26.5s29.5-26.5 77.6-26.5c48.1 0 77.6 15.5 77.6 26.5s-29.5 26.5-77.6 26.5zm0-51c-45.4 0-75.6 14.8-75.6 24.5s30.2 24.5 75.6 24.5c45.4 0 75.6-14.8 75.6-24.5s-30.2-24.5-75.6-24.5z"></path><path d="M91.2 161.4c-22.9 0-44.4-3.6-60.5-10-16.5-6.6-25.6-15.5-25.6-25v-34h2c0 18.2 37.7 33 84.1 33s84.1-14.8 84.1-33h2v24.2h-2V99.9c-3.5 6.6-11.6 12.6-23.6 17.4-16.2 6.5-37.7 10-60.6 10s-44.4-3.6-60.5-10c-12-4.8-20-10.8-23.6-17.4v26.4c0 18.2 37.7 33 84.1 33 10 0 19.6-.7 28.7-2l.3 2c-9.1 1.4-18.9 2.1-28.9 2.1z"></path><path d="M91.2 212.4c-22.9 0-44.4-3.6-60.5-10-16.5-6.6-25.6-15.5-25.6-25v-34h2c0 18.2 37.7 33 84.1 33 9.1 0 17.9-.6 26.3-1.7l.3 2c-8.4 1.1-17.4 1.7-26.5 1.7-22.9 0-44.4-3.6-60.5-10-12-4.8-20-10.8-23.6-17.4v26.4c0 18.2 37.7 33 84.1 33 12.6 0 24.8-1.1 36.3-3.3l.4 2c-11.8 2.2-24.1 3.3-36.8 3.3zM173.5 190.7c-9.3 0-16.9-7.6-16.9-17 0-9.3 7.6-16.9 16.9-16.9 9.3 0 16.9 7.6 16.9 16.9 0 9.4-7.6 17-16.9 17zm0-31.9c-8.2 0-14.9 6.7-14.9 14.9s6.7 15 14.9 15 14.9-6.7 14.9-15c0-8.2-6.7-14.9-14.9-14.9z"></path><path d="M173.5 230.7c-31.4 0-56.9-25.5-56.9-56.9s25.5-56.9 56.9-56.9 56.9 25.5 56.9 56.9c0 31.3-25.5 56.9-56.9 56.9zm0-111.9c-30.3 0-54.9 24.6-54.9 54.9s24.6 54.9 54.9 54.9c30.3 0 54.9-24.6 54.9-54.9s-24.6-54.9-54.9-54.9zm4.9 91.3c-1.1 0-2.1-.6-2.5-1.7l-2.2-6c-.2-.4-1.4-.9-1.9-.9-.1 0-.6.3-.8.8l-2.7 5.8c-.3.6-.8 1.1-1.5 1.3-.7.2-1.4.2-2-.1l-13-6c-.7-.3-1.2-.9-1.4-1.5-.2-.6-.2-1.3.1-1.9l2.7-5.8c.1-.4-.4-1.6-.7-2-.1-.1-.6-.2-1.1 0l-6 2.2c-.5.2-1.2.2-1.8 0-.7-.3-1.2-.8-1.5-1.5l-5-13.5c-.4-1.3.2-2.8 1.5-3.3l6.1-2.2c.3-.2.8-1.5.9-1.9 0-.1-.3-.6-.8-.7l-5.8-2.7c-.6-.3-1.1-.8-1.3-1.5-.2-.7-.2-1.4.1-2l6-13c.6-1.3 2.2-1.9 3.4-1.2l5.8 2.7c.3.1 1.6-.4 2-.8 0-.1.1-.6 0-1.1l-2.2-6c-.2-.6-.2-1.3.1-2 .3-.6.8-1.1 1.5-1.3l13.4-5c1.3-.5 2.8.2 3.3 1.5l2.2 6c.2.3 1.4.9 1.8.9.2 0 .7-.3.9-.8l2.6-5.7c.3-.6.8-1.1 1.4-1.4.7-.2 1.4-.2 2 .1l13 6c1.3.6 1.9 2.2 1.3 3.5l-2.6 5.7c-.1.4.4 1.7.7 2 .1.1.6.3 1.1.1l6-2.2c.6-.2 1.4-.2 2 .1.6.3 1.1.8 1.3 1.5l5 13.4c.5 1.3-.2 2.8-1.5 3.4l-6 2.2c-.5.2-.8.6-.8.7 0 .4.4 1.7.7 2l5.8 2.7c.6.3 1.1.8 1.4 1.5.2.6.2 1.3-.1 1.9l-5.9 13c-.7 1.4-2.2 1.9-3.5 1.3l-5.7-2.7c-.3-.1-1.7.5-2.1.8 0 .1-.2.6 0 1.1l2.2 6c.2.6.2 1.3-.1 2-.3.6-.8 1.1-1.5 1.3l-13.4 5c-.4-.1-.7-.1-.9-.1zm-6.5-10.5c.7.1 3.2.8 3.7 2.3l2.2 5.9c.1.3.5.4.8.3l13.4-5c.2-.1.3-.2.3-.3 0-.1.1-.2 0-.4l-2.2-6c-.5-1.2-.2-2.7.6-3.3.5-.4 2.7-1.6 4.1-1l5.8 2.7c.4.2.7 0 .8-.3l5.9-13c.1-.2.1-.3 0-.4-.1-.1-.2-.3-.3-.3l-5.7-2.7c-1.4-.5-1.9-3.2-1.9-3.8 0-1 .9-2.2 2.1-2.6l5.9-2.2c.3-.1.5-.5.4-.8l-5-13.4c-.1-.2-.2-.3-.3-.3-.1 0-.2-.1-.4 0l-6 2.2c-1.2.5-2.7.2-3.4-.7-.4-.4-1.6-2.7-.9-4.1l2.6-5.7c.2-.3 0-.7-.3-.8l-13-5.9c-.2-.1-.3-.1-.5 0-.1 0-.2.1-.3.3l-2.6 5.7c-.6 1.2-1.8 2-2.8 1.9-.7 0-3.1-.8-3.6-2.2l-2.2-5.9c-.1-.3-.5-.4-.8-.3l-13.4 5c-.2.1-.3.2-.3.3 0 .1-.1.2 0 .4l2.2 6c.5 1.1.2 2.6-.5 3.3-.5.4-2.8 1.6-4.1 1l-5.8-2.7c-.3-.1-.6 0-.8.3l-6 13c-.1.1-.1.3 0 .4.1.1.2.3.3.3l5.8 2.7c1 .4 2 1.6 1.9 2.7-.1.6-.8 3.1-2.2 3.6l-6 2.2c-.2.1-.4.5-.3.8l5 13.4c.1.1.2.3.4.3.1 0 .2.1.3 0l6.1-2.2c1.2-.5 2.6-.2 3.3.6.4.4 1.7 2.7 1 4.2l-2.7 5.7c-.1.1-.1.2 0 .4s.2.3.4.4l13 6c.2.1.3.1.4 0 .1-.1.3-.2.3-.3l2.7-5.8c.5-1.1 1.6-1.9 2.6-1.9z"></path></svg>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <h5 className="mb-0 mt-4">DATA SEARCH</h5>
                                    <p className="font-weight-light mt-0 text-muted">STEP 2</p>
                                    <p>We unlock all doors.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="row">
                                <div className="col-12 d-flex justify-content-center">
                                    <div className="p-4 border rounded-circle" style={{ width: "140px", backgroundColor: "#DC3545" }} >
                                        <svg style={{ width: "90px", fill: "#ffffff" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 235 235"><path d="M92.2 230.8c-3.6 0-6.7-2.4-7.7-5.9L37.6 47c-1.1-4.2 1.4-8.6 5.6-9.7 4.2-1.1 8.6 1.4 9.7 5.6l46.9 177.9c.5 2 .3 4.2-.8 6-1.1 1.8-2.8 3.1-4.8 3.7-.7.2-1.3.3-2 .3zM45.3 39.1c-.5 0-1 .1-1.5.2-3.2.8-5 4.1-4.2 7.2l46.9 177.9c.7 2.6 3 4.4 5.7 4.4h.1c.5 0 1-.1 1.5-.2 1.5-.4 2.8-1.4 3.6-2.7s1-3 .6-4.5L51 43.5c-.7-2.6-3.1-4.4-5.7-4.4z"></path><path d="M86.2 134c-1.4 0-2.9-.1-4.3-.2-4.7-.6-7.8-3-8.9-7l1.9-.5c.9 3.2 3.3 5.1 7.1 5.6 20.4 1.5 37.7-8.2 54.4-17.5 17-9.5 34.6-19.3 55.6-17.7 1.5.2 2.6-.1 3.2-.8.6-.7.5-1.6.3-2.2L173.4 12c-.7-2.7-1.9-5.4-6.6-5.7-20.4-1.5-37.7 8.2-54.5 17.5-17 9.5-34.6 19.3-55.6 17.7-1.5-.2-2.7.1-3.2.8-.6.7-.5 1.6-.3 2.2l-1.9.5c-.4-1.6-.2-3 .7-4 1-1.2 2.8-1.7 4.9-1.5C77.3 41 94.6 31.3 111.3 22c17-9.5 34.6-19.3 55.6-17.7 5.7.3 7.4 3.8 8.4 7.2l22.1 81.6c.4 1.6.2 3-.7 4-1 1.2-2.8 1.7-4.9 1.5-20.4-1.5-37.7 8.2-54.4 17.5-15.8 8.8-32.1 17.9-51.2 17.9zm23.7-15.7l-6.2-22.9c-8.8 3.4-16.8 5-25.1 5.3h-.8l-7.5-27.6h1.3c8.3-.2 15.9-1.8 24.6-5.2l-6.1-22.5.8-.3c8.5-3.8 16.5-8.4 23.9-12.7l1.1-.7 6.1 22.5c7.9-4.6 14.9-8.4 22.2-11.6L138.1 20l.9-.3c8.8-3.3 16.5-4.9 24.9-5.2h.8l6.6 24.5H170c-7.9.3-15.2 1.7-23.4 4.7l6.4 23.6c8.4-3 15.8-4.5 23.8-4.8h.8l6.7 24.8H183c-8.1.3-15.6 1.8-24.1 5l-1 .4-6.2-22.8c-7.9 3.5-15.5 7.7-22.5 11.8l6.2 22.8-.7.4c-7 4.1-15.3 8.8-23.9 12.7l-.9.7zm-4.3-23.6l5.7 20.9c7.9-3.6 15.4-7.9 22-11.7L127.6 83c-6.6 3.8-14.1 8.1-22 11.7zM73 75.1l6.4 23.6c8-.3 15.4-1.9 23.8-5.2l-6.4-23.6c-8.3 3.2-15.9 4.8-23.8 5.2zm25.7-6l6.4 23.6c8-3.6 15.6-8 22.2-11.8l-6.4-23.6c-6.9 4-14.3 8.2-22.2 11.8zm55.1.2l5.7 20.9c7.9-2.8 14.9-4.3 22.4-4.7l-5.7-20.9c-7.5.4-14.5 1.9-22.4 4.7zm-31.1-13l6.4 23.6c7-4 14.4-8.2 22.2-11.6l-6.4-23.6c-7.4 3.1-14.3 6.9-22.2 11.6zm-30.1-9.7l5.6 20.6c7.9-3.6 15.3-7.8 22.2-11.8l-5.6-20.5c-6.9 3.9-14.3 8.1-22.2 11.7zm48-25.3l5.6 20.6c7.9-2.9 15-4.4 22.6-4.7l-5.6-20.5c-7.6.3-14.6 1.7-22.6 4.6z"></path></svg>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <h5 className="mb-0 mt-4">GET REPORT</h5>
                                    <p className="font-weight-light mt-0 text-muted">STEP 3</p>
                                    <p>Get full car history and reduce anxiety about the deal.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}



export default Body;