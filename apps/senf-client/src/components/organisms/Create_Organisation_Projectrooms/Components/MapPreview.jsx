/** @format */

import React from "react";

import MapGL from "../../../../util/urbica/react-map-gl.esm";
import Draw from "../../../../util/urbica/react-map-gl-draw.esm";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

import styled from "styled-components";

const MapWrapper = styled.div`
  width: 150px;
  height: 150px;
  background-color: grey;
  position: relative;
  pointer-events: none;
  overflow: hidden;
`;

const MapPreview = ({ viewport, data }) => {
  return (
    <MapWrapper id="drawMapPreview">
      {viewport && (
        <MapGL
          mapStyle="mapbox://styles/tmorino/ckclpzylp0vgp1iqsrp4asxt6?optimize=true"
          accessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
          minZoom={7}
          latitude={viewport.latitude}
          longitude={viewport.longitude}
          pitch={viewport.pitch}
          bearing={viewport.bearing}
          zoom={viewport.zoom - 2.4}
          style={{ height: "100%", width: "100%" }}
          viewportChangeMethod={"easeTo"}
          viewportChangeOptions={{
            duration: 2700,
          }}
          attributionControl={false}
        >
          <Draw data={data} />
        </MapGL>
      )}
    </MapWrapper>
  );
};

export default MapPreview;
