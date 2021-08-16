/** @format */

import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";

// MUI Stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Card from "@material-ui/core/Card";

//LOADERICON
import CircularProgress from "@material-ui/core/CircularProgress";

import nominatim from "nominatim-geocode";
import L from "leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";

//HANDLER
import SignNote from "../profile/SignNote";

//ICONS
import LocationOn from "@material-ui/icons/LocationOn";
import AddIcon from "../../images/icons/plus_white.png";
import Geolocate from "../../images/icons/geolocate.png";

import CloseIcon from "@material-ui/icons/Close";

import Arrow from "../../images/icons/arrow.png";

// REDUX STUFF
import { connect } from "react-redux";
import { postScream, clearErrors } from "../../redux/actions/dataActions";
import { withRouter } from "react-router-dom";

import _ from "lodash";

//SEARCH
import Geocoder from "react-mapbox-gl-geocoder";

import ReactMapGL, {
  Marker,
  GeolocateControl,
  Source,
  Layer,
} from "react-map-gl";

// import MapGL, {
//   Source,
//   Layer,
//   Marker,
//   NavigationControl,
// } from "@urbica/react-map-gl";
import Pin from "../../images/pin3.png";

//IF COOKIES NOT ACCEPTED
import Maploader from "../../images/map.png";

import PostScreamRules from "../modals/PostScreamRules";

import { ConsoleView, isAndroid, isMobileOnly } from "react-device-detect";

//ANIMATION
import Slide from "@material-ui/core/Slide";

//COOKIES
import Cookies from "universal-cookie";
import { MuiThemeProvider, NativeSelect } from "@material-ui/core";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import Weblink from "../modals/postModals/Weblink";
import Contact from "../modals/postModals/Contact";
import InlineDatePicker from "../modals/postModals/InlineDatePicker";

const cookies = new Cookies();

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const theme = createMuiTheme({
  overrides: {
    MuiInput: {
      underline: {
        "&&&&:before": {
          borderBottom: "1px solid rgba(0, 0, 0, 0)",
        },
        "&&&&:after": {
          borderBottom: "1px solid rgba(255, 255, 255, 0)",
        },
      },
    },
    MuiNativeSelect: {
      icon: {
        opacity: 0,
      },
    },
  },
});
const styles = {
  root: {
    padding: "0",
    overflow: "hidden",
    backgroundColor: "rgb(0,0,0,0.8)",
    backdropFilter: "blur(5px)",
  },

  paper: {
    boxShadow: "none",
    overflow: "hidden",
    padding: "0",
    top: "0",
    overflow: "hidden",
    borderRadius: "0px",
    backgroundColor: "transparent",
  },

  progress: {
    position: "absolute",
    left: "50%",
    marginLeft: "-15px",
    bottom: "10px",
    zIndex: "9999",
  },

  content: {
    padding: 25,
    objectFit: "cover",
    overflow: "scroll",
    width: "100%",
  },

  textField: {
    marginTop: "0px",
    width: "100%",
  },
  submitButton: {
    zIndex: "99999",
    position: "fixed",
    bottom: "10px",
    left: "25vw",
    float: "right",
    width: "50vw",
    borderRadius: "30px",
    textTransform: "none",
    fontSize: "14pt",
    backgroundColor: "white",
    boxShadow: "0 0px 40px -12px rgba(0,0,0,0.2)",
  },

  postScreamTitle: {
    marginTop: "20px",
    fontSize: "28pt",
    color: "rgb(255, 205, 6)",
    backgroundColor: "white",
    textAlign: "center",
  },
  locationField: {
    fontSize: "10pt",
    color: "yellow",
    margin: 0,
  },
  locationOuter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    color: "rgb(255, 205, 6)",
    height: "3vh",
  },
  locationHeader: {
    color: "rgb(255, 205, 6)",
    float: "left",
    paddingRight: "1%",
  },

  add: {
    zIndex: 990,
    position: "fixed",
    backgroundColor: "#FFD862",
    width: "7vw",
    padding: "2.5vw",
    border: "1px white solid",
    borderRadius: "100%",
    bottom: "9px",
    left: "50%",
    marginLeft: "-6.2vw",
    boxShadow: "0 0px 40px -12px rgba(0,0,0,0.5)",
  },
  mapwrapper: {
    position: "absolute",
    top: "0",
  },
  Authlink: {
    position: "fixed",
    top: "25vh",
    height: "80vh",
    zIndex: "99999",
    width: "100%",
  },

  AuthlinkDesktop: {
    zIndex: 992,
    position: "fixed",
    top: "40px",

    left: 0,
    marginLeft: "210px",
    marginRight: "auto",
    height: "600px",
    width: "380px",
    borderRadius: "20px",
    boxShadow: "0 0px 40px -12px rgba(0,0,0,0)",
  },

  explain: {
    position: "fixed",
    textAlign: "left",
    top: "22px",
    left: "27vw",
    width: "80vw",
    color: "#414345",
    zIndex: 1999,
    fontFamily: "Futura PT W01-Bold",
    pointerEvents: "none",
  },
  smallText: {
    width: "100%",
    fontSize: "14pt",
    position: "fixed",
    bottom: "1em",
    zIndex: "999",
    textAlign: "center",
    textDecoration: "underline",
    textShadow: "0px 3px 9px rgba(255, 255, 255, 1)",
  },

  boldText: {
    fontFamily: "Futura PT W01-Bold",
  },
};

