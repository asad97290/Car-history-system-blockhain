import React, { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import logo from "../assets/imgs/logo.png"

function NavigationBar(props) {
    const [flag, setFlag] = useState(false)

    return (
            <Navbar variant="dark" bg="light" expand="sm" fixed="top">
                <Container>
                    <Navbar.Brand href="#"><img src={logo} height="50" alt="Car Lifecycle Blockchain Network" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto" activeKey={props.path}>
                            <Nav.Link to="/" href="/" className="navList text-dark"><span className="fa fa-home fa-lg"></span> Home</Nav.Link>
                            <Nav.Link to="/about" href="/about" className="navList text-dark"><span className="fa fa-info fa-lg"></span> About</Nav.Link>
                            <Nav.Link to="/contact" href="/contact" className="navList text-dark"><span className="fa fa-globe fa-lg"></span> Contact</Nav.Link>
                            {flag ? <Nav.Link to="/profile" href="/profile" className="navList text-dark"><span className="fa fa-address-card fa-lg"></span> Profile</Nav.Link> : <Nav.Link to="/signup" href="/signup" className="navList text-dark"><span className="fa fa-address-card fa-lg"></span> Signup</Nav.Link>}
                            {flag ? <Nav.Link onClick={() => setFlag(false)} className="navList text-dark"><span className="fa fa-sign-out fa-lg"></span> Signout</Nav.Link> : <Nav.Link to="/signin" href="/signin" className="navList text-dark"><span className="fa fa-sign-in fa-lg"></span> Signin</Nav.Link>}
                            {/* {flag ? <Nav.Link onClick={() => setFlag(false)} className="navList text-dark"><span className="fa fa-sign-out fa-lg"></span> Signout</Nav.Link> : <Nav.Link onClick={() => setFlag(true)} className="navList text-dark"><span className="fa fa-sign-in fa-lg"></span> Signin</Nav.Link>} */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    );
}

export default NavigationBar;