import React from "react";
import RecDonations from "./RecDonations";
import Footer from "./Footer";
import logo from "../images/Logo-2.png";


const Home = () => {
  return (
    <div>
      <img src={logo} alt="Logo" />
      <h3>About Us</h3>
      <p>
        Each year, 40% of all edible food in the US is thrown away while 1 in 10
        households struggles with food insecurity. At FoodDeeds we strive to
        bridge the gap and connect food banks with excess products from grocery
        stores, delis, and cafes.
      </p>
      <RecDonations />
      <Footer />
    </div>
  );
};

export default Home;
