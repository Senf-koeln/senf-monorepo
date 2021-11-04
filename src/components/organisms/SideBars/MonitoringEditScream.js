/** @format */

import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

// MUI Stuff
import Button from "@material-ui/core/Button";

// REDUX Stuff
import { connect } from "react-redux";

import { TextField } from "@material-ui/core";

import { editScream, getUserEmail } from "../../../redux/actions/screamActions";
import { closeMonitoringScream } from "../../../redux/actions/monitoringScreamActions";

import L from "leaflet";

import _ from "lodash";

import contactIcon from "../../../images/icons/mail.png";
import menuIcon from "../../../images/icons/menu.png";
import shareBorderIcon from "../../../images/icons/shareBorder.png";
import weblinkIcon from "../../../images/icons/weblink.png";

import downloadIcon from "../../../images/icons/file.png";

import Geocoder from "react-mapbox-gl-geocoder";

import Weblink from "../../molecules/Modals/PostEditModals/Weblink";
import Contact from "../../molecules/Modals/PostEditModals/Contact";
import InlineDatePicker from "../../molecules/Modals/PostEditModals/InlineDatePicker";
import ToggleDisplay from "react-toggle-display";
import Tabs from "../../atoms/Tabs/Tabs";
import { EditScreamTabData } from "../../../data/EditScreamTabData";
import Select from "../../atoms/Selects/Select";

const styles = {
  root: {
    backgroundColor: "rgb(0,0,0,0.1)",
    padding: "0",
  },

  paper: {
    backgroundColor: "transparent",
    boxShadow: "none",
    // overflow: "hidden",
    padding: "0",
  },
  button: {
    fontSize: 20,
    textAlign: "center",
    textTransform: "none",
    width: "100%",
    height: "70px",
  },

  confirmButton: {
    fontSize: 20,
    textAlign: "center",
    textTransform: "none",
    width: "100%",
    height: "70%",
    clear: "both",
    color: "#353535",
  },
};

class MonitoringEditScream extends Component {
  state = {
    open: false,
    order: 1,
    errors: {},

    openWeblink: false,
    weblinkTitle: null,
    weblink: null,

    openContact: false,
    contactTitle: null,
    contact: null,

    openCalendar: false,
    selectedDays: [],
    selectedUnix: [],

    notes: null,
  };

  componentDidMount() {
    this.handleOpen();
  }
  // componentWillReceiveProps() {
  //   this.handleOpen();
  // }
  // componentDidCatch(prevProps, nextProps, snapshot) {
  //   alert("hi");
  //   // if (
  //   //   prevProps.openMonitoringScream === false &&
  //   //   this.props.UI.openMonitoringScream === true
  //   // ) {
  //   //   this.handleOpen();
  //   // }
  // }

  handleOpen = () => {
    this.props.getUserEmail(this.props.scream.userId);

    this.setState({
      open: true,
      title: this.props.scream.title,
      body: this.props.scream.body,
      project: this.props.scream.project,
      topic: this.props.scream.Thema,
      locationHeader: this.props.scream.locationHeader,
      district: this.props.scream.district,
      lat: this.props.scream.lat,
      long: this.props.scream.long,
      viewport: {
        latitude: this.props.scream.lat,
        longitude: this.props.scream.long,
      },
      status: this.props.scream.status,
      notes: this.props.scream.notes,
    });

    if (this.props.scream.project === undefined) {
      this.setState({
        project: "",
      });
    }

    if (this.props.scream.weblink) {
      this.setState({
        weblink: this.props.scream.weblink,
        weblinkTitle: this.props.scream.weblinkTitle,
      });
    }
    if (this.props.scream.contact) {
      this.setState({
        contact: this.props.scream.contact,
        contactTitle: this.props.scream.contactTitle,
      });
    }

    if (this.props.scream.selectedUnix) {
      const selectedDays = [];
      const selectedUnix = this.props.scream.selectedUnix;
      var i;
      for (i = 0; i < selectedUnix.length; i++) {
        selectedDays[i] = new Date(selectedUnix[i] * 1000);
      }

      this.setState({
        selectedDays: selectedDays,
        selectedUnix: this.props.scream.selectedUnix,
      });
    }
  };
  handleClose = () => {
    this.props.closeMonitoringScream();
  };

