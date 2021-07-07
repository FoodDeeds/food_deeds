import React, { useState } from "react";

const SingleSupplier = (props) => {
  const [name, setName] = useState(props);
  const [address, setAddress] = useState(props);
  const [zipcode, setZipcode] = useState(props);
  const [state, setState] = useState(props);
  const [phone, setPhone] = useState(props);

  return (
    <div>
      <div>
        PLACE HOLDER FOR SUPPLIER IMAGE
      </div>
      <div>
        <h2> {setName.name} </h2>
          <p> {setAddress.address} </p>
          <p> {setZipcode.zipcode} </p>
          <p> {setState.state} </p>
          <p> {setPhone.phone} </p>
      </div>
      <div>
        <h3>
          Available Donations
        </h3>
        <div>
          map over the following:
          <ul id="date"> wkday, Month Day#, Year</ul>
          <ul id="time"> Pick-up time from props </ul>
          <ul id="quantity"> (quantity) boxes </ul>
          <button> Reserve </button>
        </div>
      </div>
    </div>
  )
}

export default SingleSupplier;
