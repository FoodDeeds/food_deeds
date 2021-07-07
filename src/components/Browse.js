import React, { useState } from "react";
import MapSearch from "./MapSearch";

const Browse = (props) => {
  const [category, setCategory] = useState("");
  const [zipcode, setZipcode] = useState("");

  const submit = (evt) => {
    evt.preventDefault();
  };

  console.log("category", category);
  console.log("zipcode", zipcode);
  return (
    <div className="browse">
      <form onSubmit={submit}>
        <label htmlFor="zipcode">Zipcode</label>
        <input
          type="text"
          required
          onChange={(evt) => setZipcode(evt.target.value)}
        />
        <select
          name="category"
          onChange={(evt) => setCategory(evt.target.value)}
        >
          <option value="All">All</option>
          <option value="Grocery">Grocery Store</option>
          <option value="Deli">Deli</option>
          <option value="Cafe">Cafe</option>
        </select>
        <button type="submit">Search</button>
      </form>
      <MapSearch />
    </div>
  );
};

export default Browse;
