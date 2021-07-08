import React from "react";
import RecDonations from "./RecDonations";
import Footer from "./Footer";
import logo from "../images/Logo-2.png";

const Home = () => {
  return (
    <>
      <div>
        <h3>
          <img src={logo} alt="Logo" />
        </h3>
        <h3>About Us</h3>
        <p>
            Each year, 40% of all edible food in the US is thrown away while 1 in
            10 households struggles with food insecurity. At FoodDeeds we strive
            to bridge the gap and connect food banks with excess products from
            grocery stores, delis, and cafes.
        </p>
        <RecDonations />
      </div>

      <div className="footer__view">
        <Footer />
      </div>
    </>
  );
};

export default Home;
