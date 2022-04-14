/** @format */

import React, { useState } from "react";

// import MapGL from "../../../../util/urbica/react-map-gl.esm";
// import Draw from "../../../../util/urbica/react-map-gl-draw.esm";
// import "mapbox-gl/dist/mapbox-gl.css";
// import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import Map, { Marker } from "react-map-gl";
import { useControl } from "react-map-gl";

import styled from "styled-components";
import { Editor, DrawPolygonMode } from "react-map-gl-draw";

const MapWrapper = styled.div`
  width: 150px;
  height: 150px;
  background-color: grey;
  position: relative;
  pointer-events: none;
  overflow: hidden;
`;

const MapPreview = ({ viewport, data }) => {
  const [mode, setMode] = useState(new DrawPolygonMode());

  return (
    <MapWrapper id="drawMapPreview">
      {viewport && (
        <Map
          mapStyle="mapbox://styles/tmorino/ckclpzylp0vgp1iqsrp4asxt6"
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
          minZoom={7}
          initialViewState={{
            latitude: viewport.latitude,
            longitude: viewport.longitude,
            zoom: viewport.zoom - 2.4,
            bearing: 0,
            pitch: viewport.pitch,
          }}
          style={{ height: "100%", width: "100%" }}
          viewportChangeMethod={"easeTo"}
          viewportChangeOptions={{
            duration: 2700,
          }}
          attributionControl={false}
        >
          <Editor
            clickRadius={12}
            onUpdate={({ data, editType }) => {
              console.log(editType);
              // setFeatures({ features: data });
            }}
            onSelect={(selected) => {
              console.log(selected);
            }}
            features={data}
            mode={mode}
          />
        </Map>
      )}
    </MapWrapper>
  );
};

export default MapPreview;
