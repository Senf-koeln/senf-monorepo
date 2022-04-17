/** @format */

import React from "react";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import MapGL, {
  GeolocateControl,
  Source,
  Layer,
} from "../../../util/urbica/react-map-gl.esm";

//import Geocoder from "react-mapbox-gl-geocoder";
import Geocoder from "../../atoms/map/Geocoder";

import { useTranslation } from "react-i18next";

//Icons
import Pin from "../../../images/pin3.png";
import Geolocate from "../../../images/icons/geolocate.png";
import styled from "styled-components";
import { StyledText } from "../../../styles/GlobalStyle";

const AdressLinePlaceHolderDiv = styled.div`
  position: fixed;
  top: 10px;
  left: 70px;
  width: calc(80% - 85px);

  height: 50px;
  padding-left: 15px;
  padding-right: 5px;
  border-radius: 15px;
  color: #353535;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  pointer-events: none;

  box-shadow: 0 8px 30px -12px rgba(0, 0, 0, 0.5);

  @media (min-width: 768px) {
    z-index: 9999;
    top: 50px;
    left: calc(600px + ((100vw - 600px) / 2) - 150px);
    width: 300px;
  }
`;
const PinWrapper = styled.div`
  position: fixed;
  left: ${(props) =>
    props.isMobileCustom ? "50%" : "calc(600px + (100% - 600px) / 2)"};
  margin-left: -50px;
  margin-top: -100px;
  top: 50%;
`;

const Img = styled.img`
  position: fixed;
  z-index: 9999;
  top: 2.5%;
  right: 2.5%;
  margin: auto;
  height: 50px;
  width: 50px;
  border-radius: 15px;
  box-shadow: 0 8px 30px -12px rgba(0, 0, 0, 0.5);
  background-color: #fed957;
  display: ${(props) => (props.show ? "flex" : "none")};

  align-items: center;
  justify-content: center;
  text-align: center;
  pointer-events: none;
`;

const PostScreamMap = ({
  _onMarkerDragEnd,
  geocode,
  geoData,
  viewport,
  clicked,
  addressBarClicked,
  locationDecided,
  onSelected,
  address,
  loadingProjects,
}) => {
  const { t } = useTranslation();

  const queryParams = {
    bbox: [6.7, 50.8, 7.2, 51],
  };
  const addressLine = !address ? t("input_address") : address;

  const data =
    !loadingProjects && geoData !== ""
      ? JSON.parse(geoData)
      : {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [],
          },
        };

  return (
    viewport && (
      <MapGL
        accessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/tmorino/ckclpzylp0vgp1iqsrp4asxt6?optimize=true"
        {...viewport}
        maxZoom={18}
        minZoom={11}
        style={
          isMobileCustom
            ? {
                width: "100vw",
                height: "100vh",
                position: "fixed",
              }
            : {
                position: "fixed",
                width: "calc(100% - 600px)",
                left: "600px",
                height: "100%",
              }
        }
        onViewportChange={_onMarkerDragEnd}
        viewportChangeMethod={"easeTo"}
        viewportChangeOptions={{
          duration: 2700,
        }}
      >
        <Source id="geodata" type="geojson" data={data} />
        <Layer
          id="geodata"
          type="fill"
          source="geodata"
          paint={{
            "fill-color": "#fed957",
            "fill-opacity": 0.3,
          }}
        />
        <div
          onClick={addressBarClicked}
          style={
            locationDecided === false
              ? { display: "block" }
              : { display: "none" }
          }
        >
          <Geocoder
            mapboxApiAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
            onSelected={onSelected}
            viewport={viewport}
            hideOnSelect={true}
            limit={3}
            queryParams={queryParams}
            id="geocoder"
            transitionDuration={1000}
          />
          <AdressLinePlaceHolderDiv
            style={clicked === false ? { zIndex: 9999 } : { zIndex: 0 }}
          >
            <StyledText>{addressLine}</StyledText>
          </AdressLinePlaceHolderDiv>
        </div>

        {isMobileCustom && (
          <React.Fragment>
            <GeolocateControl
              positionOptions={{ enableHighAccuracy: true }}
              showUserLocation={false}
              onGeolocate={() => {
                setTimeout(() => {
                  geocode(viewport);
                }, 1500);
              }}
            />
            {/* <Img
              show={locationDecided === false}
              src={Geolocate}
              width="20"
              alt="Geolocate"
            /> */}
          </React.Fragment>
        )}

        <div style={{ pointerEvents: "none" }}>
          <PinWrapper isMobileCustom={isMobileCustom}>
            <img src={Pin} width="100" alt="ChatIcon" />
          </PinWrapper>
        </div>
      </MapGL>
    )
  );
};

export default PostScreamMap;