const geolocateStyle = {
  position: "fixed",
  zIndex: "9999",
  top: "2.5%",
  right: "2.5%",
  margin: "auto",
  height: "50px",
  width: "50px",
  borderRadius: "15px",
  boxShadow: "0 8px 30px -12px rgba(0,0,0,0.5)",
  backgroundColor: "#fed957",
  display: "flex",
  position: "absolute",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
};

const geolocateStyle_hide = {
  display: "none",
};

const geolocateIcon = {
  position: "fixed",
  zIndex: "9999",
  top: "2.5%",
  right: "2.5%",
  margin: "auto",
  height: "50px",
  width: "50px",
  borderRadius: "15px",
  boxShadow: "0 8px 30px -12px rgba(0,0,0,0.5)",
  backgroundColor: "#fed957",
  display: "flex",
  position: "absolute",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  pointerEvents: "none",
};

const geolocateIcon_hide = {
  display: "none",
};

// const geolocateStyleWeb = {
//   position: "fixed",
//   zIndex: "9999",
//   top: "4vw",
//   right: "calc(((100vw - 600px)/2) - 200px)",
//   margin: "auto",
//   height: "50px",
//   width: "50px",
//   borderRadius: "15px",
//   boxShadow: "0 8px 30px -12px rgba(0,0,0,0.5)",
//   backgroundColor: "#fed957",
//   display: "flex",
//   position: "absolute",
//   alignItems: "center",
//   justifyContent: "center",
//   textAlign: "center",
// };

// const geolocateIconWeb = {
//   position: "fixed",
//   zIndex: "9999",
//   top: "4vw",
//   right: "calc(((100vw - 600px)/2) - 200px)",
//   margin: "auto",
//   marginright: "",
//   height: "50px",
//   width: "50px",
//   borderRadius: "15px",
//   boxShadow: "0 8px 30px -12px rgba(0,0,0,0.5)",
//   backgroundColor: "#fed957",
//   display: "flex",
//   position: "absolute",
//   alignItems: "center",
//   justifyContent: "center",
//   textAlign: "center",
//   pointerEvents: "none",
// };