  handleChange = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value, loading: false });

    console.log(this.state.selectedUnix);
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
      [event.target.name]: event.target.value,
    });
  };

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

  onSelected = (viewport, item) => {
    this.setState({ viewport });
    setTimeout(() => {
      this._onMarkerDragEnd();
    }, 10);
  };

  _onMarkerDragEnd = (event) => {
    this.setState({
      longitude: this.state.viewport.longitude,
      latitude: this.state.viewport.latitude,
      long: this.state.viewport.longitude,
      lat: this.state.viewport.latitude,
    });

    const geocoder = L.Control.Geocoder.nominatim();

    geocoder.reverse(
      { lat: this.state.viewport.latitude, lng: this.state.viewport.longitude },
      12,
      (results) => {
        var r = results[0];
        var split = r.html.split("<br/>");
        var address = split[0];
        this.setState({
          locationHeader: address,
          address: address,
          district: r.name,
        });
      }
    );

    if (
      this.state.viewport.latitude > 51.08 ||
      this.state.viewport.latitude < 50.79 ||
      this.state.viewport.longitude < 6.712 ||
      this.state.viewport.longitude > 7.17
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
  };

  editScream = () => {
    console.log(this.state);

    const editScream = {
      screamId: this.props.scream.screamId,
      title: this.state.title,
      body: this.state.body,

      project: this.state.project,
      Thema: this.state.topic,
      locationHeader: this.state.locationHeader,
      district: this.state.district,
      lat: this.state.lat,
      long: this.state.long,

      weblinkTitle: this.state.weblinkTitle,
      weblink: this.state.weblink,

      contactTitle: this.state.contactTitle,
      contact: this.state.contact,

      status: this.state.status,
      notes: this.state.notes,
    };

    console.log(this.state.selectedUnix);
    if (this.state.selectedUnix[0] === undefined) {
      editScream.selectedUnix = null;
    } else {
      editScream.selectedUnix = this.state.selectedUnix;
    }

    // this.props.editScream(editScream, this.props.history);
  };

  handleClick = (order) => {
    this.setState({
      order,
    });
  };

  render() {
    const { projects, loadingProjects } = this.props.data;

    const {
      classes,
      scream: { Stadtteil, title, Thema },
      UI: { loading },
    } = this.props;
    const { viewport, errors } = this.state;

    const queryParams = {
      bbox: [6.7, 50.8, 7.2, 51],
    };

    const projectsArray =
      this.props.UI.openMonitoringScream && !loadingProjects ? (
        <>
          {_.orderBy(projects, "createdAt", "desc").map((projects) => (
            <option value={projects.project} className={classes.formText}>
              + {projects.title}
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

    const statusArray = (
      <>
        <option value={"None"} className={classes.formText}>
          Offen
        </option>
        <option value={"Eingereicht"} className={classes.formText}>
          Eingereicht
        </option>
        <option value={"Bereits umgesetzt"} className={classes.formText}>
          Bereits umgesetzt
        </option>
      </>
    );

    const MyInput = (props) => (
      <input
        {...props}
        placeholder={this.props.scream.locationHeader}
        id="geocoder"
      />
    );

    const colorNew =
      Thema === "Rad"
        ? "#929df6"
        : Thema === "Verkehr"
        ? "#91dff4"
        : Thema === "Umwelt und Grün"
        ? "#8dd9b8"
        : Thema === "Sport / Freizeit"
        ? "#f6c095"
        : Thema === "Inklusion / Soziales"
        ? "#e8907e"
        : Thema === "Versorgung"
        ? "#bd98f6"
        : "#f9db95";

    return !loading ? (
      <Fragment>
        <ToggleDisplay show={this.props.UI.openMonitoringScream}>
          <div className="wrapperMonitoringDialog">
            <div
              style={{
                width: "100%",
                height: "auto",
                backgroundColor: "#f8f8f8",
                paddingBottom: "5px",
              }}
            >
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    width: "15px",
                    marginTop: "20px",
                    marginLeft: "20px",
                    marginRight: "10px",
                  }}
                >
                  <div
                    style={{
                      width: "15px",
                      height: "15px",
                      borderRadius: "100%",
                      border: "0.5px white solid",
                      backgroundColor: colorNew,
                    }}
                  />
                </div>

                <div style={{ width: "110px", marginTop: "20px" }}>
                  {Stadtteil}
                </div>
              </div>
              <div
                style={{
                  width: "300px",
                  margin: "10px",
                  marginLeft: "20px",
                  fontFamily: "Futura PT W01-Bold",
                  fontSize: "20px",
                }}
              >
                {title}{" "}
              </div>
              <div
                style={{
                  width: "200px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderRadius: "20px",
                }}
              >
                <div style={{ width: "20px", margin: "10px" }}>
                  {" "}
                  <a href={"mailto:hi@gmail.com?subject=" + escape(title)}>
                    <img
                      src={weblinkIcon}
                      style={{ paddingLeft: "15px" }}
                      width="18"
                      alt="WeblinkIcon"
                    />
                  </a>
                </div>
                <div style={{ width: "20px", margin: "10px" }}>
                  {" "}
                  <a href={"mailto:hi@gmail.com?subject=" + escape(title)}>
                    <img
                      src={downloadIcon}
                      style={{ paddingLeft: "9px" }}
                      width="22"
                      alt="WeblinkIcon"
                    />
                  </a>
                </div>
                <div style={{ width: "20px", margin: "10px" }}>
                  {" "}
                  <a href={"mailto:hi@gmail.com?subject=" + escape(title)}>
                    <img
                      src={contactIcon}
                      style={{ paddingLeft: "9px" }}
                      width="22"
                      alt="WeblinkIcon"
                    />
                  </a>
                </div>

                <div style={{ width: "30px", margin: "10px" }}>
                  {" "}
                  <a href={"mailto:hi@gmail.com?subject=" + escape(title)}>
                    <img
                      src={shareBorderIcon}
                      style={{ paddingLeft: "9px" }}
                      width="22"
                      alt="WeblinkIcon"
                    />
                  </a>
                </div>

                <div style={{ width: "50px", margin: "10px" }}>
                  {" "}
                  <img
                    src={menuIcon}
                    style={{ paddingTop: "5px" }}
                    width="30"
                    alt="WeblinkIcon"
                  />
                </div>
              </div>
              <Tabs
                loading={loading}
                handleClick={this.handleClick}
                order={this.state.order}
                tabLabels={EditScreamTabData.map((item) => item.text)}
                marginTop={"20px"}
                marginBottom={"20px"}
                lineColor={"white"}
              ></Tabs>
            </div>

            <div className="textFields">
              <ToggleDisplay show={this.state.order === 1}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",

                    fontFamily: "Futura PT W01-Bold",
                  }}
                >
                  <span> Projektraum: </span>
                  <Select
                    name={"project"}
                    value={this.state.project}
                    initialValue={"Allgemein (Alle Ideen)"}
                    valuesArray={projectsArray}
                    handleDropdown={this.handleDropdown}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Futura PT W01-Bold",
                  }}
                >
                  <span> Thema:</span>

                  <Select
                    name={"topic"}
                    value={this.state.topic}
                    initialValue={"Wähle ein Thema aus"}
                    valuesArray={topicsArray}
                    handleDropdown={this.handleDropdown}
                  />
                </div>{" "}
                <Geocoder
                  mapboxApiAccessToken={
                    process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
                  }
                  onSelected={this.onSelected}
                  {...viewport}
                  hideOnSelect={true}
                  limit={3}
                  queryParams={queryParams}
                  id="geocoder-edit"
                  className="geocoder-edit"
                  inputComponent={MyInput}
                  updateInputOnSelect
                ></Geocoder>
                <TextField
                  id="title"
                  name="title"
                  type="text"
                  label="Titel"
                  margin="normal"
                  color="transparent"
                  variant="outlined"
                  className="textField"
                  multiline
                  rowsMax="2"
                  error={errors.title ? true : false}
                  helperText={errors.title}
                  value={this.state.title}
                  onChange={this.handleChange}
                  style={{ marginTop: "5px", marginBottom: "5px" }}
                ></TextField>
                <TextField
                  id="body"
                  name="body"
                  type="text"
                  label="Beschreibung"
                  margin="normal"
                  color="transparent"
                  variant="outlined"
                  className="textField"
                  multiline
                  rowsMax="12"
                  error={errors.body ? true : false}
                  helperText={errors.body}
                  value={this.state.body}
                  onChange={this.handleChange}
                  style={{ marginTop: "5px", marginBottom: "5px" }}
                ></TextField>
                <div
                  style={{
                    bottom: " -70px",
                    height: "50px",
                  }}
                >
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
                </div>
              </ToggleDisplay>
              <ToggleDisplay show={this.state.order === 2}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",

                    fontFamily: "Futura PT W01-Bold",
                    marginTop: "20px",
                  }}
                >
                  Email:
                  {this.props.data.scream_user && (
                    <a
                      href={"mailto:" + this.props.data.scream_user.email}
                      style={{
                        fontFamily: "Futura PT W01 Book",
                        textDecoration: "underline",
                      }}
                    >
                      {this.props.data.scream_user.email}
                    </a>
                  )}
                </div>{" "}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Futura PT W01-Bold",
                  }}
                >
                  <span> Status:</span>
                  <Select
                    name={"status"}
                    value={this.state.status}
                    initialValue={false}
                    valuesArray={statusArray}
                    handleDropdown={this.handleDropdown}
                  />
                </div>{" "}
                <TextField
                  id="notes"
                  name="notes"
                  type="text"
                  label="Notizen"
                  placeholder="Füge Notizen hinzu..."
                  margin="normal"
                  color="transparent"
                  variant="outlined"
                  className="textField"
                  multiline
                  rowsMax="12"
                  error={errors.body ? true : false}
                  helperText={errors.body}
                  value={this.state.notes}
                  onChange={this.handleChange}
                  style={{ marginTop: "5px", marginBottom: "5px" }}
                ></TextField>
              </ToggleDisplay>
            </div>

            <div
              className="buttons"
              style={{ position: "fixed", bottom: 0, width: "400px" }}
            >
              <Button className={classes.button} onClick={this.handleClose}>
                Abbrechen
              </Button>
              <Button
                className={classes.button}
                onClick={this.editScream}
                style={
                  (this.state.weblink !== null || this.state.weblink !== " ") &&
                  (this.state.weblinkTitle !== null ||
                    this.state.weblinkTitle !== " ")
                    ? {}
                    : { pointerEvents: "none", opacity: 0.6 }
                }
              >
                Speichern
              </Button>
            </div>
          </div>
        </ToggleDisplay>
      </Fragment>
    ) : null;
  }
}

