import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/imgs/logo.png";

function NavigationBar(props) {
  const [ email,setEmail ] = useState(() =>
  localStorage.getItem("email")
);
  const [flag, setFlag] = useState(() =>
    JSON.parse(localStorage.getItem("token"))
  );

  const signOut = () => {
    localStorage.setItem("token", null);
    localStorage.setItem("email", null);
    localStorage.setItem("organization", null);
    setFlag(false)
    window.location.pathname = "/"
  };

  return (
    <Navbar
      variant="dark"
      bg="light"
      expand="sm"
      fixed="top"
      className="shadow"
    >
      <Container>
        <Link to="/"><Navbar.Brand href="/">
          <img src={logo} height="50" alt="Car Lifecycle Blockchain Network" />
        </Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" activeKey={props.path}>
            <Link to="/"><Nav.Link href="/" className="mx-1 navList text-dark">
              <span className="fa fa-home fa-lg"></span> Home
            </Nav.Link></Link>
            <hr />
            <Link to="/about"><Nav.Link href="/about" className="mx-1 navList text-dark">
              <span className="fa fa-info fa-lg"></span> About
            </Nav.Link></Link>
            <hr />
            <Link to="/contact"><Nav.Link
              href="/contact"
              className="mx-1 navList text-dark"
            >
              <span className="fa fa-globe fa-lg"></span> Contact
            </Nav.Link></Link>
            <hr />
            {flag ? (
              <Link to={`/profile/${email}`}><Nav.Link
                href={`/profile/${email}`}
                className="mx-1 navList text-dark"
              >
                <span className="fa fa-address-card fa-lg"></span> Profile
              </Nav.Link></Link>
            ) : (
              <Link to="/signup"><Nav.Link
                href="/signup"
                className="mx-1 navList text-dark"
              >
                <span className="fa fa-address-card fa-lg"></span> Signup
              </Nav.Link></Link>
            )}
            <hr />
            {flag ? (
              <Nav.Link onClick={signOut} className="mx-1 navList text-dark">
                <span className="fa fa-sign-out fa-lg"></span> Signout
              </Nav.Link>
            ) : (
              <Link to="/signin"><Nav.Link
                href="/signin"
                className="mx-1 navList text-dark"
              >
                <span className="fa fa-sign-in fa-lg"></span> Signin
              </Nav.Link></Link>
            )}
      </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
