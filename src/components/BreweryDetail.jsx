import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./BreweryDetail.css";

const BreweryDetail = (props) => {
  const [brewery, setBrewery] = React.useState({});
  const [latLgn, setlatLgn] = React.useState([0, 0]);

  useEffect(() => {
    const getCoinDetail = async () => {
      var data = await fetch(
        `https://api.openbrewerydb.org/v1/breweries/${props.id}`
      );
      var dataJson = await data.json();
      setBrewery(dataJson);
      setlatLgn([
        parseFloat(dataJson.latitude),
        parseFloat(dataJson.longitude),
      ]);
    };

    getCoinDetail();
  }, [props.id]);

  return (
    brewery && (
      <div className="brewery-card">
        <h2>{brewery.name}</h2>
        <div className="brewery-info">
          <strong>Type:</strong> {brewery.brewery_type}
        </div>
        <div className="brewery-info">
          <strong>City:</strong> {brewery.city}, {brewery.state}
        </div>
        <div className="brewery-info">
          <strong>Phone:</strong>{" "}
          <a href={`tel:${brewery.phone}`}>{brewery.phone}</a>
        </div>
        <div className="brewery-info">
          <strong>Website:</strong>{" "}
          <a
            href={brewery.website_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {brewery.website_url}
          </a>
        </div>
        <div>
          {latLgn[0] && latLgn[1] ? (
            <MapContainer
              center={[latLgn[0], latLgn[1]]}
              zoom={6}
              style={{ height: "400px", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={latLgn}>
                <Popup>{brewery.name}</Popup>
              </Marker>
            </MapContainer>
          ) : (
            <div>Map Not Available</div>
          )}
        </div>
      </div>
    )
  );
};

export default BreweryDetail;