class PostScream extends Component {
  constructor(props) {
    super(props);
    this.handleChangeCalendar = this.handleChangeCalendar.bind(this);
  }
  state = {
    open: false,
    Out: false,
    // load: false,
    loading: false,
    body: "",
    title: "",
    project: "",
    topic: "",
    openWeblink: false,
    weblinkTitle: null,
    weblink: null,

    openContact: false,
    contactTitle: null,
    contact: null,

    openCalendar: false,
    selectedDays: [],
    selectedUnix: [],

    geoData: "",
    clicked: false,
    AndroidStyle: false,
    errors: {},
    viewport: {
      latitude: 50.93864020643174,
      longitude: 6.958725744885521,
      zoom: 12,
      transitionDuration: 1000,
      pitch: 0,
    },
    latitude: 50.93864020643174,
    longitude: 6.958725744885521,
    address_long: "Wähle einen Ort",
    address_short: "gesplitted",
    address: "Ohne Ortsangabe",
    district: "",

    MapHeight: "100vh",
    zoomdetail: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: "", open: false, errors: {} });
      this.setState({ title: "", open: false, errors: {} });
    }
  }

  componentDidMount() {
    if (isAndroid) {
      this.setState({ AndroidStyle: true });
    }
  }

  handleOpen = () => {
    let coordinates = window.location.hash;

    let lat = Number(coordinates.split("#")[1]);
    let long = Number(coordinates.split("#")[2]);

    console.log(lat, long);
    this.setState({ open: true, loading: false });

    const project =
      window.location.pathname.indexOf("_") > 0
        ? window.location.pathname.substring(1)
        : "";

    this.setState({
      project: project,
    });

    const dataArrayProjectSelector = this.props.projectsData;

    dataArrayProjectSelector.forEach((element) => {
      if (project === element.project) {
        this.setState({
          geoData: element.geoData,
          viewport: {
            zoom: element.zoom,
            latitude: element.centerLat,
            longitude: element.centerLong,
            transitionDuration: 1000,
          },
        });
      }
      if (project === "") {
        this.setState({
          geoData: "",
          viewport: {
            zoom: 12,
            latitude: 50.93864020643174,
            longitude: 6.958725744885521,
            transitionDuration: 1000,
          },
        });
      }
    });
  };

  handleOpenCookiePreferences() {
    window.open("/cookieConfigurator", "_blank");
  }
  handleCookies() {
    cookies.set("Cookie_settings", "all", {
      path: "/",
      maxAge: 60 * 60 * 24 * 90,
      sameSite: "none",
      secure: true,
    });
    this.setState({ open: false });
    this.setState({ open: true });
  }

  handleRules() {
    cookies.set("Cookie_Rules", "true", {
      path: "/",
      maxAge: 60 * 60 * 24 * 90,
      sameSite: "none",
      secure: true,
    });
    this.setState({ open: false });
    this.setState({ open: true });
  }

  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };
  handleChange = (event) => {
    event.preventDefault();

    this.setState({ [event.target.name]: event.target.value, loading: false });
  };

  handleChangeCalendar = (selectedDays) => {
    const selectedUnix = [];
    var i;
    for (i = 0; i < selectedDays.length; i++) {
      selectedUnix[i] = selectedDays[i]["unix"];
    }

    this.setState({ selectedDays: selectedDays, selectedUnix: selectedUnix });
  };

  handleDropdown = (event) => {
    event.preventDefault();
    this.setState({
      project: event.target.value,
    });

    const dataArrayProjectSelector = this.props.projectsData;

    dataArrayProjectSelector.forEach((element) => {
      if (event.target.value === element.project) {
        this.setState({
          geoData: element.geoData,
          viewport: {
            zoom: element.zoom,
            latitude: element.centerLat,
            longitude: element.centerLong,
            transitionDuration: 1000,
          },
        });
      }
      if (event.target.value === "") {
        this.setState({
          geoData: "",
          viewport: {
            zoom: 12,
            latitude: 50.93864020643174,
            longitude: 6.958725744885521,
            transitionDuration: 1000,
          },
        });
      }
    });
  };

  handleDropdownTopic = (event) => {
    event.preventDefault();
    this.setState({
      topic: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    console.log(this.state.selectedUnix);

    this.setState({
      loading: true,
    });

    const newScream = {
      body: this.state.body,
      title: this.state.title,
      locationHeader: this.state.address,
      district: this.state.district,
      lat: this.state.latitude,
      long: this.state.longitude,
      project: this.state.project,
      Thema: this.state.topic,
      weblinkTitle: this.state.weblinkTitle,
      weblink: this.state.weblink,

      contactTitle: this.state.contactTitle,
      contact: this.state.contact,
    };

    if (this.state.selectedUnix.length > 0) {
      newScream.selectedUnix = this.state.selectedUnix;
    }

    this.props.postScream(newScream, this.props.history);
  };

  _onMarkerDragEndDesktop = (newViewport) => {
    setTimeout(
      this.setState({
        clicked: false,
        viewport: newViewport,
        longitude: this.state.viewport.longitude,
        latitude: this.state.viewport.latitude,
      }),

      1000
    );
    setTimeout(() => {
      const geocoder = L.Control.Geocoder.nominatim();

      geocoder.reverse(
        { lat: this.state.latitude, lng: this.state.longitude },
        12,
        (results) => {
          var r = results[0];
          var split = r.html.split("<br/>");
          var address = split[0];
          this.setState({ address: address, district: r.name });
        }
      );

      if (
        this.state.latitude > 51.08 ||
        this.state.latitude < 50.79 ||
        this.state.longitude < 6.712 ||
        this.state.longitude > 7.17
      ) {
        alert("Außerhalb von Köln kannst du leider noch keine Ideen teilen.");
        this.setState({
          Out: true,
        });
      } else {
        this.setState({
          Out: false,
        });
      }
    }, 1010);
  };

  geoclick = () => {
    setTimeout(
      function () {
        this._onMarkerDragEndDesktop();
      }.bind(this),
      1000
    );
  };

  onSelected = (viewport, item) => {
    setTimeout(
      function () {
        this.setState({ viewport });
        setTimeout(
          function () {
            this._onMarkerDragEndDesktop();
          }.bind(this),
          2000
        );
      }.bind(this),
      500
    );
  };

  clicked = () => {
    this.setState({ clicked: true });
  };

  handleZoom() {
    if (this.state.zoomdetail === false) {
      this.setState({
        zoomdetail: true,
        MapHeight: "30vh",
      });
    }

    if (this.state.zoomdetail === true) {
      this.setState({
        zoomdetail: false,
        MapHeight: "100vh",
      });
    }
  }

  handleZoomNoLocation() {
    if (this.state.zoomdetail === false) {
      this.setState({
        latitude: 50.93864020643174,
        longitude: 6.958725744885521,
        address: "Ohne Ortsangabe",
        district: "",
        zoomdetail: true,
        MapHeight: "30vh",
      });
    }

    if (this.state.zoomdetail === true) {
      this.setState({
        // viewport: { zoom: 12, pitch: 0, bearing: 0 },
        zoomdetail: false,
        MapHeight: "100vh",
      });
    }
  }

  handleOpenWeblink = () => {
    this.setState({
      openWeblink: true,
    });
  };
  handleCloseWeblink = () => {
    this.setState({
      openWeblink: false,
      weblink: null,
      weblinkTitle: null,
    });
  };
  handleSaveWeblink = () => {
    this.setState({
      openWeblink: false,
    });
  };

  handleOpenContact = () => {
    this.setState({
      openContact: true,
    });
  };
  handleCloseContact = () => {
    this.setState({
      openContact: false,
      contact: null,
      contactTitle: null,
    });
  };
  handleSaveContact = () => {
    this.setState({
      openContact: false,
    });
  };

  handleOpenCalendar = () => {
    this.setState({
      openCalendar: true,
    });
    console.log(this.state.selectedDays);
  };
  handleCloseCalendar = () => {
    this.setState({
      openCalendar: false,
      // weblink: "",
      // weblinkTitle: "",
    });
  };
  handleSaveCalendar = () => {
    this.setState({
      openCalendar: false,
    });
  };

  render() {
    const { address, viewport, errors } = this.state;

    const queryParams = {
      bbox: [6.7, 50.8, 7.2, 51],
    };
    const {
      classes,
      openInfoPageDesktop,
      loadingProjects,
      projectsData,

      UI: { loading },
    } = this.props;
    const { authenticated } = this.props.user;

    const data =
      !loadingProjects && this.state.geoData !== ""
        ? {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [JSON.parse(this.state.geoData)],
            },
          }
        : {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [],
            },
          };

    // const MyInput = (props) => (
    //   <input {...props} placeholder="" id="geocoder" />
    // );

    const addressLine =
      this.state.address === "Ohne Ortsangabe" ? (
        <>Adresse eingeben</>
      ) : (
        this.state.address
      );

    const projectsArray =
      this.state.open && !loadingProjects ? (
        <>
          {_.orderBy(projectsData, "createdAt", "desc").map((projects) => (
            <option value={projects.project} className={classes.formText}>
              +{projects.title}
            </option>
          ))}
        </>
      ) : null;

    const topicsArray = (
      <>
        <option value={"Inklusion / Soziales"} className={classes.formText}>
          Inklusion / Soziales
        </option>
        <option value={"Rad"} className={classes.formText}>
          Rad
        </option>
        <option value={"Sport / Freizeit"} className={classes.formText}>
          Sport / Freizeit
        </option>
        <option value={"Umwelt und Grün"} className={classes.formText}>
          Umwelt und Grün
        </option>
        <option value={"Verkehr"} className={classes.formText}>
          Verkehr
        </option>
        <option value={"Versorgung"} className={classes.formText}>
          Versorgung
        </option>
        <option value={"Sonstige"} className={classes.formText}>
          Sonstige
        </option>
      </>
    );

    const map = (
      <div className={classes.mapwrapper}>
        <div
          onClick={this.clicked}
          style={
            this.state.zoomdetail === false
              ? { display: "block" }
              : { display: "none" }
          }
        >
          <Geocoder
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
            onSelected={this.onSelected}
            viewport={viewport}
            hideOnSelect={true}
            limit={3}
            queryParams={queryParams}
            id="geocoder"
            transitionDuration={1000}
          ></Geocoder>
          <div
            className="pinLocationHeader"
            style={
              this.state.clicked === false ? { zIndex: 9999 } : { zIndex: 0 }
            }
          >
            {addressLine}
          </div>
        </div>

        <ReactMapGL
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          mapStyle="mapbox://styles/tmorino/ck0seyzlv0lbh1clfwepe0x0x?optimize=true"
          {...viewport}
          maxZoom={18}
          minZoom={11}
          width="calc(100vw - 600px)"
          height="100vh"
          style={{ position: "fixed", right: 0 }}
          onViewportChange={this._onMarkerDragEndDesktop}
        >
          <div style={{ pointerEvents: "none" }}>
            <Marker
              longitude={viewport.longitude}
              latitude={viewport.latitude}
              offsetTop={-150}
              offsetLeft={-75}
            >
              <img src={Pin} width="150" alt="ChatIcon" />
            </Marker>
          </div>

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
        </ReactMapGL>

        <div
          className="selectLocationContainer"
          style={this.state.zoomdetail ? { zIndex: 1 } : { zIndex: 5 }}
        >
          <div
            onClick={() => this.handleZoom()}
            style={
              this.state.zoomdetail
                ? {
                    display: "block",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#000000",
                    position: "absolute",
                    zIndex: 99999,
                    opacity: 0.6,
                    borderRadius: "19px",
                  }
                : {
                    display: "none",
                  }
            }
          ></div>
          <div className="projectSelectContainer">
            <span className={classes.boldText}> An: </span>

            <MuiThemeProvider theme={theme}>
              <NativeSelect
                value={this.state.project}
                onChange={this.handleDropdown}
                name="dropdown"
                className="projectFormControl"
                inputProps={{ "aria-label": "dropdown" }}
                inputStyle={{
                  fontFamily: "Futura PT W01-Bold",
                }}
                id="dropdown"
                IconComponent={() => (
                  <img
                    src={Arrow}
                    width="20px"
                    style={{
                      marginTop: "0px",
                      marginLeft: "-24px",
                      pointerEvents: "none",
                    }}
                  ></img>
                )}
              >
                <option value="" className={classes.boldText}>
                  Allgemein (Alle Ideen)
                </option>
                {projectsArray}
              </NativeSelect>
            </MuiThemeProvider>
          </div>{" "}
          <br />
          <button
            className={
              this.state.project !== ""
                ? "buttonWide buttonSelectLocationNo_hide"
                : "buttonWide buttonSelectLocationNo"
            }
            onClick={() => this.handleZoomNoLocation()}
          >
            Ohne Ort
          </button>
          <button
            className={
              this.state.address === "Ohne Ortsangabe"
                ? "buttonWide buttonSelectLocation_hide"
                : "buttonWide buttonSelectLocation"
            }
            onClick={() => this.handleZoom()}
          >
            Ort bestätigen
          </button>
        </div>

        <form onSubmit={this.handleSubmit}>
          <div
            className="postCard"
            style={this.state.zoomdetail ? { zIndex: 5 } : { zIndex: 1 }}
          >
            <div
              onClick={() => this.handleZoom()}
              style={
                this.state.zoomdetail
                  ? {
                      display: "none",
                    }
                  : {
                      display: "block",
                      width: "100%",
                      height: "100%",
                      backgroundColor: "#000000",
                      position: "absolute",
                      zIndex: 99999,
                      opacity: 0.6,
                      borderRadius: "19px",
                    }
              }
            ></div>

            <div className={classes.content}>
              <div
                className={classes.locationOuter}
                onClick={() => this.handleZoom()}
                // onDragStart={() => this.handleClickAdress()}
              >
                <LocationOn style={{ marginTop: "-5px" }} />{" "}
                <div className={classes.locationHeader}> ~ {address} </div>
              </div>
              <PostScreamRules></PostScreamRules>
              <TextField
                name="title"
                type="text"
                label="Titel deiner Idee"
                multiline
                rowsMax="2"
                placeholder=""
                error={errors.title ? true : false}
                helperText={errors.title}
                className={classes.textField}
                onChange={this.handleChange}
                margin="normal"
                fullWidth
                inputProps={{ maxLength: 70 }}
              />
              <TextField
                name="body"
                type="text"
                label="Beschreibung deiner Idee"
                multiline
                rowsMax="12"
                InputProps={{ disableUnderline: true }}
                placeholder=""
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                margin="normal"
                fullWidth
                inputProps={{ maxLength: 800 }}
              />

              <Weblink
                openWeblink={this.state.openWeblink}
                handleOpenWeblink={this.handleOpenWeblink}
                handleCloseWeblink={this.handleCloseWeblink}
                handleSaveWeblink={this.handleSaveWeblink}
                weblinkTitle={this.state.weblinkTitle}
                weblink={this.state.weblink}
                handleChange={this.handleChange}
              ></Weblink>
              <Contact
                openContact={this.state.openContact}
                handleOpenContact={this.handleOpenContact}
                handleCloseContact={this.handleCloseContact}
                handleSaveContact={this.handleSaveContact}
                contactTitle={this.state.contactTitle}
                contact={this.state.contact}
                handleChange={this.handleChange}
              ></Contact>
              <div
                style={
                  this.state.project === "Agora:_Sommer_des_guten_lebens"
                    ? {}
                    : { display: "none" }
                }
              >
                <InlineDatePicker
                  openCalendar={this.state.openCalendar}
                  handleOpenCalendar={this.handleOpenCalendar}
                  handleCloseCalendar={this.handleCloseCalendar}
                  handleSaveCalendar={this.handleSaveCalendar}
                  handleChange={this.handleChangeCalendar}
                  selectedDays={this.state.selectedDays}
                ></InlineDatePicker>
              </div>
              <div className="topicSelectContainer">
                <span>Thema: </span>

                <MuiThemeProvider theme={theme}>
                  <NativeSelect
                    value={this.state.topic}
                    onChange={this.handleDropdownTopic}
                    name="dropdown"
                    className="projectFormControl"
                    inputProps={{ "aria-label": "dropdown" }}
                    id="dropdown"
                    IconComponent={() => (
                      <img
                        src={Arrow}
                        width="20px"
                        style={{
                          marginTop: "0px",
                          marginLeft: "-24px",
                          pointerEvents: "none",
                        }}
                      ></img>
                    )}
                  >
                    <option value="" className={classes.formText}>
                      Wähle das Thema aus
                    </option>
                    {topicsArray}
                  </NativeSelect>
                </MuiThemeProvider>
              </div>
            </div>
            <button
              type="submit"
              className="submitPostButton buttonWide"
              disabled={this.state.loading || this.state.Out ? true : false}
              style={
                this.state.zoomdetail
                  ? {
                      display: "block",
                    }
                  : {
                      display: "none",
                    }
              }
            >
              Idee teilen
              {this.state.loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </button>
          </div>
        </form>
      </div>
    );

    const AuthlinkDesktop = !authenticated ? (
      <div className={classes.AuthlinkDesktop}>
        <SignNote />
      </div>
    ) : null;

    return (
      <Fragment>
        <button
          onClick={this.handleOpen}
          className={openInfoPageDesktop ? "add add_hide" : "add"}
        >
          <img src={AddIcon} width="25" alt="AddIcon" />
          <span className="addText">Neue Idee</span>
        </button>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullScreen
          BackdropProps={{ classes: { root: classes.root } }}
          PaperProps={{ classes: { root: classes.paper } }}
        >
          {AuthlinkDesktop}
          <button
            tip="Close"
            onClick={this.handleClose}
            className="buttonRound buttonClose "
          >
            <img
              src={Arrow}
              width="20"
              alt="backArrow"
              style={{ transform: "rotate(90deg)" }}
            />
          </button>

          <div className="postScreamMapWrapper">
            <div className="PostBackground"></div>

            {map}
          </div>
        </Dialog>
      </Fragment>
    );
  }
}

PostScream.propTypes = {
  user: PropTypes.object.isRequired,
  postScream: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  user: state.user,
});

export default connect(mapStateToProps, { postScream, clearErrors })(
  withStyles(styles)(withRouter(PostScream))
);
