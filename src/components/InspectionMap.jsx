import React from "react";
import GoogleMapReact from "google-map-react";

const Marker = ({ text }) => <div>{text}</div>;

function InspectionMap({ lat, lng }) {
  const center = { lat, lng };
  const zoom = 11;

  return (
    <div style={{ height: "300px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "YOUR_GOOGLE_MAPS_API_KEY" }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        <Marker lat={lat} lng={lng} text="Property" />
      </GoogleMapReact>
    </div>
  );
}

export default InspectionMap;
