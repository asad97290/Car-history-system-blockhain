import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Nav2 from "../containers/Nav2"
import Home from "../components/Home";
import Contact from "../components/Contact";
import About from "../components/About";
import Signin from "../components/Signin";
import Signup from "../components/Signup";
import Car from "../components/Car";
import Profile from "../components/Profile";

function Routes() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/contact" component={Contact} />
          <Route path="/about" component={About} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route path="/car/:vin" component={Car} />
          <Route path="/profile/:email" component={Profile} />
          <Route path="*" component={() => <h2>Page Not Found</h2>} />
        </Switch>
      </Router>
    </div>
  );
}

export default Routes;
