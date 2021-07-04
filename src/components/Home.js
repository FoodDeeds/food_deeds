import React from "react";
import Donations from "./Donations";
import Footer from "./Footer";

const Home = () => {
    return (
        <>
            <div>
                <h3>LOGO</h3>
                <h3>About Us</h3>
                <Donations />
            </div>

            <div className="footer__view">
                <Footer />
            </div>
        </>
    );
};

export default Home;
