import React from 'react';

function Data(props) {
    return (
        <div>
            <div className="container">
                <div className="row row-content">
                    <div className="col-12 mb-4">
                        <h2>What we do</h2>
                        <p>
                            Car History Verification System's vehicle history report covers a range of topics that buyer’s need. It includes vehicle's information. Car History Verification System compiles data a network of government, non-government, and auto industry sources. Access our comprehensive database to get a full vehicle history report using our free VIN check.
                        </p>
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