MonitoringEditScream.propTypes = {
  classes: PropTypes.object.isRequired,
  editScream: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
  scream: state.data.scream,
  scream_user: state.data.scream_user,

  UI: state.UI,
});

const mapActionsToProps = {
  editScream,
  getUserEmail,
  closeMonitoringScream,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(MonitoringEditScream));

// import React, { Component, Fragment } from "react";
// import PropTypes from "prop-types";
// import withStyles from "@material-ui/core/styles/withStyles";

// // MUI Stuff
// import Dialog from "@material-ui/core/Dialog";

// import "mapbox-gl/dist/mapbox-gl.css";

// // Redux stuff
// import { connect } from "react-redux";
// import {
//   clearErrors,
//   closeScream,
//   openProject,
// } from "../../../redux/actions/dataActions";

// //COMPONENTS

// //ANIMATION
// import Slide from "@material-ui/core/Slide";

// import lamploader from "../../../images/lamp.png";

// //COOKIES
// import Cookies from "universal-cookie";
// const cookies = new Cookies();

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

// const styles = {
//   root: {
//     backgroundColor: "rgb(0,0,0,0.1)",
//     padding: "0",
//   },

//   paper: {
//     backgroundColor: "transparent",
//     boxShadow: "none",
//     // overflow: "hidden",
//     padding: "0",
//   },

