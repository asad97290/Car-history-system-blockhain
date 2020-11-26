import React from 'react';
import { Link } from 'react-router-dom';
import Footer2 from './Footer2';

function Footer(props) {
    return (
        <div>
            <footer className="footer bg-dark text-white">
                <div className="container">
                    <div className="row">
                        <div className="offset-1 col-4 col-sm-2">
                            <h5>Links</h5>
                            <ul className="list-unstyled">
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/about">About</Link></li>
                                <li><Link to="/contact">Contact</Link></li>
                            </ul>
                        </div>
                        <div className="col-7 col-sm-5" id="dest">
                            <h5>Our Address</h5>
                            <address className="text-white">
                                ABC<br />
                        XYZ<br />
                        JKL<br />
                                <i className="fa fa-phone fa-lg"></i>: +92 123 4567890<br />
                                <i className="fa fa-fax fa-lg"></i>: +92 123 4567890<br />
                                <i className="fa fa-envelope fa-lg"></i>: <a
                                    href="mailto:blockchain@lifecycle.com">blockchain@lifecycle.com</a>
                            </address>
                        </div>
                        <div className="col-12 col-sm-4 align-self-center">
                            <div className="text-center">
                                <a className="btn btn-social-icon btn-google" href="http://google.com/+"><i
                                    className="fa fa-lg fa-google-plus"></i></a>&nbsp;
                        <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id="><i
                                    className="fa fa-lg fa-facebook"></i></a>&nbsp;
                        <a className="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/"><i
                                    className="fa fa-lg fa-linkedin"></i></a>&nbsp;
                        <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i
                                    className="fa fa-lg fa-twitter"></i></a>&nbsp;
                        <a className="btn btn-social-icon btn-google" href="http://youtube.com/"><i
                                    className="fa fa-lg fa-youtube"></i></a>&nbsp;
                        <a className="btn btn-social-icon text-white" href="mailto:"><i className="fa fa-lg fa-envelope-o"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <Footer2 />
        </div>
    );
}

export default Footer;