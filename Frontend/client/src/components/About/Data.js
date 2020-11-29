import React from 'react';

function Data(props) {
    return (
        <div>
            <div className="container">
                <div className="row row-content">
                    <div className="col-12 mb-4">
                        <h2>What we do</h2>
                        <p>
                        Welcome to car History and ownership verification system. Here you can perform a VIN check to get a full vehicle history report. Long gone are the days when it was nearly impossible to find a complete history of a vehicle. With Car History and ownership verification system, it’s fast and easy to know the entire history of your next car.</p>
                    </div>
                    <div className="col-12 col-sm-6">
                        <h2>Our History</h2>
                        <p>Started in 2020, Car Lifecycle Blockchain Network quickly established itself as an automobile icon
                        in Pakistan. With its unique brand of verification with blockchain network that can be found nowhere else, it
                    enjoys patronage from the A-list clientele in Pakistan.</p>
                    </div>
                    <div className="col-sm">
                        <div className="card">
                            <h3 className="card-header text-white" style={{backgroundColor: "#DC3545"}}>Facts At a Glance</h3>
                            <div className="card-body">
                                <dl className="row">
                                    <dt className="col-6">Started</dt>
                                    <dd className="col-6">3 Feb, 2020</dd>
                                    <dt className="col-6">Major Stakeholder</dt>
                                    <dd className="col-6">SSUET</dd>
                                    <dt className="col-6">Last Year's Turnover</dt>
                                    <dd className="col-6">$1,250,375</dd>
                                    <dt className="col-6">Employees</dt>
                                    <dd className="col-6">4</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Data;