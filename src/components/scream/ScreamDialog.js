/** @format */

import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";
import LikeButton from "./LikeButton";
import ChatBorder from "../../images/icons/chat.png";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import dayjs from "dayjs";
// MUI Stuff
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";

// Icons
import MenuIcon from "../../images/icons/menu.png";
import Pin from "../../images/pin3.png";
import LocationOn from "@material-ui/icons/LocationOn";
import CreateIcon from "@material-ui/icons/Create";
import EventIcon from "@material-ui/icons/Event";

import Arrow from "../../images/icons/arrow.png";

import WeblinkIcon from "../../images/icons/weblink.png";

import contactIcon from "../../images/icons/mail.png";

import Switch from "@material-ui/core/Switch";

import * as linkify from "linkifyjs";

//MAPSTUFF
import MapGL, { Marker } from "@urbica/react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Redux stuff
import { connect } from "react-redux";
import {
  clearErrors,
  closeScream,
  openProject,
} from "../../redux/actions/dataActions";

//COMPONENTS
import MenuScream from "../modals/menuScream/MenuScream";
import ReportScream from "../modals/ReportScream";
import SignNote from "../profile/SignNote";

//ANIMATION
import Slide from "@material-ui/core/Slide";

import lamploader from "../../images/lamp.png";

import Swipe from "react-easy-swipe";

import ScreamShare from "../modals/ScreamShare";

import { isMobileOnly } from "react-device-detect";

//COOKIES
import Cookies from "universal-cookie";
import AdminMenuScream from "../modals/menuScream/AdminMenuScream";
const cookies = new Cookies();

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

  closeButton: {
    position: "relative",
    height: "35px",
    width: "35px",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 22,
    borderRadius: "100%",
    backgroundColor: "white",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.5)",
  },
  header: {
    paddingTop: "10px",
    marginLeft: "0vw",
    width: "90%",
    objectFit: "cover",
  },
  user: {
    position: "relative",
    float: "left",
    color: "#353535",
    fontSize: "12pt",
    height: "16px",
  },
  date: {
    position: "relative",
    color: "#353535",
    fontSize: "12pt",
  },

  faceButton: {
    zIndex: 9999,
  },

  expandButton: {
    position: "absolute",
    left: "0%",
    top: "0%",
    width: "110%",
    height: "110%",
    borderRadius: 0,
    // marginTop: "-20px",
    // marginLeft: "-10px",
    zIndex: 9,
    // backgroundColor: "rgb(0,0,0,0.5)",
  },

  content: {
    width: "95%",
    padding: 15,
    objectFit: "cover",
  },

  line: {
    position: "absolute",
    left: "85%",
    top: "0%",
    width: "1px",
    backgroundColor: "#d5dadd",
    height: "100%",
  },

  horrizontalLine: {
    position: "relative",
    left: "-15px",

    height: "1px",
    backgroundColor: "#d5dadd",
    width: "calc(85% + 25px)",
    marginTop: "20px",
    marginBottom: "10px",
  },

  likeButton: {
    zIndex: 10,
    position: "relative",
    left: "0%",
    // width: "15vw",
    // height: "15vw",
    top: "10%",
  },
  likeButtonWrapper: {
    zIndex: 10,
    position: "absolute",
    left: "85%",
    // width: "15vw",
    top: "50px",
    textAlign: "center",
  },
  commentButtonWrapper: {
    top: "170px",
    position: "absolute",
    left: "85%",
  },

  title: {
    position: "relative",
    width: "83%",
    color: "rgb(87, 87, 87)",
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 20,
    fontWeight: 500,
    fontFamily: "Playfair Display",
    clear: "both",
  },
  bodytext: {
    width: "80%",
    fontSize: "14pt",
    whiteSpace: "pre-line",
  },
  engagement: {
    paddingRight: 10,
    width: "100%",
    textAlign: "center",
    fontSize: 14,
    color: "black",
  },

  locationOuter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",

    height: "25px",
  },
  selectedDatesOuter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",

    height: "auto",
    paddingBottom: "10px",
  },

  locationIcon: {
    marginTop: "-3px",
    paddingRight: "2px",
    float: "left",
    color: "#353535",
  },
  locationHeader: {
    color: "##353535",
    float: "left",
    paddingRight: "2%",
    width: "100%",
    fontSize: "12pt",
  },

  district: {
    float: "left",
    marginLeft: "10px",
    color: "rgb(255, 205, 6)",
    height: "3vh",
  },

  districtHeader: {
    color: "rgb(255, 205, 6)",
    float: "left",
    paddingRight: "2%",
    width: "100%",
  },

  anmeldeText: {
    fontFamily: "Futura PT W01-Bold",
    fontSize: "14pt",
    color: "#414345",
    width: "95%",
    marginTop: "15px",
    textAlign: "center",
    marginLeft: "2.5%",
    paddingBottom: "15px",
  },

  KontaktButton: {
    position: "absolute",
    zIndex: 99,
    paddingTop: "10px",
    paddingBottom: "10px",
    textAlign: "center",
    width: "50vw",
    left: "25vw",
    top: "265vh",
    borderRadius: "100px",
    color: "#414345",
    backgroundColor: "white",
    textTransform: "none",
    fontSize: "14pt",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.2)",
  },

  mapPlaceholder: {
    position: "relative",
    width: "100vw",
    zIndex: 0,
    height: "52vh",
    backgroundColor: "lightgrey",
    overflow: "hidden",
  },

  card2: {
    zIndex: "99",
    position: "relative",
    display: "flex",
    marginTop: "10px",
    marginLeft: "auto",
    marginRight: "auto",
    width: "95%",
    borderRadius: 20,
    minHeight: "auto",

    boxShadow: "0 8px 40px -12px rgba(0,0,0,0)",
  },
  vertline: {
    width: "4px",
    position: "relative",
    backgroundColor: "#414345",
    height: "10px",
    marginLeft: "-2px",
    left: "50%",
    zIndex: "0",
  },
};

