import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import pin from "../images/marker.jpg";

const REACT_APP_MAPBOX_TOKEN =
  "pk.eyJ1IjoiZm9vZGRlZWRzIiwiYSI6ImNrcW1vaGk2NzA5cTYydW16NnRoNWM1dHoifQ.Zrfb6NXBZ3mTeEUGdYgc6w";
const MapSearch = (props) => {
  const { donations, allDonations, zipcode } = props;

  const [selected, setSelected] = useState(null);

  const [viewport, setViewport] = useState({
    latitude: 40.7128,
    longitude: -74.006,
    width: 300,
    height: 350,
    zoom: 12,
  });

  useEffect(() => {
    if (donations.length > 0) {
      setViewport({
        latitude: donations[0].info.coordinates[1],
        longitude: donations[0].info.coordinates[0],
        width: 300,
        height: 350,
        zoom: 12,
      });
    }
  }, [donations]);

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
        {zipcode !== ""
          ? donations.map((donation) => (
              <Marker
                key={donation.id}
                latitude={donation.info.coordinates[1]}
                longitude={donation.info.coordinates[0]}
              >
                <button>
                  <img
                    src={pin}
                    alt="marker"
                    onClick={(evt) => {
                      evt.preventDefault();
                      setSelected(donation);
                    }}
                  />
                </button>
              </Marker>
            ))
          : allDonations.map((allDonation) => (
              <Marker
                key={allDonation.id}
                latitude={allDonation.info.coordinates[1]}
                longitude={allDonation.info.coordinates[0]}
              >
                <button>
                  <img
                    src={pin}
                    alt="marker"
                    onClick={(evt) => {
                      evt.preventDefault();
                      setSelected(allDonation);
                    }}
                  />
                </button>
              </Marker>
            ))}
        {selected ? (
          <Popup
            latitude={selected.info.coordinates[1]}
            longitude={selected.info.coordinates[0]}
            onClose={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>{selected.info.supplierName}</h2>
              <p>{selected.info.supplierAddress}</p>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
};

export default MapSearch;
