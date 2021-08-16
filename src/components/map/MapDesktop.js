/** @format */

import React, { Component, Fragment, useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

import { isMobileOnly } from "react-device-detect";

import { openScream } from "../../redux/actions/dataActions";

import { connect } from "react-redux";

import CircularArrow from "../../images/icons/circular-arrow.png";

import Maploader from "../../images/map.png";

import MapGL, {
  Source,
  Layer,
  Marker,
  NavigationControl,
} from "@urbica/react-map-gl";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const styles = {
  normal: "mapbox://styles/tmorino/ckclpzylp0vgp1iqsrp4asxt6",
  filled: "mapbox://styles/tmorino/ckpgm4fwl1ip118thordyjtlm",
  root: {
    backgroundColor: "lightgrey",
  },
  mapButton: {
    zIndex: 99,
    position: "fixed",
    height: "15vw",
    width: "42vw",
    right: "0",
    bottom: "0",
    borderRadius: 0,
  },
  listButton: {
    zIndex: 99,
    position: "fixed",
    height: "15vw",
    width: "42vw",
    left: "0",
    bottom: "0",
    borderRadius: 0,
  },

  search: {
    position: "fixed",
    left: "2.5vw",
    top: "2.5vw",
    width: "50vw",
    border: "2px solid red",
    borderRadius: "4px",
    backgroundColor: "white",
    boxSizing: "border-box",
  },
  legendwrapper: {
    zIndex: "9999",
    position: "relative",
    width: "110vw",
    height: "150px",
    // left: "-12.5vw",
    borderRadius: "10px",
    //top: "-1.5vw",
    backgroundColor: "white",
    transform: "scale(0.79) translate(2.1%,-10%)",
    transformOrigin: "left",
    //marginLeft: "7px",
    padding: "20px",
  },
  legend: {
    position: "absolute",
    top: "0",
    width: "80%",
    height: "100%",
    paddingLeft: "15px",
    left: "13%",
    borderLeft: "1px #ffd388 solid",
  },
  formControl: {
    position: "relative",
    width: "auto",
    right: "-2.5vw",
    float: "right",
    top: "-2em",
    border: "0px solid #414345",
    backgroundColor: "white",
    borderRadius: "10px",
    paddingLeft: "10px",
    paddingRight: "10px",
    zIndex: 99,
  },
  formText: {
    right: "0px",
    float: "right",
    fontFamily: "Futura PT W01-Bold",
    fontSize: "15pt",
    color: "#414345",
    textAlign: "center",
  },

  anmeldeCard: {
    fontFamily: "Futura PT W01 Book",
    zIndex: "99",
    position: "relative",
    display: "flex",
    marginTop: "15px",

    width: "50vw",
    borderRadius: "100px",
    color: "white",
    backgroundColor: "#414345",
    textTransform: "none",
    fontSize: "14pt",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0)",
    marginBottom: "5px",
  },

  title: {
    position: "absolute",
    width: "200px",
    display: "block",
    fontSize: "14px",
    lineHeight: "16px",
    fontFamily: "Futura PT W01-Bold",
    textShadow: "2px 2px 18px #FFFFFF",

    opacity: 1,
    transition: "0.2s",
    PointerEvents: "none",
  },

  title_hide: {
    position: "absolute",
    opacity: 0,
    fontSize: "4px",
    lineHeight: "6px",
    transition: "0.2s",
    PointerEvents: "none",
  },
};

class MapDesktop extends Component {
  state = {
    open: true,
    styleId: "normal",
    center: [6.9503, 50.95],
    zoom1: 10.5,
    // viewport: {
    //   latitude: 50.95,
    //   longitude: 6.9503,
    //   zoom: 10.5,
    //   transitionDuration: 1000,
    //   pitch: 30,
    //   bearing: 0,
    // },
    dropdown: "10",
    show: false,
    hoverScreamId: "",
    hoverLat: "",
    hoverLong: "",
    hoverTitle: "",
    hoverLikeCount: "",
    hoverUserHandle: "",

    bounds: null,
  };