class ScreamDialog extends Component {
  state = {
    open: false,
    clicked: false,
    oldPath: "/",

    path: "",
    zoomdetail: false,
    hi: 50.9,
    ho: 6.9,
    count: 1,
    MapHeight: "50vh",
    viewport: {
      position: "fixed",
      width: "100vw",
      height: "52vh",
      zoom: 12,
      color: "lightgrey",
    },
    dialogStyle: {},
    selectedUnixConverted: null,
  };

  // componentDidMount() {
  //   const data = [];
  //   var i;

  //   if (this.props.selectedUnix) {

  //     for (i = 0; i < this.props.selectedUnix.length; i++) {
  //       data.push(new Date(this.props.selectedUnix[i] * 1000));
  //     }
  //     this.setState({
  //       selectedUnixConverted: data,
  //     });
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    if (this.props.UI.openScream) {
      const { screamId } = this.props.scream;
      this.setState({
        path: `https://senf.koeln/${screamId}`,
      });

      setTimeout(() => {
        this.setState({
          dialogStyle: { position: "initial" },
        });
      }, 3000);
    } else {
      this.setState({
        dialogStyle: {},
      });
    }
  }

  handleClose = () => {
    this.props.closeScream();
    this.props.clearErrors();
  };

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

  handleOpenCookiePreferences() {
    window.open("/cookieConfigurator", "_blank");
  }

  handleClick = () => {
    this.setState({ clicked: true });
    setTimeout(
      function () {
        this.setState({ clicked: false });
      }.bind(this),
      1000
    );
  };

  handleZoom() {
    if (this.state.zoomdetail === false) {
      this.setState({
        viewport: { zoom: 16.5, pitch: 50, bearing: -40 },
        zoomdetail: true,
        MapHeight: "80vh",
      });
    }

    if (this.state.zoomdetail === true) {
      this.setState({
        viewport: { zoom: 12, pitch: 0, bearing: 0 },
        zoomdetail: false,
        MapHeight: "80vh",
      });
    }
  }

  handleUnErrorMap = () => {
    this.setState((prevState) => {
      return {
        viewport: { zoom: prevState.viewport.zoom + 0.001 },
      };
    });
  };

  onSwipeMove(position) {
    if (`${position.x}` > 150) {
      this.handleClose();
    }
    var el = document.querySelector(".wrapperScreamDialog");
    if (el.scrollTop < 5) {
      if (`${position.y}` > 250) {
        this.handleClose();
      }
    }
  }

  openProject = (project) => {
    this.props.openProject(project);
  };

  render() {
    const {
      classes,
      projectsData,
      scream: {
        screamId,
        locationHeader,
        Stadtteil,
        title,
        body,
        createdAt,
        likeCount,
        commentCount,
        lat,
        long,
        userHandle,
        comments,
        Thema,
        project,

        weblink,
        weblinkTitle,
        contact,
        contactTitle,

        selectedUnix,
      },
      UI: { loading },

      user: {
        authenticated,
        credentials: { handle, isAdmin, isModerator },
      },
    } = this.props;

    const convertedLinkRaw = weblink ? linkify.find(weblink) : null;
    const convertedLink =
      weblink && convertedLinkRaw[0] !== undefined
        ? convertedLinkRaw[0].href
        : null;

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

    const map = (
      <div className="mapWrapperDialog">
        <MapGL
          id="map"
          style={{
            position: "relative",
            zIndex: 0,
            width: "100vw",
            height: this.state.MapHeight,
            marginTop: 0,
          }}
          mapStyle="mapbox://styles/tmorino/ckclpzylp0vgp1iqsrp4asxt6"
          accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          {...this.state.viewport}
          latitude={lat}
          longitude={long}
          onViewportChange={(viewport) => this.setState({ viewport })}
          viewportChangeMethod={"easeTo"}
          viewportChangeOptions={{
            duration: 1200,
          }}
        >
          <Marker key={screamId} longitude={long} latitude={lat}>
            <div
              style={{
                position: "absolute",
                zIndex: "99",
                width: 7 + likeCount / 2,
                marginLeft: -((14 + likeCount) / 4),
                height: 7 + likeCount / 2,
                marginTop: -(7 + likeCount) / 2,
                borderRadius: "100%",
                border: "1px white solid",
                backgroundColor: colorNew,
                opacity: "1",
              }}
            >
              {/* <div
                  style={{
                    width: "4px",
                    zIndex: 1000,
                    marginLeft: -1.6 + (7 + likeCount) / 2,
                    height: "4px",
                    marginTop: -2.25 + (7 + likeCount) / 2,
                    borderRadius: "100%",
                    backgroundColor: "#414345",
                    opacity: "1",
                  }}
                /> */}
            </div>
            <div
              style={{
                marginLeft: 3 / 2,
                zIndex: "1",
                marginTop: -(7 + likeCount) / 2,
              }}
            >
              <img
                src={Pin}
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 88%, 0 88%)" }}
                className="pin"
                alt="ChatIcon"
              />
            </div>
          </Marker>
        </MapGL>
        <div className="dialoggradient" />
      </div>
    );

    // (
    //   <div className="mapWrapperDialog">
    //     <div className="CookieNoteDialog">
    //       {" "}
    //       <span className="cookiesNoteHeader">
    //         Ohne das akzeptieren aller Cookies <br /> geht diese Funktion
    //         nicht.
    //       </span>
    //       <br />
    //       <div className="cookiesNoteText">
    //         <span
    //           className="Terms"
    //           onClick={() => this.handleOpenCookiePreferences()}
    //         >
    //           Hier
    //         </span>
    //         &nbsp;findest du deine Cookie-Einstellungen.
    //       </div>
    //       <div className="Accept" onClick={() => this.handleCookies()}>
    //         Alle Akzeptieren
    //       </div>
    //     </div>

    //     <div className={classes.mapPlaceholder}>
    //       {" "}
    //       <div className="dialoggradient" />
    //       <img
    //         src={Maploader}
    //         className="Maploaderbackground"
    //         alt="ChatIcon"
    //       />
    //     </div>
    //   </div>
    // );

    const anmeldeCard = !authenticated ? (
      <div className={classes.anmeldeText}>
        <button className="buttonWide buttonDialogSign">
          <SignNote />
          Melde dich an
        </button>
      </div>
    ) : null;

    const deleteButton =
      authenticated && (isAdmin === true || isModerator === true) ? (
        <AdminMenuScream
          screamId={screamId}
          userHandle={userHandle}
          scream={this.props.scream}
          isModerator={isModerator}
          isAdmin={isAdmin}
        />
      ) : authenticated && userHandle === handle ? (
        <MenuScream
          screamId={screamId}
          userHandle={userHandle}
          scream={this.props.scream}
        />
      ) : null;

    const reportButton = !authenticated ? (
      <ReportScream screamId={screamId} userHandle={userHandle} />
    ) : authenticated & (userHandle !== handle) ? (
      <ReportScream screamId={screamId} userHandle={userHandle} />
    ) : null;

    const commentButton = !authenticated ? (
      <MyButton>
        <SignNote />
        <img src={ChatBorder} width="100%" alt="ChatIcon" />
      </MyButton>
    ) : (
      <MyButton onClick={() => this.handleClick()}>
        <img src={ChatBorder} width="90%" alt="ChatIcon" />
      </MyButton>
    );

    const projectsDataFinal = [];
    if (projectsData) {
      const projectsDataArray = projectsData;

      projectsDataArray.forEach((element) => {
        if (project === element.project) {
          projectsDataFinal.push(element.title);
        }
      });
    }

    const projectTitle = project ? (
      // && project === this.props.projects.project
      <button
        className="screamcardProjectContainer buttonWide "
        onClick={() => this.openProject(project)}
      >
        {projectsDataFinal}
      </button>
    ) : null;

    const infoButtons =
      weblink || contact ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              flexWrap: "wrap",
            }}
          >
            {weblink ? (
              <a href={convertedLink} rel="noopener noreferrer" target="_blank">
                <button className="buttonInline">
                  {weblinkTitle}
                  <img
                    src={WeblinkIcon}
                    style={{ paddingLeft: "9px", marginTop: "-2px" }}
                    width="15"
                    alt="WeblinkIcon"
                  />
                </button>
              </a>
            ) : null}
            {contact ? (
              <a href={"mailto:" + contact + "?subject=" + escape(title)}>
                <button className="buttonInline">
                  {contactTitle}{" "}
                  <img
                    src={contactIcon}
                    style={{ paddingLeft: "9px" }}
                    width="22"
                    alt="WeblinkIcon"
                  />
                </button>
              </a>
            ) : null}
          </div>
        </>
      ) : null;

    let selectedDates = [];
    const selectedUnixArray = selectedUnix;
    const options = {
      weekday: "short",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    if (selectedUnixArray !== undefined && selectedUnixArray !== null) {
      if (selectedUnixArray.length > 0) {
        selectedUnixArray.forEach((element) => {
          selectedDates.push(
            <div>
              {new Date(element * 1000).toLocaleTimeString("de-DE", options)}{" "}
              <br />{" "}
            </div>
          );
        });
      } else {
        selectedDates = (
          <div>
            {new Date(selectedUnix * 1000).toLocaleTimeString("de-DE", options)}{" "}
            <br />{" "}
          </div>
        );
      }
    }

    const selectedDatesComponent =
      selectedUnixArray !== undefined && selectedUnixArray !== null ? (
        <div className={classes.selectedDatesOuter}>
          <EventIcon className={classes.locationIcon} />

          <div className={classes.locationHeader}> {selectedDates} </div>
        </div>
      ) : null;

    const dialogMarkup = loading ? (
      <div className="wrapperScreamDialog">
        <div className="spinnerDiv">
          <img src={lamploader} className="lamploader" alt="LikeIcon" />
        </div>
      </div>
    ) : (
      <div className="wrapperScreamDialog">
        <Grid container spacing={0}>
          <Grid item sm={12} style={{ width: "100%" }}>
            <div className="dialogNavigation">
              <button onClick={this.handleClose} className="buttonRound">
                <img
                  src={Arrow}
                  width="20"
                  alt="backArrow"
                  style={{ transform: "rotate(90deg)" }}
                />
              </button>

              <ScreamShare
                screamId={screamId}
                userHandle={userHandle}
                likeCount={3}
                title={title}
                path={this.state.path}
                locationHeader={locationHeader}
                Stadtteil={Stadtteil}
                handleUnErrorMap={this.handleUnErrorMap}
              />

              <button className="buttonRound buttonEdit">
                {reportButton}
                {deleteButton}

                <img src={MenuIcon} width="25" alt="editIcon" />
              </button>
            </div>
            {map}
            <div className="dialogZoomButton" onClick={() => this.handleZoom()}>
              <Switch
                checked={this.state.zoomdetail}
                name="checkedA"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
              Detailansicht
            </div>

            <div className="dialoggradient1"></div>
            <div
              className="dialogCard"
              style={project ? { paddingBottom: "50px" } : {}}
            >
              <div className={classes.content}>
                {/* <div className={classes.locationOuter}>
                  <LocationOn className={classes.locationIcon} />{" "}
                  <div className={classes.locationHeader}>
                    {" "}
                    {locationHeader}{" "}
                  </div>
                </div> */}
                <div
                  style={{
                    width: "15px",
                    position: "relative",
                    height: "15px",
                    margintop: "5px",
                    borderRadius: "100%",
                    border: "0.5px white solid",
                    backgroundColor: colorNew,
                    opacity: "1",
                    float: "left",
                  }}
                />{" "}
                <div className={classes.district}>
                  <div className={classes.districtHeader}> {Stadtteil} </div>
                </div>
                <div className={classes.title}>{title} </div>
                <Typography className={classes.bodytext}>{body}</Typography>
                <div className={classes.line} />
                <div className={classes.likeButtonWrapper}>
                  <div className={classes.likeButton}>
                    <LikeButton screamId={screamId} />
                  </div>
                  <div className={classes.engagement}>{likeCount} </div>
                </div>
                <div className={classes.commentButtonWrapper}>
                  <div className={classes.commentButton}>{commentButton}</div>
                  <div className={classes.engagement}>{commentCount}</div>
                </div>
                <div className={classes.horrizontalLine}></div>
                <div className={classes.header}>
                  {selectedDatesComponent}
                  <div className={classes.locationOuter}>
                    <LocationOn className={classes.locationIcon} />{" "}
                    <div className={classes.locationHeader}>
                      {" "}
                      {locationHeader}{" "}
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "start",
                    }}
                  >
                    <CreateIcon className={classes.locationIcon} />{" "}
                    <Typography
                      // component={Link}
                      // to={`/users/${userHandle}`}
                      className={classes.user}
                    >
                      {userHandle}
                      &nbsp;am&nbsp;
                    </Typography>
                    <Typography className={classes.date}>
                      {dayjs(createdAt).format("DD.MM.YYYY")}
                    </Typography>
                  </div>

                  {infoButtons}

                  {projectTitle}
                </div>
              </div>
            </div>
          </Grid>

          <div className={classes.vertline} />

          <Card className={classes.card2}>
            <div className={classes.anmeldeText}>
              <span>
                {" "}
                Was hältst du von der Idee? <br /> Rege den Meinungsaustausch
                hier an!
              </span>

              {anmeldeCard}
            </div>
          </Card>

          <Comments comments={comments} />
        </Grid>
        <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
      </div>
    );

    const dialog = isMobileOnly ? (
      <Dialog
        open={this.props.UI.openScream}
        onClose={this.handleClose}
        TransitionComponent={Transition}
        fullScreen
      >
        <CommentForm screamId={screamId} clicked={this.state.clicked} />

        <Swipe onSwipeMove={this.onSwipeMove.bind(this)}>{dialogMarkup}</Swipe>
      </Dialog>
    ) : (
      <Dialog
        open={this.props.UI.openScream}
        onClose={this.handleClose}
        BackdropProps={{ classes: { root: classes.root } }}
        PaperProps={{ classes: { root: classes.paper } }}
        TransitionComponent={Transition}
        fullScreen
        hideBackdrop // Disable the backdrop color/image
        disableEnforceFocus // Let the user focus on elements outside the dialog
        style={this.state.dialogStyle} // This was the key point, reset the position of the dialog, so the user can interact with other elements
        disableBackdropClick // Remove the backdrop click (just to be sure)
      >
        <CommentForm screamId={screamId} clicked={this.state.clicked} />

        <Swipe onSwipeMove={this.onSwipeMove.bind(this)}>{dialogMarkup}</Swipe>
      </Dialog>
    );

    return <Fragment>{dialog}</Fragment>;
  }
}

ScreamDialog.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  closeScream: PropTypes.func.isRequired,
  openProject: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  scream: state.data.scream,
  UI: state.UI,
  user: state.user,
});

const mapActionsToProps = {
  closeScream,
  clearErrors,
  openProject,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ScreamDialog));