//   closeButton: {
//     position: "relative",
//     height: "35px",
//     width: "35px",

//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 22,
//     borderRadius: "100%",
//     backgroundColor: "white",
//     boxShadow: "0 8px 40px -12px rgba(0,0,0,0.5)",
//   },
//   header: {
//     paddingTop: "10px",
//     marginLeft: "0vw",
//     width: "90%",
//     objectFit: "cover",
//   },
//   user: {
//     position: "relative",
//     float: "left",
//     color: "#353535",
//     fontSize: "12pt",
//     height: "16px",
//   },
//   date: {
//     position: "relative",
//     color: "#353535",
//     fontSize: "12pt",
//   },

//   faceButton: {
//     zIndex: 9999,
//   },

//   expandButton: {
//     position: "absolute",
//     left: "0%",
//     top: "0%",
//     width: "110%",
//     height: "110%",
//     borderRadius: 0,
//     // marginTop: "-20px",
//     // marginLeft: "-10px",
//     zIndex: 9,
//     // backgroundColor: "rgb(0,0,0,0.5)",
//   },

//   content: {
//     width: "95%",
//     padding: 15,
//     objectFit: "cover",
//   },

//   line: {
//     position: "absolute",
//     left: "85%",
//     top: "0%",
//     width: "1px",
//     backgroundColor: "#d5dadd",
//     height: "100%",
//   },

