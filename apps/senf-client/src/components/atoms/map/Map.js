/** @format */

import React, { useState, useEffect, memo } from "react";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import styled from "styled-components";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { openScreamFunc } from "../../../redux/actions/screamActions";
import {
  setMapLoaded,
  setMapViewport,
} from "../../../redux/actions/mapActions";

//Icons
import Pin from "../../../images/pin3.png";

//Map Stuff
import MapGL, {
  Source,
  Layer,
  Marker,
  NavigationControl,
  Image,
} from "@urbica/react-map-gl";
import bbox from "@turf/bbox";

import NoLocationPopUp from "./NoLocationPopUp";
import { MapFilter } from "./MapFilter";
import { PatternBackground } from "./styles/sharedStyles";
import { useParams } from "react-router";

import Circle1 from "../../../images/markers/circle1.png";

import Marker1 from "../../../images/markers/marker1.png";
import Marker2 from "../../../images/markers/marker2.png";
import Marker3 from "../../../images/markers/marker3.png";
import Marker4 from "../../../images/markers/marker4.png";
import Marker5 from "../../../images/markers/marker5.png";
import Marker6 from "../../../images/markers/marker5.png";
import Marker7 from "../../../images/markers/marker5.png";

import { openProjectRoomFunc } from "../../../redux/actions/projectActions";
import { setSwipePositionDown } from "../../../redux/actions/UiActions";
import { StyledSmallText } from "apps/senf-client/src/styles/GlobalStyle";

const StyledMarker = styled.div`
  box-sizing: border-box;
  width: auto;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px 6px 6px 6px;
  box-shadow: 0px 4px 6px -2px rgba(186, 160, 79, 0.5);
  background-color: #faf8f3;
  overflow: visible;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  max-width: 250px;
  margin-bottom: ${(props) => (props.order === 1 ? "40%" : "29px")};
  margin-left: ${(props) => (props.order === 1 ? "0" : "25px")};

  /* min-height: ${(props) => (props.order === 2 ? "50px" : null)}; */

  position: relative;
`;

const StyledTail1 = styled.div`
  position: absolute;
  top: 100%;
  left: calc(50% - 10px);
  width: 0;
  height: 0;
  border-color: rgba(255, 255, 255, 0.8) transparent transparent transparent;
  border-width: 10px;
  border-style: solid;
  backdrop-filter: drop-shadow(1px 1px 2px rgba(186, 160, 79, 0.5));
`;

const StyledTail2 = styled.div`
  position: absolute;
  top: calc(100% - 2px);
  left: calc(50% - 10px);
  width: 0;
  height: 0;
  border-color: #f9f9f9 transparent transparent transparent;
  border-width: 10px;
  border-style: solid;
`;
const Wrapper = styled.div`
  z-index: 9;
  margin: 0px;
  top: 0;
  left: 0;
  position: fixed;

  /* margin: 0px;
    top: 0;
    left: 600px;
    position: fixed; */
`;
const PinComponent = styled.img`
  position: absolute;
  width: 100px;
  transform: translateY(-95%) translateX(-50%) rotate(0deg);
  transform-origin: bottom center;

  z-index: -1;
`;

const Bar = styled.div`
  position: fixed;
  width: 40px;
  height: 4px;
  border-radius: 10px;
  left: calc(47.5% - 20px);
  background-color: white;
  top: 10px;
`;

