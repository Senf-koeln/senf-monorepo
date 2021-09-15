/** @format */

import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Swipe from "react-easy-swipe";
import { isMobileCustom } from "../../util/customDeviceDetect";

// MUI Stuff
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";

// Images
import Arrow from "../../images/icons/arrow.png";
import WeblinkIcon from "../../images/icons/weblink.png";
import lamploader from "../../images/lamp.png";
import contactIcon from "../../images/icons/mail.png";

//MAPSTUFF
import "mapbox-gl/dist/mapbox-gl.css";

// Redux stuff
import { connect } from "react-redux";
import { closeScream } from "../../redux/actions/screamActions";
import { closeProject } from "../../redux/actions/projectActions";
import { clearErrors } from "../../redux/actions/errorsActions";

import Slide from "@material-ui/core/Slide";

//Components
import ProjectIdeas from "./ProjectIdeas";
import MapDesktop from "../map/MapDesktop";
import PostScream from "../postScream/PostScream";
import ScreamShare from "../modals/ScreamShare";
import CalendarComponent from "../calendar/CalendarComponent";

import Tabs from "../module/Tabs";
import { ProjectTabData } from "../../data/ProjectTabData";

import "./ProjectDialog.css";
import { CustomIconButton } from "../module/CustomButton";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = {
  root: {
    backgroundColor: "transparent",
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
    color: "#414345",
    fontSize: "12pt",
  },
  date: {
    position: "relative",
    width: "80vw",
    color: "#414345",
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
    width: "100%",
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
    width: "95%",
    color: "#353535",
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: "18px",
    fontWeight: 500,
    fontFamily: "Futura PT W01-Bold",
    clear: "both",
  },
  bodytext: {
    width: "95%",
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
    color: "rgb(255, 205, 6)",
    height: "3vh",
  },
  locationHeader: {
    color: "rgb(255, 205, 6)",
    float: "left",
    paddingRight: "2%",
    width: "100%",
  },
  locationIcon: {
    marginTop: "-3px",
    paddingRight: "2px",
    float: "left",
    color: "rgb(255, 205, 6)",
  },

  commentHeader: {
    fontFamily: "Futura PT W01-Bold",
    marginLeft: "5vw",
    paddingTop: "1em",
    paddingBottom: "1em",
    color: "#414345",
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
    left: "50vw",
    zIndex: "0",
  },
};