//   horrizontalLine: {
//     position: "relative",
//     left: "-15px",

//     height: "1px",
//     backgroundColor: "#d5dadd",
//     width: "calc(85% + 25px)",
//     marginTop: "20px",
//     marginBottom: "10px",
//   },

//   likeButton: {
//     zIndex: 10,
//     position: "relative",
//     left: "0%",
//     // width: "15vw",
//     // height: "15vw",
//     top: "10%",
//   },
//   likeButtonWrapper: {
//     zIndex: 10,
//     position: "absolute",
//     left: "85%",
//     // width: "15vw",
//     top: "50px",
//     textAlign: "center",
//   },
//   commentButtonWrapper: {
//     top: "170px",
//     position: "absolute",
//     left: "85%",
//   },

//   title: {
//     position: "relative",
//     width: "83%",
//     color: "rgb(87, 87, 87)",
//     paddingTop: 5,
//     paddingBottom: 5,
//     fontSize: 20,
//     fontWeight: 500,
//     fontFamily: "Playfair Display",
//     clear: "both",
//   },
//   bodytext: {
//     width: "80%",
//     fontSize: "14pt",
//     whiteSpace: "pre-line",
//   },
//   engagement: {
//     paddingRight: 10,
//     width: "100%",
//     textAlign: "center",
//     fontSize: 14,
//     color: "black",
//   },

//   locationOuter: {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "flex-start",

//     height: "25px",
//   },
//   selectedDatesOuter: {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "flex-start",

//     height: "auto",
//     paddingBottom: "10px",
//   },

//   locationIcon: {
//     marginTop: "-3px",
//     paddingRight: "2px",
//     float: "left",
//     color: "#353535",
//   },
//   locationHeader: {
//     color: "##353535",
//     float: "left",
//     paddingRight: "2%",
//     width: "100%",
//     fontSize: "12pt",
//   },

