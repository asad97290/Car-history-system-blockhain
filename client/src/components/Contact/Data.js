import React from 'react';

function Data(props) {
    return (
        <div>
            <div className="container">
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-md-4 offset-md-1">
                        <h5>Our Address</h5>
                        <address style={{fontSize: "100%",}}>
                        University Rd, Block 5 Gulshan-e-Iqbal, Karachi<br />
                   
                            <i className="fa fa-phone fa-lg"></i>: +92 123 4567890<br />
                            <i className="fa fa-fax fa-lg"></i>: +92 678 123456<br />
                            <i className="fa fa-envelope fa-lg"></i>: <a
                                href="mailto:blockchain@lifecycle.com">blockchain@lifecycle.com</a>
                        </address>
                        <div className="btn-group mt-1 mb-3" role="group">
                            <a role="button" href="tel:+921234567890" className="btn btn-primary"><i className="fa fa-phone">
                                Call</i></a>
                            <a role="button" href="#!" className="btn btn-info"><i className="fa fa-skype"> Skype</i></a>
                            <a role="button" href="mailto:abc@xyz.net" className="btn btn-success"><i className="fa fa-envelope-o">
                                Email</i></a>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 offset-md-1">
                        <h5>Map of our Location</h5>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14253019.313135833!2d66.80385220768102!3d29.289930939589706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e06651d4bbf%3A0x9cf92f44555a0c23!2sKarachi%2C%20Karachi%20City%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1598084081248!5m2!1sen!2s"
                            frameborder="0" aria-hidden="false"
                        ></iframe>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Data;