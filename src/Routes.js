import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home";
import MapSearch from "./components/MapSearch";
import LogIn from "./components/LogIn";
import Signup from "./components/Signup";
import Contact from "./components/Contact";
import MyAccount from "./components/MyAccount";
import PostDonation from "./components/PostDonation";
import SingleSupplier from "./components/SingleSupplier";

/**
 * Header
 * Route paths
 * Footer
 */
const Routes = () => {
    return (
        <Router>
            <div className="header">
                <Header />
            </div>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/map" component={MapSearch} />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/account" component={MyAccount} />
        <Route exact path="/donate" component={PostDonation} />
        <Route exact path="/supplier/:id" component={SingleSupplier} />
      </Switch>
    </Router>
  );
};

export default Routes;