class ProjectDialog extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    open: false,
    clicked: false,
    oldPath: "",
    newPath: "",
    path: "",
    order: 1,

    latitude1: 51.08,
    latitude2: 50.79,
    longitude2: 6.712,
    longitude3: 7.17,

    screamIdParam: null,
    showDemand: false,
    dropdown: "newest",
    selectedId: "",
    showTitles: false,
    cookiesSetDesktop: false,

    openGeofilter: false,
    showGeofilterResults: false,
    createGeofilterCircle: false,

    dialogStyle: {},
    viewport: {
      zIndex: 9999,
      position: "fixed",
      top: "0vh",
      left: "0vw",
      width: "100vw",
      height: "100vh",
      latitude: 50.93,
      longitude: 6.9503,
      zoom: 9.2,
      maxZoom: 18,
      minZoom: 8,
    },
  };

  componentDidMount() {
    if (this.props.openProject) {
      this.handleOpen();
    }
  }

  handleOpen = () => {
    this.props.handleTopicSelector("all");

    let oldPath = window.location.pathname;
    this.setState({
      oldPath,
    });
    setTimeout(() => {
      const { project } = this.props.project;
      const newPath = `/${project}`;

      if (project !== undefined) {
        window.history.pushState(null, null, newPath);
      }

      setTimeout(() => {
        this.setState({
          path: "https://senf.koeln" + newPath,
        });
      }, 10);

      if (this.props.project.centerLong !== undefined) {
        setTimeout(() => {
          const centerLat = this.props.project.centerLat;
          const centerLong = this.props.project.centerLong;
          const zoom = this.props.project.zoom;

          if (!isMobileCustom) {
            this.props.zoomToBounds(centerLat, centerLong, zoom);
          } else {
            this.setState({
              viewport: {
                latitude: centerLat,
                longitude: centerLong,
                zoom: zoom,
                transitionDuration: 1000,
                pitch: 30,
                bearing: 0,
              },
            });
          }
        }, 600);
      }

      setTimeout(() => {
        this.setState({
          dialogStyle: { position: "initial" },
        });
      }, 2000);
    }, 10);
  };

  handleClose = () => {
    this.props.closeProject();
    this.props.clearErrors();

    setTimeout(() => {
      this.setState({
        dialogStyle: {},
      });
    }, 1000);
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
    this.props.clearErrors();
  }

  handleClick = (order) => {
    this.setState({
      order,
    });
    this.props.clearErrors();
  };

  handleDropdown = (value) => {
    this.setState({
      dropdown: value,
    });
  };

  _onViewportChange = (viewport) => {
    this.setState({ viewport, selectedId: "" });

    var metersPerPx =
      (156543.03392 *
        Math.cos((this.state.viewport.latitude * Math.PI) / 180)) /
      Math.pow(2, this.state.viewport.zoom);

    var Addnew = metersPerPx / 500;
    var Addnewtop = metersPerPx / 1000;
    var AddnewRight = metersPerPx / 500;
    var AddnewBottom = metersPerPx / 1000;

    this.setState({
      latitude1: this.state.viewport.latitude + Addnewtop,
      longitude1: this.state.viewport.longitude - Addnew,
      latitude2: this.state.viewport.latitude - AddnewBottom,
      longitude2: this.state.viewport.longitude - Addnew,
      latitude3: this.state.viewport.latitude + Addnewtop,
      longitude3: this.state.viewport.longitude + AddnewRight,
      latitude4: this.state.viewport.latitude - AddnewBottom,
      longitude4: this.state.viewport.longitude + AddnewRight,
    });
  };
  handleNoLocation = () => {
    this.setState({
      latitude1: 50.93892,
      latitude2: 50.93864,
      longitude2: 6.9586,
      longitude3: 6.9588,

      openGeofilter: false,
      open: false,
    });
  };

  dataNoLocationHandle = () => {
    this.setState({
      selectedId: "hi",
    });
  };

  handleOpenGeofilter = () => {
    this.setState({
      openGeofilter: true,
      showGeofilterResults: false,
      createGeofilterCircle: false,
    });
  };

  handleCloseGeofilter = () => {
    this.setState({
      showGeofilterResults: true,

      openGeofilter: false,
      createGeofilterCircle: true,
    });

    setTimeout(() => {
      this.setState({});
    }, 1000);
  };

  handleResetGeofilter = () => {
    this.setState({
      showGeofilterResults: true,

      openGeofilter: false,
      createGeofilterCircle: true,
      viewport: {
        zIndex: 9999,
        position: "fixed",
        top: "0vh",
        left: "0vw",
        width: "100vw",
        height: "100vh",
        latitude: 50.93,
        longitude: 6.9503,
        zoom: 9.2 + 1.6,
        maxZoom: 18,
        minZoom: 8,
      },
      latitude1: 51.08,
      latitude2: 50.79,
      longitude2: 6.712,
      longitude3: 7.17,
    });

    setTimeout(() => {
      this.setState({});
    }, 1000);
  };

  _onViewportChangeDesktop = (viewport) => {
    if (viewport.zoom > 15) {
      this.setState({
        showTitles: true,
      });
    } else {
      this.setState({
        showTitles: false,
      });
    }

    this.setState({ viewport, selectedId: "" });
  };

  mapDesktopShowResults = (viewport) => {
    var metersPerPx =
      (156543.03392 *
        Math.cos((this.state.viewport.latitude * Math.PI) / 180)) /
      Math.pow(2, this.state.viewport.zoom);

    var Addnew = metersPerPx / 200;
    var Addnewtop = metersPerPx / 200;
    var AddnewRight = metersPerPx / 200;
    var AddnewBottom = metersPerPx / 300;

    this.setState({
      latitude1: this.state.viewport.latitude + Addnewtop,
      latitude2: this.state.viewport.latitude - AddnewBottom,
      longitude2: this.state.viewport.longitude - Addnew,
      longitude3: this.state.viewport.longitude + AddnewRight,
      viewport: { ...viewport, pitch: 31 },
    });

    this.props.closeScream();
  };
  mapDesktopReset = () => {
    this.setState({
      latitude1: 51.08,
      latitude2: 50.79,
      longitude2: 6.712,
      longitude3: 7.17,
    });

    this.props.closeScream();
  };

  render() {
    const {
      classes,

      UI: { loading },
      project: {
        title,
        owner,
        imgUrl,
        description,
        startDate,
        endDate,
        geoData,
        weblink,
        contact,
        calendar,
      },
      screamIdParam,

      viewport,
      handleTopicSelector,
      topicsSelected,
      projectsData,
      loadingProjects,
    } = this.props;

    const dataRar = this.props.project.screams;

    const dataFinal = dataRar.filter(
      ({ Thema, status }) => topicsSelected.includes(Thema) && status === "None"
    );

    const dialogMarkup = loading ? (
      <div className="wrapperScreamDialog">
        <div className="spinnerDiv">
          <img src={lamploader} className="lamploader" alt="LikeIcon" />
        </div>
      </div>
    ) : (
      <div className="wrapperScreamDialog">
        <div className="dialogNavigation">
          <CustomIconButton
            name="ArrowLeft"
            position="fixed"
            handleButtonClick={this.handleClose}
          />
        </div>
        <div
          style={
            isMobileCustom
              ? { position: "absolute", top: "10px", right: "10px" }
              : { position: "absolute", top: "20px", right: "10px" }
          }
        >
          <ScreamShare
            screamId={this.props.project}
            title={title}
            path={this.state.path}
          />
        </div>

        {isMobileCustom && this.state.order === 1 && (
          <PostScream
            loadingProjects={loadingProjects}
            projectsData={projectsData}
            project={this.props.project}
          />
        )}
        <div className="imgWrapper">
          <img
            src={imgUrl}
            width="100%"
            alt="profile"
            className="profile-image"
          />
        </div>
        <div className="project-dialog-title">{title}</div>

        <Tabs
          loading={loading}
          handleClick={this.handleClick}
          order={this.state.order}
          tabLabels={
            calendar
              ? ProjectTabData.map((item) => item.text)
              : ProjectTabData.map((item) => item.text).slice(0, 2)
          }
          marginTop={"0px"}
          marginBottom={"40px"}
          lineColor={"white"}
        ></Tabs>

        {!loading && this.state.order === 1 && (
          <div className="MainAnimationChannels">
            <ProjectIdeas
              loading={loading}
              projectScreams={this.props.project.screams}
              classes={classes}
              latitude1={this.state.latitude1}
              latitude2={this.state.latitude2}
              latitude3={this.state.latitude3}
              latitude4={this.state.latitude4}
              longitude1={this.state.longitude1}
              longitude2={this.state.longitude2}
              longitude3={this.state.longitude3}
              longitude4={this.state.longitude4}
              viewport={this.state.viewport}
              _onViewportChange={this._onViewportChange}
              handleNoLocation={this.handleNoLocation}
              dataNoLocationHandle={this.dataNoLocationHandle}
              showDemand={this.state.showDemand}
              handleClick={this.handleClick}
              handleDropdown={this.handleDropdown}
              dropdown={this.state.dropdown}
              handleOpenGeofilter={this.handleOpenGeofilter}
              handleCloseGeofilter={this.handleCloseGeofilter}
              handleResetGeofilter={this.handleResetGeofilter}
              openGeofilter={this.state.openGeofilter}
              showGeofilterResults={this.state.showGeofilterResults}
              createGeofilterCircle={this.state.createGeofilterCircle}
              selectedId={this.state.selectedId}
              screamIdParam={screamIdParam}
              _onViewportChangeDesktop={this._onViewportChangeDesktop}
              showTitles={this.state.showTitles}
              loadingProjects={loadingProjects}
              geoData={geoData}
              handleTopicSelector={handleTopicSelector}
              topicsSelected={topicsSelected}
            ></ProjectIdeas>
          </div>
        )}
        {this.state.order === 2 && (
          <div className="MainAnimationChannels">
            <div className="projectDialogCard">
              <div className={classes.content}>
                <div className={classes.title}> Worum geht's</div>
                <Typography className={classes.bodytext}>
                  {description}
                  {weblink ||
                    (contact && (
                      <>
                        <br />
                        <br />
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          {weblink && (
                            <a
                              href={weblink}
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              <button className="buttonInline">
                                Mehr Infos{" "}
                                <img
                                  src={WeblinkIcon}
                                  style={{
                                    paddingLeft: "9px",
                                    marginTop: "-2px",
                                  }}
                                  width="15"
                                  alt="WeblinkIcon"
                                />
                              </button>
                            </a>
                          )}
                          {contact && (
                            <a href={"mailto:" + contact}>
                              <button className="buttonInline">
                                Kontakt
                                <img
                                  src={contactIcon}
                                  style={{ paddingLeft: "9px" }}
                                  width="22"
                                  alt="WeblinkIcon"
                                />
                              </button>
                            </a>
                          )}
                        </div>
                      </>
                    ))}
                </Typography>
                <br />
                <div className={classes.title}> Zeitraum </div>
                <Typography className={classes.bodytext}>
                  {endDate ? (
                    <div className="date">
                      {" "}
                      {startDate} – {endDate}{" "}
                    </div>
                  ) : (
                    <div className="date">{startDate} </div>
                  )}
                </Typography>
                <br />

                <div className={classes.title}>Initiatoren</div>
                <Typography className={classes.bodytext}>{owner}</Typography>
                <br />
              </div>
            </div>

            <br />
          </div>
        )}
        {this.state.order === 3 && (
          <div className="MainAnimationChannels">
            <CalendarComponent
              projectScreams={this.props.project.screams}
            ></CalendarComponent>
          </div>
        )}
      </div>
    );

    return isMobileCustom ? (
      <Dialog
        open={this.props.openProject}
        onClose={this.handleClose}
        TransitionComponent={Transition}
        fullScreen
      >
        <Swipe onSwipeMove={this.onSwipeMove.bind(this)}>{dialogMarkup}</Swipe>
      </Dialog>
    ) : (
      <Dialog
        open={this.props.openProject}
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
        <div className="contentWrapper_dialog">{dialogMarkup}</div>

        <div
          style={{
            marginLeft: "200px",
            position: "fixed",
            width: "60vw",
            height: "100vh",
            zIndex: 99,
          }}
        >
          <MapDesktop
            loadingProjects={loadingProjects}
            id="mapDesktop"
            dataFinal={dataFinal}
            geoData={geoData}
            style={{ zIndex: 9999 }}
            handleNoLocation={this.handleNoLocation}
            dataNoLocationHandle={this.dataNoLocationHandle}
            _onViewportChangeDesktop={this._onViewportChangeDesktop}
            viewport={viewport}
            selectedId={this.state.selectedId}
            showTitles={this.state.showTitles}
            mapDesktopShowResults={this.mapDesktopShowResults}
            mapDesktopReset={this.mapDesktopReset}
          ></MapDesktop>
        </div>
      </Dialog>
    );
  }
}

ProjectDialog.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  closeScream: PropTypes.func.isRequired,
  openProject: PropTypes.func.isRequired,
  closeProject: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  scream: state.data.scream,
  project: state.data.project,
  data: state.data,
  UI: state.UI,
  user: state.user,
});

const mapActionsToProps = {
  clearErrors,
  closeScream,
  closeProject,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ProjectDialog));
