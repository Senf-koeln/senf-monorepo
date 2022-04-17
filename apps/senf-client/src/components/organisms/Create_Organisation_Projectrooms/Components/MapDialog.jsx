/** @format */

// const [data, setData] = useState({
//   type: "FeatureCollection",
//   features: [
//     {
//       type: "Feature",
//       properties: {},
//       geometry: {
//         coordinates: [
//           [
//             [6.917877780906963, 51.00002258185481],
//             [6.8876765468714325, 50.93041942584361],
//             [6.998165087951804, 50.947310396591604],
//             [6.998145888768761, 50.985689147947454],
//             [6.978078861803311, 50.98927250642429],
//             [6.958011834837862, 50.99285586490113],
//             [6.917877780906963, 51.00002258185481],
//           ],
//         ],
//         type: "Polygon",
//       },
//     },
//   ],
// });

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom";
import MapGL from "../../../../util/urbica/react-map-gl.esm";
import Draw from "../../../../util/urbica/react-map-gl-draw.esm";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import bbox from "@turf/bbox";

//firebase
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

import styled from "styled-components";
import {
  CustomButton,
  CustomIconButton,
} from "../../../atoms/CustomButtons/CustomButton";
import { useTranslation } from "react-i18next";
//import { createProjectSaveData } from "../../../../redux/actions/formDataActions";
import { SubmitButton } from "../../../atoms/CustomButtons/SubmitButton";
import { StyledH2 } from "../../../../styles/GlobalStyle";
import { isMobileCustom } from "../../../../util/customDeviceDetect";

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  background-color: grey;
  position: fixed;
  z-index: 9999;
  visibility: ${(props) => (props.mapOpen ? "visible" : "hidden")};
`;

const ButtonsContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-around;
  bottom: 70px;
  width: 120px;
  height: 50px;
  margin-left: calc(50% - 60px);
`;

const NavigationButtonsContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  bottom: 10px;
  width: 100%;
  height: 50px;
`;

const Title = styled.div`
  margin-left: 50%;
  transform: translateX(-50%);
  color: #353535;
  align-self: center;
  position: fixed;
  top: ${(props) => (props.isMobileCustom ? "10px" : "40px")};
  background-color: rgb(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  white-space: nowrap;
  padding: 14px;
`;

const Reactangle = styled.div`
  position: fixed;
  top: 110px;
  margin-left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 600px);
  height: calc(100% - 200px);
  border: 3px dashed black;
