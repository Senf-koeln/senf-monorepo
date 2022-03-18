import React from "react";

import Map from "react-map-gl";
import { useDispatch, useSelector } from "react-redux";
export default function Map2() {
  const initialMapViewport = useSelector(
    (state) => state.data.initialMapViewport
  );
  return (
    <Map
      initialViewState={initialMapViewport}
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        transform: "scale(1)",
        left: 0,
      }}
      mapStyle="mapbox://styles/tmorino/ckclpzylp0vgp1iqsrp4asxt6"
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
    />
  );
}
