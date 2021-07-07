import React, { useState } from "react";
import MapSearch from "./MapSearch";

const Browse = (props) => {
  const [type, setType] = useState("Grocery Store");
  console.log(type);
  return (
    <div className="browse">
      <select name="category" onChange={(evt) => setType(evt.target.value)}>
        <option value="grocery">Grocery Store</option>
        <option value="deli">Deli</option>
        <option value="cafe">Cafe</option>
      </select>
      <MapSearch />
    </div>
  );
};

export default Browse;
