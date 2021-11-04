/** @format */

import React, { useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
// Redux stuff
import { useDispatch } from "react-redux";

import { openScreamFunc } from "../../../redux/actions/screamActions";

//MAPSTUF
import MapGL, { Source, Layer, Marker } from "@urbica/react-map-gl";

import { isMobileCustom } from "../../../util/customDeviceDetect";

import NoLocationPopUp from "./NoLocationPopUp";

//Icons
import Pin from "../../../images/pin3.png";
import { MarkersMobile } from "./Markers";
// import cologne_grid from "../../../images/cologne_grid.svg";

const PinComponent = styled.img`
  position: absolute;
  width: 100px;
  transform: translateY(-88%) translateX(-45%) rotate(0deg);
  transform-origin: bottom center;
  margin-top: ${(props) => -(7 + props.likeCount) / 4 + "px"};
`;

const MapMobile = ({
  dataFinal,
  viewport,

  _onViewportChange,
  zoomBreak,
  loadingProjects,
  geoData,
  setSwipePositionUp,
}) => {
  const dispatch = useDispatch();
  const openScream = useSelector((state) => state.UI.openScream);
  const scream = useSelector((state) => state.data.scream);

  const [mapLoaded, setMapLoaded] = useState(false);

  const fetchDataScream = (screamId) => {
    dispatch(openScreamFunc(screamId));
  };

  const data =
    !loadingProjects && geoData !== undefined && geoData !== ""
      ? {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [JSON.parse(geoData)],
          },
        }
      : null;

  let dataNoLocation = [];

  if (dataFinal !== undefined && dataFinal.length > 0) {
    dataFinal.forEach((element) => {
      if (element.lat === 50.93864020643174) {
        dataNoLocation.push(element);
      }
    });
  }

  let dataFinalMap = [];
  const dataFinalMapArray = dataFinal;

  if (dataFinalMapArray !== undefined && dataNoLocation.length > 1) {
    dataFinalMapArray.forEach((element) => {
      if (element.lat !== 50.93864020643174) {
        dataFinalMap.push(element);
      }
    });
  }
  if (dataFinalMapArray !== undefined && dataNoLocation.length < 2) {
    dataFinalMapArray.forEach((element) => {
      dataFinalMap.push(element);
    });
  }

  return (
    isMobileCustom && (
      <div
        style={{
          position: "fixed",
          zIndex: "9",
          width: "100vw",
          height: "100vh",
        }}
      >
        {!mapLoaded && (
          <React.Fragment>
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#f8f8f8",
              }}
            />
          </React.Fragment>
        )}
        <MapGL
          style={{
            width: "100%",
            height: "100%",
          }}
          mapStyle="mapbox://styles/tmorino/ckclpzylp0vgp1iqsrp4asxt6"
          accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          minZoom={9}
          {...viewport}
          onViewportChange={_onViewportChange}
          viewportChangeMethod={"easeTo"}
          viewportChangeOptions={{
            duration: 2700,
          }}
          onLoad={() => setMapLoaded(true)}
        >
          <Source id="maine" type="geojson" data={data} />
          <Layer
            id="maine"
            type="fill"
            source="maine"
            paint={{
              "fill-color": "#fed957",
              "fill-opacity": 0.2,
            }}
          />

          <MarkersMobile
            dataFinalMap={dataFinalMap}
            fetchDataScream={fetchDataScream}
            zoomBreak={zoomBreak}
          />

          {openScream && scream.lat && (
            <Marker
              key={scream.screamId}
              longitude={scream.long}
              latitude={scream.lat}
            >
              <PinComponent
                src={Pin}
                likeCount={scream.likeCount}
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 88%, 0 88%)",
                }}
                alt="ChatIcon"
              />
            </Marker>
          )}
          <NoLocationPopUp
            dataNoLocation={dataNoLocation}
            setSwipePositionUp={setSwipePositionUp}
          ></NoLocationPopUp>
        </MapGL>
      </div>
    )
  );
};

MapMobile.propTypes = {
  classes: PropTypes.object.isRequired,
  openScreamFunc: PropTypes.func.isRequired,
};

export default MapMobile;