`;
const MapDialog = ({
  mapOpen,
  setMapOpen,
  viewport,
  mapRef,
  _onViewportChange,
  setViewport,
  data,
  setData,
}) => {
  const { t } = useTranslation();
  const drawRef = useRef(null);
  const [toolMode, setMode] = useState("draw_polygon");
  const [isSetPolygon, setPolygon] = useState(false);
  const [step2, setStep2] = useState(false);

  useEffect(() => {
    if (data) {
      setMode("simple_select");
      setPolygon(true);
    } else {
      setMode("draw_polygon");
    }
    if (isSetPolygon === true && !data) {
      setPolygon(false);
      setMode("draw_polygon");
    }
  }, [data, isSetPolygon]);

  const handleSet = () => {
    setMode("simple_select");

    setTimeout(() => {
      setMode("draw_polygon");
      setMode("simple_select");
      setPolygon(true);
    }, 100);
  };
  // const handleBack = () => {
  //   setViewport({
  //     ...viewport,
  //     pitch: 0,
  //   });
  //   setStep2(false);
  // };

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27 && !data) {
      //Do whatever when esc is pressed

      handleDelete();
      setMode("simple_select");
      setPolygon(false);
      setTimeout(() => {
        setMode("draw_polygon");
      }, 1009);
    }
  }, []);

  const handleDelete = (data) => {
    var answer = window.confirm(
      "Bist du sicher, dass du das eingezeichnete Gebiet wieder löschen möchtest?"
    );
    if (answer) {
      setData(null);
      drawRef.current._draw.deleteAll();

      //some code
    } else {
      //some code
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  const handleClose = () => {
    setMapOpen(false);
  };

  const handleSave1 = async () => {
    const db = firebase.firestore();
    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createProjectRoomId") &&
      data
    ) {
      const [minLng, minLat, maxLng, maxLat] = bbox(data);

      const size = maxLat - minLat + maxLng - minLng;

      const newZoom =
        size < 0.005
          ? 17
          : size < 0.01
          ? 16.5
          : size < 0.015
          ? 16
          : size < 0.02
          ? 15.5
          : size < 0.03
          ? 15
          : size < 0.04
          ? 14.5
          : size < 0.05
          ? 14
          : size < 0.075
          ? 13.5
          : size < 0.1
          ? 13
          : size < 0.2
          ? 12.5
          : size < 0.4
          ? 12
          : size < 0.6
          ? 11.5
          : size < 0.75
          ? 11
          : size < 0.9
          ? 10.5
          : size < 1.1
          ? 10
          : size < 1.6
          ? 9.5
          : size > 1.6
          ? 9
          : 10.5;
      const newLatitude = (minLat + maxLat) / 2;
      const newLongitude = (minLng + maxLng) / 2;

      //UPDATING AN EXISTING PROJECTROOM
      const updateProject = {
        geoData: JSON.stringify(data),
        centerLat: newLatitude,
        centerLong: newLongitude,
        zoom: newZoom,
      };
      const ref = await db
        .collection("organizations")
        .doc(localStorage.getItem("createProjectRoomOrganizationId"))
        .collection("projectRooms")
        .doc(localStorage.getItem("createProjectRoomId"));
      return ref.update(updateProject).then(() => {
        setViewport({
          ...viewport,
          pitch: 0,
          latitude: newLatitude,
          longitude: newLongitude,
          zoom: newZoom,
        });
        // setStep2(true);

        setMapOpen(false);
      });
    }
  };

  // const handleSave2 = async () => {
  //   const db = firebase.firestore();
  //   if (
  //     typeof Storage !== "undefined" &&
  //     localStorage.getItem("createProjectRoomId")
  //   ) {
  //     console.log(viewport);
  //     //UPDATING AN EXISTING PROJECTROOM
  //     const updateProject = {
  //       centerLong: viewport.longitude,
  //       centerLat: viewport.latitude,
  //       zoom: viewport.zoom,
  //     };
  //     const ref = await db
  //       .collection("organizations")
  //       .doc(localStorage.getItem("createProjectRoomOrganizationId"))
  //       .collection("projectRooms")
  //       .doc(localStorage.getItem("createProjectRoomId"));
  //     return ref.update(updateProject).then(() => {
  //       setStep2(true);
  //       setMapOpen(false);
  //     });
  //   }
  // };

  return ReactDOM.createPortal(
    <MapWrapper mapOpen={mapOpen} id="drawMapWindow">
      <CustomIconButton
        name="Close"
        position="fixed"
        margin={document.body.clientWidth > 768 ? "40px" : "10px"}
        left="0"
        zIndex={999}
        handleButtonClick={handleClose}
      />

      {viewport && (
        <MapGL
          id="map"
          ref={mapRef}
          mapStyle="mapbox://styles/tmorino/ckclpzylp0vgp1iqsrp4asxt6?optimize=true"
          accessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
          minZoom={7}
          latitude={viewport.latitude}
          longitude={viewport.longitude}
          pitch={viewport.pitch}
          bearing={viewport.bearing}
          zoom={viewport.zoom}
          style={{ height: "100%", width: "100%" }}
          onViewportChange={_onViewportChange}
          viewportChangeMethod={"easeTo"}
          viewportChangeOptions={{
            duration: 2700,
          }}
        >
          <Title isMobileCustom={isMobileCustom}>
            <StyledH2 fontWeight="900" textAlign="center">
              Zeichne das Gebiet ein
            </StyledH2>
          </Title>

          <Draw
            ref={drawRef}
            data={data}
            onChange={(data) => {
              setData(data);
            }}
            mode={toolMode}
          />
          {!step2 && (
            <ButtonsContainer>
              {data ? (
                <CustomIconButton
                  name="Trash"
                  iconWidth="25px"
                  position="relative"
                  backgroundColor="white"
                  handleButtonClick={() => handleDelete(data)}
                />
              ) : (
                <CustomIconButton
                  name="Check"
                  iconWidth="25px"
                  position="relative"
                  backgroundColor="white"
                  handleButtonClick={handleSet}
                />
              )}
            </ButtonsContainer>
          )}

          <SubmitButton
            text={t("save")}
            backgroundColor="#353535"
            textColor="white"
            position="fixed"
            bottom="10px"
            zIndex="0"
            handleButtonClick={handleSave1}
            disabled={!(data && isSetPolygon)}
          />

          {/*  {!step2 ? (
            <SubmitButton
              text={t("next")}
              backgroundColor="#353535"
              textColor="white"
              position="fixed"
              bottom="10px"
              zIndex="0"
              handleButtonClick={handleSave1}
              disabled={!(data && isSetPolygon)}
            />
          ) : (
            <NavigationButtonsContainer>
              <CustomIconButton
                name="ArrowLeft"
                backgroundColor="white"
                handleButtonClick={() => handleBack()}
              />
              <SubmitButton
                text={t("save")}
                backgroundColor="#353535"
                textColor="white"
                left="0"
                marginLeft="10px"
                transformX="none"
                handleButtonClick={handleSave2}
                disabled={!(data && isSetPolygon)}
              />
            </NavigationButtonsContainer>
          )} */}
        </MapGL>
      )}
    </MapWrapper>,
    document.getElementById("portal-root")
  );
};

export default MapDialog;