  componentDidMount() {
    if (this.props.geoData === "") {
      this.setState({
        styleId: "filled",
      });
    }
  }

  pushScreamId = (screamId, lat, long) => {
    const coordinates = lat + "#" + long;
    this.props.openScream(screamId, coordinates);
  };

  render() {
    const {
      loadingProjects,
      classes,
      // checked,
      // checked1,
      // checked2,
      // checked3,
      // checked4,
      // checked5,
      // checked6,
      // checked7,
      viewport,
      _onViewportChangeDesktop,
      dataNoLocationHandle,
      selectedId,
      showTitles,
      openInfoPageDesktop,
      noLocation,
      dataFinal,
      mapDesktopShowResults,
      mapDesktopReset,
      geoData,
    } = this.props;

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
    const dataArrayNoLocation = dataFinal;

    if (dataArrayNoLocation !== undefined && dataArrayNoLocation.length > 0) {
      dataArrayNoLocation.forEach((element) => {
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

    const doubleNoLocation =
      dataNoLocation.length > 1 ? (
        <Marker
          key={"123456"}
          longitude={6.958725744885521}
          latitude={50.93864020643174}
        >
          <div
            style={{
              zIndex: 999,
              position: "absolute",
              width: "20px",
              marginLeft: "-10px",
              height: "20px",
              marginTop: "-10px",
              borderRadius: "100%",
              border: "1px white solid",
              backgroundColor: "#414345",
              opacity: "1",
            }}
            onClick={dataNoLocationHandle}
          >
            <div
              style={{
                position: "absolute",
                width: "100%",
                textAlign: "center",
                color: "white",
                marginTop: "0px",
              }}
            >
              {dataNoLocation.length}
            </div>
          </div>
        </Marker>
      ) : null;

    const doubleNoLocationPopUp =
      selectedId !== "" ? (
        <Marker
          key={selectedId}
          longitude={6.958725744885521}
          latitude={50.93864020643174}
        >
          <div
            style={{
              position: "absolute",
              marginLeft: "-10px",
              marginTop: "10px",
            }}
          >
            <div className="noLocationPopUp">
              <p
                style={{
                  fontFamily: "Futura PT W01-Bold",
                  fontSize: "12pt",
                  paddingRight: "2px",
                  paddingLeft: "2px",
                }}
              >
                Ohne Ortsangabe
              </p>

              <button
                className="buttonWide buttonNoLocation"
                onClick={noLocation}
              >
                {dataNoLocation.length} Ideen anzeigen
              </button>
            </div>
          </div>
        </Marker>
      ) : null;

    const map = (
      <MapGL
        style={
          openInfoPageDesktop
            ? {
                position: "fixed",
                width: "100%",
                height: "100%",
                transform: "scale(1)",
                left: 0,
              }
            : {
                position: "fixed",
                width: "calc(100% - 600px)",
                left: "600px",
                height: "100%",
                transform: "scale(1)",
              }
        }
        mapStyle={styles[this.state.styleId]}
        accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        hash={true}
        minZoom={8}
        latitude={viewport.latitude}
        longitude={viewport.longitude}
        pitch={viewport.pitch}
        bearing={viewport.bearing}
        zoom={viewport.zoom}
        maxBounds={this.state.bounds}
        onViewportChange={_onViewportChangeDesktop}
        viewportChangeMethod={"easeTo"}
        viewportChangeOptions={{
          duration: 2700,
        }}
      >
        <NavigationControl showCompass showZoom position="top-right" />

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

        <button
          className="buttonWide buttonMapdesktop"
          style={
            !openInfoPageDesktop &&
            (cookies.get("Cookie_settings") === "all" ||
              cookies.get("Cookie_settings") === "minimum")
              ? { display: "block" }
              : { display: "none" }
          }
          onClick={() => mapDesktopShowResults(viewport)}
        >
          Ideen im Kartenbereich in der Liste anzeigen
        </button>

        <button
          onClick={mapDesktopReset}
          className="buttonRound buttonResetMapDesktop"
          style={
            !openInfoPageDesktop &&
            (cookies.get("Cookie_settings") === "all" ||
              cookies.get("Cookie_settings") === "minimum")
              ? { display: "block" }
              : { display: "none" }
          }
        >
          <img src={CircularArrow} width="25" alt="reset_icon"></img>
        </button>
        <div style={{ zIndex: 90 }}>
          {dataFinalMap.map((element) => (
            <Marker
              key={element.screamId}
              longitude={element.long}
              latitude={element.lat}
            >
              <div
                onMouseEnter={() =>
                  this.setState({
                    hoverScreamId: element.screamId,
                    hoverLat: element.lat,
                    hoverLong: element.long,
                    hoverTitle: element.title,
                    hoverLikeCount: element.likeCount,
                    hoverUserHandle: element.userHandle,
                  })
                }
                onMouseLeave={() =>
                  setTimeout(() => {
                    this.setState({
                      hoverScreamId: "",
                      hoverLat: "",
                      hoverLong: "",
                      hoverTitle: "",
                      hoverLikeCount: "",
                      hoverUserHandle: "",
                    });
                  }, 10000)
                }
                // onMouseOver={this.handleMouse}
                style={{
                  position: "absolute",
                  width: 7 + element.likeCount / 2 + "px",
                  marginLeft: -((7 + element.likeCount) / 4) + "px",
                  height: 7 + element.likeCount / 2 + "px",
                  marginTop: -(7 + element.likeCount) / 4 + "px",
                  borderRadius: "100%",
                  border: "1px white solid",
                  backgroundColor:
                    element.Thema === "Rad"
                      ? "#929df6"
                      : element.Thema === "Verkehr"
                      ? "#91dff4"
                      : element.Thema === "Umwelt und Grün"
                      ? "#8dd9b8"
                      : element.Thema === "Sport / Freizeit"
                      ? "#f6c095"
                      : element.Thema === "Inklusion / Soziales"
                      ? "#e8907e"
                      : element.Thema === "Versorgung"
                      ? "#bd98f6"
                      : "#f9db95",
                  opacity: "1",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: "0",
                    left: 0,
                    borderRadius: "100%",
                    overflow: "hidden",
                    boxShadow:
                      "rgba(0, 0, 0, 0.1) 0px 9px 38px, rgba(0, 0, 0, 0.15) 0px 5px 5px",
                  }}
                >
                  <button
                    onClick={() =>
                      this.pushScreamId(
                        element.screamId,
                        element.lat,
                        element.long
                      )
                    }
                    className="buttonExpand ripple"
                  ></button>
                </div>
              </div>
            </Marker>
          ))}

          <Marker
            key={this.state.hoverScreamId}
            longitude={this.state.hoverLong}
            latitude={this.state.hoverLat}
          >
            <div
              style={{
                position: "absolute",
                width: 7 + this.state.hoverLikeCount / 2 + "px",
                marginLeft: -((7 + this.state.hoverLikeCount) / 4) + "px",
                height: 7 + this.state.hoverLikeCount / 2 + "px",
                marginTop: -(7 + this.state.hoverLikeCount) / 4 + "px",
                borderRadius: "100%",
                border: "1px white solid",
                backgroundColor: "rgb(0,0,0,0.2)",
                zIndex: 0,

                opacity: "1",
                pointerEvents: "none",
              }}
            >
              <div
                className={classes.title}
                style={{
                  marginLeft: +(20 + this.state.hoverLikeCount) / 2 + "px",
                  marginTop: +(5 + this.state.hoverLikeCount) / 4 + "px",
                  transform: "translateY(-50%)",
                }}
              >
                {this.state.hoverTitle}
              </div>
            </div>
          </Marker>
        </div>

        <div style={{ zIndex: 99 }}>
          {doubleNoLocation}
          {doubleNoLocationPopUp}
        </div>
      </MapGL>
    );

    return !isMobileOnly ? <div className="mapWrapper">{map}</div> : null;
  }
}

MapDesktop.propTypes = {
  openScream: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapActionsToProps = {
  openScream,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(MapDesktop));