//   district: {
//     float: "left",
//     marginLeft: "10px",
//     color: "rgb(255, 205, 6)",
//     height: "3vh",
//   },

//   districtHeader: {
//     color: "rgb(255, 205, 6)",
//     float: "left",
//     paddingRight: "2%",
//     width: "100%",
//   },

//   anmeldeText: {
//     fontFamily: "Futura PT W01-Bold",
//     fontSize: "14pt",
//     color: "#414345",
//     width: "95%",
//     marginTop: "15px",
//     textAlign: "center",
//     marginLeft: "2.5%",
//     paddingBottom: "15px",
//   },

//   commentHeader: {
//     fontFamily: "Futura PT W01-Bold",
//     marginLeft: "5vw",
//     paddingTop: "1em",
//     paddingBottom: "1em",
//     color: "#414345",
//   },
//   KontaktButton: {
//     position: "absolute",
//     zIndex: 99,
//     paddingTop: "10px",
//     paddingBottom: "10px",
//     textAlign: "center",
//     width: "50vw",
//     left: "25vw",
//     top: "265vh",
//     borderRadius: "100px",
//     color: "#414345",
//     backgroundColor: "white",
//     textTransform: "none",
//     fontSize: "14pt",
//     boxShadow: "0 8px 40px -12px rgba(0,0,0,0.2)",
//   },

//   mapPlaceholder: {
//     position: "relative",
//     width: "100vw",
//     zIndex: 0,
//     height: "52vh",
//     backgroundColor: "lightgrey",
//     overflow: "hidden",
//   },

//   card2: {
//     zIndex: "99",
//     position: "relative",
//     display: "flex",
//     marginTop: "10px",
//     marginLeft: "auto",
//     marginRight: "auto",
//     width: "95%",
//     borderRadius: 20,
//     minHeight: "auto",

//     boxShadow: "0 8px 40px -12px rgba(0,0,0,0)",
//   },
//   vertline: {
//     width: "4px",
//     position: "relative",
//     backgroundColor: "#414345",
//     height: "10px",
//     marginLeft: "-2px",
//     left: "50%",
//     zIndex: "0",
//   },
// };

// class MonitoringEditScream extends Component {
//   state = {
//     open: false,
//     clicked: false,
//     oldPath: "/",

//     path: "",
//     zoomdetail: false,
//     hi: 50.9,
//     ho: 6.9,
//     count: 1,
//     MapHeight: "50vh",
//     viewport: {
//       position: "fixed",
//       width: "100vw",
//       height: "52vh",
//       zoom: 12,
//       color: "lightgrey",
//     },
//     dialogStyle: {},
//     selectedUnixConverted: null,
//   };

//   render() {
//     const {
//       UI: { loading },
//     } = this.props;

//     const dialogMarkup = loading ? (
//       <div className="fullGradientWrapper">
//         <div className="spinnerDiv">
//           <img src={lamploader} className="lamploader" alt="LikeIcon" />
//         </div>
//       </div>
//     ) : (
//       <div className="fullGradientWrapper">hiiii</div>
//     );

//     const dialog = (
//       <Dialog
//         open={this.props.UI.openMonitoringScream}
//         TransitionComponent={Transition}
//         fullScreen
//       >
//         {dialogMarkup}
//       </Dialog>
//     );

//     return <Fragment>{dialog}</Fragment>;
//   }
// }

// MonitoringEditScream.propTypes = {
//   UI: PropTypes.object.isRequired,
// };

// const mapStateToProps = (state) => ({
//   monitoringScream: state.data.monitoringScream,
//   UI: state.UI,
// });

// const mapActionsToProps = {
//   clearErrors,
// };

// export default connect(
//   mapStateToProps,
//   mapActionsToProps
// )(withStyles(styles)(MonitoringEditScream));
