import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import MapSearch from "./components/MapSearch";
import LogIn from "./components/LogIn";
import Signup from "./components/Signup";
import Contact from "./components/Contact";
import MyAccount from "./components/MyAccount";
import PostDonation from "./components/PostDonation";
import EditAccount from "./components/EditAccount";
import Browse from "./components/Browse";
import SingleSupplier from "./components/SingleSupplier";
import Confirmation from "./components/Confirmation";
import NavBar from "./components/NavBar";
import EditDonation from "./components/EditDonation";
import Volunteer from "./components/Volunteer";
import Faq from "./components/Faq";
import Progress from "./components/InProgress";

const Routes = () => {
  return (
    <Router>
      <div>
        <NavBar />
      </div>

      <Switch>
        <Route path="/donationedit" component={EditDonation} />
        <Route exact path="/" component={Home} />
        <Route exact path="/map" component={MapSearch} />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/account" component={MyAccount} />
        <Route exact path="/edit" component={EditAccount} />
        <Route exact path="/donate" component={PostDonation} />
        <Route exact path="/browse" component={Browse} />
        <Route exact path="/supplier/:id" component={SingleSupplier} />
        <Route exact path="/confirmation" component={Confirmation} />
        <Route exact path="/faq" component={Faq}/>
        <Route exact path="/progress" component={Progress}/>
        <Route exact path="/volunteer" component={Volunteer}/>
      </Switch>
    </Router>
  );
};

export default Routes;
