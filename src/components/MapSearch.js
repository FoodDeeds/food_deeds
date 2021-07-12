import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
// import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
// import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

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

const MapSearch = (props) => {
  const [viewport, setViewport] = useState({
    latitude: 40.76526052397093,
    longitude: -74.02781638792513,
    width: "36%",
    height: 400,
    zoom: 12,
  });
  // const { donations } = props;
  const [selected, setSelected] = useState(null);
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
              <img
                src="https://lh3.googleusercontent.com/x3L1QKz86Kboa9sj2ivtyl1mR3E--wrEXQnoBBbAsHjpwcAqzEfOUKB2_MkwsStHBBTTRkzobFttBQFOJnCE8WUL2Vp2Qh19w4Uc_ELFsXrmn52sewmtVrsa-NqbD5vfU40Bcl7fowOuJXe4QIgaALv4ZUkCxJX7_eSXb6TxkdN7BY7LhLu1AkgnEv9BXgTdFOimA9s9rjGoJmRACHssuG2mK4PZnlpemmYRmYsQ2gug2FXmIzbq1b6lE0HWMnqNLvoCKXqy5wBOWwOcudvAH0q3k9awPATgiSMj8K_D5prmDB3ke-0x9qAbBo728duzgtcu9Cqx5hpPzks61FG0TrsaC2baxbAg5l1YSCKsVFqeFJar8cSHakTNjNkfszfuftIe9aCEJ4_g1_KS48zNciBrbNC-qdhv0yVMtQ3g_26FAp32p8Sh1UxUWkcD86RDNQqYd8tABjOo8aGqkRgSH8wcVxY-ihlfyVxtjiVPJXHPKk9HEgWpbRIdIrVzPmNn6v-YLRfgsCGJGep0zc7cjwd-Cc1PC_D_oxcJWpIVLTI8mKmw8aMdtukFiIzpalZp-VfxJ4DZNkRNhfXiebSrHUTjW44hbvGFBxjkwGcceRD6x4rQTpOl5Rh3Q5ZRZ63u9kNJUtmt-bVUX3CVmIBshmJn2-cDbJb3X3U4jsFRir3PS70ycc3EcROA95GopUkY7Qa2rlI6Um_y1Fl97mrzkJc=s40-no?authuser=0"
                alt="marker"
                onClick={(evt) => {
                  evt.preventDefault();
                  setSelected(location);
                  console.log(selected);
                }}
              />
            </button>
          </Marker>
        ))}
        {selected ? (
          <Popup
            latitude={selected.geometry.coordinates[0]}
            longitude={selected.geometry.coordinates[1]}
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
