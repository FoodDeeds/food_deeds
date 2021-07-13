import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { db } from "../firebase";
import pin from "../images/marker.jpg";
// import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
// import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
const REACT_APP_MAPBOX_TOKEN =
  "pk.eyJ1IjoiZm9vZGRlZWRzIiwiYSI6ImNrcW1vaGk2NzA5cTYydW16NnRoNWM1dHoifQ.Zrfb6NXBZ3mTeEUGdYgc6w";
const MapSearch = (props) => {
  const { donations, setDonations } = props;
  const [selected, setSelected] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 40.7128,
    longitude: -74.006,
    width: 515,
    height: 400,
    zoom: 12,
  });
  useEffect(() => {
    if (donations.length > 0) {
      setViewport({
        latitude: donations[0].info.coordinates[1],
        longitude: donations[0].info.coordinates[0],
        width: 515,
        height: 400,
        zoom: 12,
      });
    }
  }, [donations]);

  console.log("donations in map search", donations);

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/fooddeeds/ckqqr3fl90flt17qq52bd0g3c"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        {donations.map((donation) => (
          <Marker
            key={donation.id}
            latitude={donation.info.coordinates[1]}
            longitude={donation.info.coordinates[0]}
          >
            {console.log("donation", donation.id)}
            <button>
              <img
                src={pin}
                alt="marker"
                onClick={(evt) => {
                  evt.preventDefault();
                  setSelected(donation);
                  console.log(selected);
                }}
              />
            </button>
          </Marker>
        ))}
        {selected ? (
          <Popup
            latitude={selected.info.coordinates[0]}
            longitude={selected.info.coordinates[1]}
            onClose={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>{selected.NAME}</h2>
              <p>{selected.ADDRESS}</p>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
};

export default MapSearch;
