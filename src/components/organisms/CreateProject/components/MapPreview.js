/** @format */

import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import MapGL from "@urbica/react-map-gl";
import Draw from "@urbica/react-map-gl-draw";
import "mapbox-gl/dist/mapbox-gl.css";

import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import styled from "styled-components";

const MapWrapper = styled.div`
  width: 150px;
  height: 150px;
  background-color: grey;
  position: relative;
  pointer-events: none;
`;

const MapPreview = ({ viewport }) => {
  const [data, setData] = useState(null);

  const drawRef = useRef(null);

  const createProjectFormData = useSelector(
    (state) => state.formData.createProjectFormData
  );

  useEffect(() => {
    if (createProjectFormData && createProjectFormData.geoData) {
      setData(createProjectFormData.geoData);
    }
  }, []);

  return (
    <MapWrapper>
      {viewport && (
        <MapGL
          mapStyle="mapbox://styles/tmorino/ckclpzylp0vgp1iqsrp4asxt6"
          accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          minZoom={7}
          latitude={viewport.latitude}
          longitude={viewport.longitude}
          pitch={viewport.pitch}
          bearing={viewport.bearing}
          zoom={viewport.zoom - 1}
          style={{ height: "100%", width: "100%" }}
          viewportChangeMethod={"easeTo"}
          viewportChangeOptions={{
            duration: 2700,
          }}
        >
          <Draw ref={drawRef} data={data} />
        </MapGL>
      )}
    </MapWrapper>
  );
};

export default MapPreview;
