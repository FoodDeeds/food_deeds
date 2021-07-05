import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";

const REACT_APP_MAPBOX_TOKEN =
  "pk.eyJ1IjoiZm9vZGRlZWRzIiwiYSI6ImNrcW1vaGk2NzA5cTYydW16NnRoNWM1dHoifQ.Zrfb6NXBZ3mTeEUGdYgc6w";

const locations = [
  {
    ID: 1,
    NAME: "Home",
    ADDRESS: "123 Oak Street",
    CITY: "Weehawken",
    STATE: "NJ",
    POSTAL_CODE: "07086",
    geometry: {
      type: "Point",
      coordinates: [40.76526052397093, -74.02781638792513],
    },
  },
  {
    ID: 2,
    NAME: "Trader Joe's Hoboken",
    ADDRESS: "1350 Willow Avenue",
    CITY: "Hoboken",
    STATE: "NJ",
    POSTAL_CODE: "07030",
    geometry: {
      type: "Point",
      coordinates: [40.753910808381384, -74.02998023471564],
    },
  },
];

function MapSearch() {
  const [viewport, setViewport] = useState({
    latitude: 40.76526052397093,
    longitude: -74.02781638792513,
    width: "100vw",
    height: "100vh",
    zoom: 12,
  });
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
        {locations.map((location) => (
          <Marker
            key={location.ID}
            latitude={location.geometry.coordinates[0]}
            longitude={location.geometry.coordinates[1]}
          >
            <button>
              <img src="https://bit.ly/3hFAjCE" alt="marker" />
            </button>
          </Marker>
        ))}
      </ReactMapGL>
    </div>
  );
}

export default MapSearch;