const Map = ({
  loadingProjects,
  dataFinal,
  geoData,
  openProjectRoom,
  _onViewportChange,
  mapRef,
  projects,
  order,
}) => {
  const dispatch = useDispatch();
  const { screamId } = useParams();
  const mapViewport = useSelector((state) => state.data.mapViewport);
  const initialMapViewport = useSelector(
    (state) => state.data.initialMapViewport
  );
  const mapLoaded = useSelector((state) => state.data.mapLoaded);
  const [showPatternBackground, setShowPatternBackground] = useState(true);

  const openInfoPage = useSelector((state) => state.UI.openInfoPage);
  const openScream = useSelector((state) => state.UI.openScream);
  const openAccount = useSelector((state) => state.UI.openAccount);

  const scream = useSelector((state) => state.data.scream);
  const [hoverId, setHoverId] = useState("");
  const [hoverLat, setHoverLat] = useState("");
  const [hoverLong, setHoverLong] = useState("");
  const [hoverTitle, setHoverTitle] = useState("");

  const handlleMapLoaded = () => {
    setTimeout(() => {
      setShowPatternBackground(false);
    }, 1000);
    dispatch(setMapLoaded());

    if (
      !screamId &&
      !openProjectRoom &&
      initialMapViewport !== null &&
      mapLoaded
    ) {
      setTimeout(() => {
        dispatch(setMapViewport(initialMapViewport));
      }, 1000);
    }
  };
  useEffect(() => {
    if (!initialMapViewport) return;
    setTimeout(() => {
      dispatch(setMapViewport(initialMapViewport));
    }, 1000);
  }, [initialMapViewport]);

  const data =
    !loadingProjects &&
    geoData !== undefined &&
    geoData !== "" &&
    JSON.parse(geoData);

  let geojsonIdeas = { type: "FeatureCollection", features: [] };
  let geojsonProjectRooms = { type: "FeatureCollection", features: [] };

  if (dataFinal) {
    for (let point of dataFinal) {
      let properties = point;
      properties.circleRadius = 5 + point.likeCount / 7;

      const unique =
        dataFinal.filter((item) => item.long === point.long).length === 1;

      if (unique) {
        let feature = {
          type: "Feature",
          geometry: { type: "Point", coordinates: [point.long, point.lat] },
          properties: properties,
        };
        geojsonIdeas.features.push(feature);
      } else {
        function generateHash(string) {
          var hash = 0;
          if (string.length == 0) return hash;
          for (let i = 0; i < string.length; i++) {
            var charCode = string.charCodeAt(i);
            hash = (hash << 7) - hash + charCode;
            hash = hash & hash;
          }
          return hash;
        }

        function reversedNum(num) {
          return (
            parseFloat(num.toString().split("").reverse().join("")) *
            Math.sign(num)
          );
        }
        const hash = generateHash(point.screamId);

        point.long = point.long + hash / 100000000000000;
        point.lat = point.lat + reversedNum(hash) / 100000000000000;

        let feature = {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [point.long, point.lat],
          },
          properties: properties,
        };
        geojsonIdeas.features.push(feature);
      }
    }
  }

  for (let point of projects) {
    let properties = point;

    let feature = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [point.centerLong, point.centerLat],
      },
      properties: properties,
    };
    geojsonProjectRooms.features.push(feature);
  }
  const onHoverIdea = (event) => {
    if (event.features.length > 0) {
      setHoverId(event.features[0].properties.screamId);
      setHoverLat(event.features[0].properties.lat);
      setHoverLong(event.features[0].properties.long);
      setHoverTitle(event.features[0].properties.title);
    }
  };

  const onLeave = (event) => {
    if (event.features.length < 1) {
      setHoverId("");
      setHoverLat("");
      setHoverLong("");
      setHoverTitle("");
    }
  };

  const onClickIdea = (event) => {
    if (event.features.length > 0) {
      dispatch(openScreamFunc(event.features[0].properties.screamId));
      setTimeout(() => {
        setHoverId("");
        setHoverLat("");
        setHoverLong("");
        setHoverTitle("");
      }, 1000);
    }
  };

  const onHoverProjectRoom = (event) => {
    if (event.features.length > 0) {
      setHoverId(event.features[0].properties.projectRoomId);
      setHoverLat(event.features[0].properties.centerLat);
      setHoverLong(event.features[0].properties.centerLong);
      setHoverTitle(event.features[0].properties.title);
    }
  };

  const onClickProjectRoom = (event) => {
    if (event.features.length > 0) {
      dispatch(
        openProjectRoomFunc(event.features[0].properties.projectRoomId, true)
      );
      setTimeout(() => {
        setHoverId("");
        setHoverLat("");
        setHoverLong("");
        setHoverTitle("");
      }, 4000);
    }
  };

  return (
    mapViewport && (
      <React.Fragment>
        {showPatternBackground && <PatternBackground />}

        <MapGL
          ref={mapRef}
          style={
            openInfoPage
              ? {
                  position: "fixed",
                  width: "100%",
                  height: "100%",
                  transform: "scale(1)",
                  left: 0,
                }
              : isMobileCustom
              ? {
                  position: "fixed",
                  width: "100vw",
                  left: "0",
                  height: "100vh",
                  top: "0",
                  transform: "scale(1)",
                  zIndex: "-1",
                }
              : {
                  position: "fixed",
                  width: "calc(100% - 600px)",
                  left: "600px",
                  top: "0",
                  height: "100%",
                  transform: "scale(1)",
                  zIndex: "-1",
                }
          }
          mapStyle="mapbox://styles/tmorino/ckclpzylp0vgp1iqsrp4asxt6"
          accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          minZoom={7}
          latitude={mapViewport.latitude}
          longitude={mapViewport.longitude}
          pitch={mapViewport.pitch}
          bearing={mapViewport.bearing}
          zoom={mapViewport.zoom}
          onViewportChange={_onViewportChange}
          viewportChangeMethod={"easeTo"}
          viewportChangeOptions={{
            duration: mapViewport.duration,
          }}
          onLoad={handlleMapLoaded}
        >
          {!isMobileCustom && (
            <NavigationControl showCompass showZoom position="top-right" />
          )}
          {openProjectRoom &&
            !loadingProjects &&
            geoData !== undefined &&
            geoData !== "" && (
              <React.Fragment>
                <Source id="maine" type="geojson" data={data} />
                <Layer
                  id="maine"
                  type="fill"
                  source="maine"
                  paint={{
                    "fill-color": "#fed957",
                    "fill-opacity": 0.3,
                  }}
                />
              </React.Fragment>
            )}

          {!isMobileCustom && hoverLong !== "" && (
            <Marker
              longitude={hoverLong}
              latitude={hoverLat}
              anchor={order === 1 ? "center" : "left"}
            >
              <StyledMarker order={order}>
                <StyledSmallText> {hoverTitle}</StyledSmallText>
                {order === 1 && <StyledTail1 />}
                {order === 1 && <StyledTail2 />}
              </StyledMarker>
            </Marker>
          )}

          {order === 1 || openScream || openProjectRoom || openAccount ? (
            <React.Fragment>
              {!openInfoPage && !openScream && !openProjectRoom && (
                <MapFilter viewport={mapViewport} mapRef={mapRef} />
              )}

              <Source id="geojsonIdeas" type="geojson" data={geojsonIdeas} />
              {/* <Layer
                id="geojsonIdeasblur"
                source="geojsonIdeas"
                type="circle"
                paint={{
                  "circle-radius": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    0,
                    ["*", 0, ["get", "circleBlurRadius"]],

                    10,
                    ["*", 0, ["get", "circleBlurRadius"]],

                    14,
                    ["*", 4, ["get", "circleRadius"]],
                    20,
                    ["*", 0, ["get", "circleRadius"]],
                  ],
                  "circle-color": "#000",

                  "circle-blur": 1,
                  "circle-opacity": 0.15,
                }}
              /> */}
              <Image id="Circle1" image={Circle1} />

              <Layer
                id="geojsonIdeas"
                source="geojsonIdeas"
                type="symbol"
                onHover={onHoverIdea}
                onLeave={onLeave}
                onClick={onClickIdea}
                layout={{
                  "icon-image": [
                    "match",
                    ["get", "Thema"],
                    "Vereine",
                    "Marker1",
                    "Initiativen",
                    "Marker1",
                    "Planungsbüros",
                    "Marker1",
                    "Politik",
                    "Marker1",
                    "Stadtverwaltung",
                    "Marker1",
                    "Presse",
                    "Marker1",
                    "Circle1",
                  ],
                  "icon-size": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    // when zoom is 0, set each feature's circle radius to the value of its "rating" property
                    0,
                    ["*", 0.01, ["get", "circleRadius"]],

                    10,
                    ["*", 0.01, ["get", "circleRadius"]],

                    13,
                    ["*", 0.03, ["get", "circleRadius"]],
                    // when zoom is 10, set each feature's circle radius to four times the value of its "rating" property
                    20,
                    ["*", 0.05, ["get", "circleRadius"]],
                  ],
                  "icon-anchor": "center",
                  "icon-allow-overlap": false,
                }}
                // paint={{
                //   // "circle-radius": {
                //   //   base: ["get", "likeCount"],
                //   //   stops: [
                //   //     [12, 3],
                //   //     [22, 180],
                //   //   ],
                //   // },

                //   "circle-radius": [
                //     "interpolate",
                //     ["linear"],
                //     ["zoom"],
                //     // when zoom is 0, set each feature's circle radius to the value of its "rating" property
                //     0,
                //     ["*", 0.1, ["get", "circleRadius"]],

                //     10,
                //     ["*", 0.4, ["get", "circleRadius"]],

                //     // when zoom is 10, set each feature's circle radius to four times the value of its "rating" property
                //     14,
                //     ["*", 1.5, ["get", "circleRadius"]],
                //     20,
                //     ["*", 1.2, ["get", "circleRadius"]],
                //   ],
                //   "circle-color": ["get", "color"],
                //   // "circle-color": [
                //   //   "match",
                //   //   ["get", "Thema"],
                //   //   "Rad",
                //   //   "blue",
                //   //   "Umwelt und Grün",
                //   //   "#223b53",
                //   //   "Verkehr",
                //   //   "#e55e5e",
                //   //   "Asian",
                //   //   "#3bb2d0",
                //   //   /* other */ "#ccc",
                //   // ],
                //   "circle-stroke-color": "#fff",
                //   "circle-stroke-width": [
                //     "interpolate",
                //     ["linear"],
                //     ["zoom"],
                //     // when zoom is 0, set each feature's circle radius to the value of its "rating" property
                //     0,
                //     0.1,

                //     10,
                //     0.4,

                //     // when zoom is 20, set each feature's circle radius to four times the value of its "rating" property
                //     20,
                //     3,
                //   ],
                // }}
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
                      clipPath: "polygon(0 0, 100% 0, 100% 82%, 0 82%)",
                    }}
                    alt="ChatIcon"
                  />
                </Marker>
              )}

              {/* <NoLocationPopUp dataNoLocation={dataNoLocation} /> */}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Image id="Marker1" image={Marker1} />
              <Image id="Marker2" image={Marker2} />
              <Image id="Marker3" image={Marker3} />
              <Image id="Marker4" image={Marker4} />
              <Image id="Marker5" image={Marker5} />
              <Image id="Marker6" image={Marker6} />
              <Image id="Marker7" image={Marker7} />
              <Source
                id="geojsonProjectRooms"
                type="geojson"
                data={geojsonProjectRooms}
              />
              <Layer
                id="geojsonProjectRooms"
                source="geojsonProjectRooms"
                type="symbol"
                onHover={onHoverProjectRoom}
                onLeave={onLeave}
                onClick={onClickProjectRoom}
                layout={{
                  "icon-image": [
                    "match",
                    ["get", "organizationType"],
                    "Vereine",
                    "Marker1",
                    "Initiativen",
                    "Marker2",
                    "Planungsbüros",
                    "Marker3",
                    "Politik",
                    "Marker4",
                    "Stadtverwaltung",
                    "Marker5",
                    "Presse",
                    "Marker6",
                    "Marker7",
                  ],
                  "icon-size": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    // when zoom is 0, set each feature's circle radius to the value of its "rating" property
                    0,
                    0.01,

                    10,
                    0.2,

                    13,
                    0.3,
                    // when zoom is 10, set each feature's circle radius to four times the value of its "rating" property
                    20,
                    0.3,
                  ],
                  "icon-anchor": "center",
                  "icon-allow-overlap": true,
                }}
              />
            </React.Fragment>
          )}
        </MapGL>
      </React.Fragment>
    )
  );
};

export default memo(Map);
