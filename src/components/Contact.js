import React from 'react'
import phone from "../images/phone-70-32.jpg";
import email from "../images/email-2-32.jpg";
import { Link } from "react-router-dom";

const Contact = ()=> {

        return (
            <div>
              <h3>
                Ready to help us fight food insecurity? Get in touch with Food Deeds today.
              </h3>
              <p>
                <img src={phone} alt="Phone" />
                <p>1-800-GIV-FOOD</p>
              </p>
              <p>
                <img src={email} alt="Email" />
                <p>support@fooddeeds.com</p>
              </p>
              <Link to="/home">
                Food Deeds FAQ
              </Link>
            </div>
        )

}

export default Contact
