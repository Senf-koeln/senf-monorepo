/** @format */

import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import { connect } from "react-redux";
import {
  getAllFullScreams,
  getallComments,
  getallLikes,
  getProjects,
  closeScream,
  openScreamFirstTime,
  openProject,
  closeProject,
} from "../redux/actions/dataActions";

import { isMobileOnly } from "react-device-detect";

import { clearErrors } from "../redux/actions/dataActions";
import { logoutUser } from "../redux/actions/userActions";

//ICONS
import Sort from "../images/icons/sort.png";
import Arrow from "../images/icons/arrow.png";
import Not_connected from "../images/Not_connected.png";

import Cookies from "universal-cookie";
import { MonitoringDesktopSidebar } from "../components/layout/MonitoringDesktopSidebar";

import _ from "lodash";
import ToggleDisplay from "react-toggle-display";
import MonitoringScream from "../components/monitoringScream/MonitoringScream";

import { MuiThemeProvider, NativeSelect } from "@material-ui/core";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

import { ExportToExcel } from "../components/monitoringScream/ExportToExcel";

import ChatBorder from "../images/icons/chat.png";
import LikeIcon from "../images/icons/handsnoclap.png";
import CreatedAtIcon from "../images/icons/calendar.png";
import MonitoringEditScream from "../components/monitoringScream/MonitoringEditScream";

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

const cookies = new Cookies();

const styles = {};

export class monitoring extends Component {
  // TOGGLES
  constructor(props) {
    super(props);
    this.props.getAllFullScreams();
    this.props.getProjects();

    this.state = {
      order: 1,
      project: "",

      latitude1: 51.08,
      latitude2: 50.79,
      longitude2: 6.712,
      longitude3: 7.17,
      geofilterStatus: false,
      loadingPage: false,
      hasNextPage: true,
      userHandle: this.props.user.credentials.handle,
      screamIdParam: null,
      projectIdParam: null,
      count: 0,
      showDemand: false,
      checked: 1,
      checked1: "Empty",
      checked2: "Empty",
      checked3: "Empty",
      checked4: "Empty",
      checked5: "Empty",
      checked6: "Empty",
      checked7: "Empty",
      dropdown: "10",
      selectedId: "",
      showTitles: false,
      openInfoPageDesktop: false,
      cookiesSetDesktop: false,

      openGeofilter: false,
      showGeofilterResults: false,
      createGeofilterCircle: false,

      channelOrder: 1,

      openScream: false,
      openProject: false,
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

    if (
      cookies.get("Cookie_settings") !== "all" &&
      cookies.get("Cookie_settings") !== "minimum" &&
      isMobileOnly
    ) {
      this.props.history.push("/intro");
    }
  }

  componentDidMount() {
    this.props.clearErrors();
    window.scrollTo({
      top: 0,
      left: 0,
    });
    const screamId = this.props.match.params.screamId;

    if (
      screamId &&
      (cookies.get("Cookie_settings") === "all" ||
        cookies.get("Cookie_settings") === "minimum")
    ) {
      if (screamId.indexOf("_") > 0) {
        this.props.openProject(screamId);
      } else {
        this.props.openScreamFirstTime(screamId);
      }
      this.setState({ screamIdParam: screamId });

      if (window.location.pathname === "/projects") {
        this.handleClick(2);
      }
    } else {
      setTimeout(() => {
        if (!isMobileOnly) {
          this.setState({
            viewport: {
              latitude: 50.95,
              longitude: 6.9503,
              zoom: 11.5,
              transitionDuration: 4000,
              pitch: 30,
              bearing: 0,
            },
          });
        }
      }, 3000);
    }

    if (!isMobileOnly) {
      window.addEventListener("popstate", this.handleOnUrlChange, false);
    }

    if (
      cookies.get("Cookie_settings") !== "all" &&
      cookies.get("Cookie_settings") !== "minimum" &&
      !isMobileOnly
    ) {
      this.setState({ openInfoPageDesktop: true });
      this.handleOpenInfoPageDesktop();
    } else if (
      (cookies.get("Cookie_settings") === "all" ||
        cookies.get("Cookie_settings") === "minimum") &&
      !isMobileOnly
    ) {
      this.setState({
        cookiesSetDesktop: true,
      });
    }
  }

  componentWillUnmount() {
    if (!isMobileOnly) {
      window.removeEventListener("popstate", this.handleOnUrlChange, false);
    }
  }

  handleOnUrlChange = () => {
    let coordinates = window.location.hash;

    let lat = Number(coordinates.split("#")[1]);
    let long = Number(coordinates.split("#")[2]);

    console.log(lat);

    if (coordinates.includes("infoPage")) {
      //nothing
    } else {
      setTimeout(() => {
        if ((lat < 50.95) | (lat > 50.82)) {
          this.setState({
            viewport: {
              zoom: 16.5,
              pitch: 30,
              latitude: lat,
              longitude: long,
            },
          });
        } else {
          this.props.history.push("/");
          window.location.reload();
        }
      }, 400);

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  handleClick = (order) => {
    this.setState({
      order,
      screamIdParam: null,
    });

    this.props.closeScream();
    this.props.closeProject();

    if (order === 2) {
      window.history.pushState(null, null, "/projects");
    }

    if (order === 3) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });

      this.props.getallComments();
      this.props.getallLikes();
    }
  };

  handleChannelClick = (channelOrder) => {
    this.setState({
      order: 1,
      channelOrder,
      screamIdParam: null,
    });
    this.props.closeScream();

    window.scrollTo({
      top: 0,
      left: 0,
    });
  };

  handleDropdown = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleLegend = (checked) => {
    this.setState({
      checked,
      checked1: "Empty",
      checked2: "Empty",
      checked3: "Empty",
      checked4: "Empty",
      checked5: "Empty",
      checked6: "Empty",
      checked7: "Empty",
    });
  };

  handleLegend1 = (checked1) => {
    if (this.state.checked1 === "Empty") {
      this.setState({
        checked1,
        checked: false,
      });
    } else {
      this.setState({
        checked1: "Empty",
      });
      if (
        this.state.checked2 === "Empty" &&
        this.state.checked3 === "Empty" &&
        this.state.checked4 === "Empty" &&
        this.state.checked5 === "Empty" &&
        this.state.checked6 === "Empty" &&
        this.state.checked7 === "Empty"
      ) {
        this.setState({
          checked: 1,
        });
      }
    }
  };
  handleLegend2 = (checked2) => {
    if (this.state.checked2 === "Empty") {
      this.setState({
        checked2,
        checked: false,
      });
    } else {
      this.setState({
        checked2: "Empty",
      });
      if (
        this.state.checked1 === "Empty" &&
        this.state.checked3 === "Empty" &&
        this.state.checked4 === "Empty" &&
        this.state.checked5 === "Empty" &&
        this.state.checked6 === "Empty" &&
        this.state.checked7 === "Empty"
      ) {
        this.setState({
          checked: 1,
        });
      }
    }
  };
  handleLegend3 = (checked3) => {
    if (this.state.checked3 === "Empty") {
      this.setState({
        checked3,
        checked: false,
      });
    } else {
      this.setState({
        checked3: "Empty",
      });
      if (
        this.state.checked1 === "Empty" &&
        this.state.checked2 === "Empty" &&
        this.state.checked4 === "Empty" &&
        this.state.checked5 === "Empty" &&
        this.state.checked6 === "Empty" &&
        this.state.checked7 === "Empty"
      ) {
        this.setState({
          checked: 1,
        });
      }
    }
  };
  handleLegend4 = (checked4) => {
    if (this.state.checked4 === "Empty") {
      this.setState({
        checked4,
        checked: false,
      });
    } else {
      this.setState({
        checked4: "Empty",
      });
      if (
        this.state.checked1 === "Empty" &&
        this.state.checked2 === "Empty" &&
        this.state.checked3 === "Empty" &&
        this.state.checked5 === "Empty" &&
        this.state.checked6 === "Empty" &&
        this.state.checked7 === "Empty"
      ) {
        this.setState({
          checked: 1,
        });
      }
    }
  };
  handleLegend5 = (checked5) => {
    if (this.state.checked5 === "Empty") {
      this.setState({
        checked5,
        checked: false,
      });
    } else {
      this.setState({
        checked5: "Empty",
      });
      if (
        this.state.checked1 === "Empty" &&
        this.state.checked2 === "Empty" &&
        this.state.checked3 === "Empty" &&
        this.state.checked4 === "Empty" &&
        this.state.checked6 === "Empty" &&
        this.state.checked7 === "Empty"
      ) {
        this.setState({
          checked: 1,
        });
      }
    }
  };
  handleLegend6 = (checked6) => {
    if (this.state.checked6 === "Empty") {
      this.setState({
        checked6,
        checked: false,
      });
    } else {
      this.setState({
        checked6: "Empty",
      });
      if (
        this.state.checked1 === "Empty" &&
        this.state.checked2 === "Empty" &&
        this.state.checked3 === "Empty" &&
        this.state.checked4 === "Empty" &&
        this.state.checked5 === "Empty" &&
        this.state.checked7 === "Empty"
      ) {
        this.setState({
          checked: 1,
        });
      }
    }
  };
  handleLegend7 = (checked7) => {
    if (this.state.checked7 === "Empty") {
      this.setState({
        checked7,
        checked: false,
      });
    } else {
      this.setState({
        checked7: "Empty",
      });
      if (
        this.state.checked1 === "Empty" &&
        this.state.checked2 === "Empty" &&
        this.state.checked3 === "Empty" &&
        this.state.checked4 === "Empty" &&
        this.state.checked5 === "Empty" &&
        this.state.checked6 === "Empty"
      ) {
        this.setState({
          checked: 1,
        });
      }
    }
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

  zoomToBounds = (centerLat, centerLong, zoom) => {
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
  };

  mapDesktopShowResults = (viewport) => {
    if (this.state.order === 2) {
      this.setState({ order: 1 });
    }

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

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  mapDesktopReset = () => {
    this.setState({
      viewport: {
        zoom: 11.5,
        pitch: 30,
        latitude: 50.95,
        longitude: 6.9503,
      },
    });
    this.setState({
      latitude1: 51.08,
      latitude2: 50.79,
      longitude2: 6.712,
      longitude3: 7.17,
    });

    this.props.closeScream();
  };

  handleOpenInfoPageDesktop = () => {
    this.setState({ openInfoPageDesktop: true });
  };
  handleCloseInfoPageDesktop = () => {
    this.setState({ openInfoPageDesktop: false });

    const screamId = this.props.match.params.screamId;

    if (screamId) {
      if (screamId.indexOf("_") > 0) {
        this.props.openProject(screamId);
      } else {
        this.props.openScreamFirstTime(screamId);
      }
      this.setState({ screamIdParam: screamId });
    }
    if (window.location.pathname === "/projects") {
      this.handleClick(2);
    }
  };

  handleCookiesDesktop = () => {
    cookies.set("Cookie_settings", "all", {
      path: "/",
      maxAge: 60 * 60 * 24 * 90,
      sameSite: "none",
      secure: true,
    });
    this.setState({ cookiesSetDesktop: true });
  };

  handleMinimumCookies = () => {
    cookies.set("Cookie_settings", "minimum", {
      path: "/",
      maxAge: 60 * 60 * 24 * 90,
      sameSite: "none",
      secure: true,
    });
    this.setState({ cookiesSetDesktop: true });
  };

  handleOpenCookiePreferences() {
    window.open("/cookieConfigurator", "_blank");
  }

  noLocation = () => {
    this.setState({
      latitude1: 50.93892,
      latitude2: 50.93864,
      longitude2: 6.9586,
      longitude3: 6.9588,

      openGeofilter: false,
      open: false,
    });
  };

  alertClick = (event) => {
    setTimeout(() => {
      alert(
        "Die Keywords werden erst Aussagekräftig wenn mehr Ideen geteilt werden"
      );
    }, 2500);
  };

  dataNoLocationHandle = () => {
    this.setState({
      selectedId: "hi",
    });
  };

  handleLogout = () => {
    this.props.logoutUser();
    this.setState({
      order: 1,
    });
  };

  deleteAccount = () => {
    const userHandle = this.props.user.credentials.handle;

    var link =
      "mailto:dein@senf.koeln" +
      "?subject=" +
      escape("Bitte um Account-loeschung") +
      "&body=" +
      escape(
        "Bitte loeschen Sie meinen Account." +
          "\n" +
          "\n" +
          "Mein Nutzername lautet:" +
          "\n" +
          "\n" +
          userHandle
      );
    window.location.href = link;
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
  };

  render() {
    const { full_screams, loading, projects, loadingProjects } =
      this.props.data;

    console.log(this.props.data);
    const {
      latitude1,
      latitude2,
      longitude2,
      longitude3,
      checked,
      checked1,
      checked2,
      checked3,
      checked4,
      checked5,
      checked6,
      checked7,
      dropdown,
    } = this.state;

    const {
      classes,
      user: { authenticated },
    } = this.props;

    const error =
      !loading && full_screams.length === 0 ? (
        <div className="errorBackground">
               <div className="homeHeader"> Ooops! </div>
          <br />
          <span className="oopsText">
            Etwas ist schiefgelaufen. Bitte lade die Seite neu!
          </span>
        </div>
      ) : null;

    let dataRar = [];
    const dataArray = full_screams;

    dataArray.forEach((element) => {
      if (this.state.project === "") {
        if (
          checked === 1 &&
          element.lat > latitude2 &&
          element.lat < latitude1 &&
          element.long > longitude2 &&
          element.long < longitude3
        ) {
          dataRar.push(element);
        }
        if (
          element.Thema !== undefined &&
          element.Thema === checked1 &&
          element.lat > latitude2 &&
          element.lat < latitude1 &&
          element.long > longitude2 &&
          element.long < longitude3
        ) {
          dataRar.push(element);
        }
        if (
          element.Thema !== undefined &&
          element.Thema === checked2 &&
          element.lat > latitude2 &&
          element.lat < latitude1 &&
          element.long > longitude2 &&
          element.long < longitude3
        ) {
          dataRar.push(element);
        }
        if (
          element.Thema !== undefined &&
          element.Thema === checked3 &&
          element.lat > latitude2 &&
          element.lat < latitude1 &&
          element.long > longitude2 &&
          element.long < longitude3
        ) {
          dataRar.push(element);
        }
        if (
          element.Thema !== undefined &&
          element.Thema === checked4 &&
          element.lat > latitude2 &&
          element.lat < latitude1 &&
          element.long > longitude2 &&
          element.long < longitude3
        ) {
          dataRar.push(element);
        }
        if (
          element.Thema !== undefined &&
          element.Thema === checked5 &&
          element.lat > latitude2 &&
          element.lat < latitude1 &&
          element.long > longitude2 &&
          element.long < longitude3
        ) {
          dataRar.push(element);
        }
        if (
          element.Thema !== undefined &&
          element.Thema === checked6 &&
          element.lat > latitude2 &&
          element.lat < latitude1 &&
          element.long > longitude2 &&
          element.long < longitude3
        ) {
          dataRar.push(element);
        }
        if (
          element.Thema !== undefined &&
          element.Thema === checked7 &&
          element.lat > latitude2 &&
          element.lat < latitude1 &&
          element.long > longitude2 &&
          element.long < longitude3
        ) {
          dataRar.push(element);
        }
      } else {
        if (
          checked === 1 &&
          element.lat > latitude2 &&
          element.lat < latitude1 &&
          element.long > longitude2 &&
          element.long < longitude3 &&
          element.project === this.state.project
        ) {
          dataRar.push(element);
        }
        if (
          element.Thema !== undefined &&
          element.Thema === checked1 &&
          element.lat > latitude2 &&
          element.lat < latitude1 &&
          element.long > longitude2 &&
          element.long < longitude3 &&
          element.project === this.state.project
        ) {
          dataRar.push(element);
        }
        if (
          element.Thema !== undefined &&
          element.Thema === checked2 &&
          element.lat > latitude2 &&
          element.lat < latitude1 &&
          element.long > longitude2 &&
          element.long < longitude3 &&
          element.project === this.state.project
        ) {
          dataRar.push(element);
        }
        if (
          element.Thema !== undefined &&
          element.Thema === checked3 &&
          element.lat > latitude2 &&
          element.lat < latitude1 &&
          element.long > longitude2 &&
          element.long < longitude3 &&
          element.project === this.state.project
        ) {
          dataRar.push(element);
        }
        if (
          element.Thema !== undefined &&
          element.Thema === checked4 &&
          element.lat > latitude2 &&
          element.lat < latitude1 &&
          element.long > longitude2 &&
          element.long < longitude3 &&
          element.project === this.state.project
        ) {
          dataRar.push(element);
        }
        if (
          element.Thema !== undefined &&
          element.Thema === checked5 &&
          element.lat > latitude2 &&
          element.lat < latitude1 &&
          element.long > longitude2 &&
          element.long < longitude3 &&
          element.project === this.state.project
        ) {
          dataRar.push(element);
        }
        if (
          element.Thema !== undefined &&
          element.Thema === checked6 &&
          element.lat > latitude2 &&
          element.lat < latitude1 &&
          element.long > longitude2 &&
          element.long < longitude3 &&
          element.project === this.state.project
        ) {
          dataRar.push(element);
        }
        if (
          element.Thema !== undefined &&
          element.Thema === checked7 &&
          element.lat > latitude2 &&
          element.lat < latitude1 &&
          element.long > longitude2 &&
          element.long < longitude3 &&
          element.project === this.state.project
        ) {
          dataRar.push(element);
        }
      }
    });

    let dataFinal = [];
    const dataArrayFinal = dataRar;
    if (dataArrayFinal !== undefined && dataArrayFinal.length > 0) {
      dataArrayFinal.forEach((element) => {
        if (element.status === "None") {
          dataFinal.push(element);
        }
      });
    }

    let HotScreamsMarkup = _.orderBy(dataFinal, "likeCount", "desc").map(
      (scream) => (
        <MonitoringScream
          loading={loading}
          key={scream.screamId}
          scream={scream}
          projectsData={projects}
        />
      )
    );

    let recentScreamsMarkup = _.orderBy(dataFinal, "createdAt", "desc").map(
      (scream) => (
        <MonitoringScream
          loading={loading}
          key={scream.screamId}
          scream={scream}
          projectsData={projects}
        />
      )
    );

    let screamLength = dataFinal.length;

    let noMoreScreamsMarkup =
      !loading && screamLength > 0 ? (
        <div className="ende">
          ... <br /> Keine weiteren Ideen <br />
        </div>
      ) : (
        <span className={classes.inlineText}>
           Mit den ausgewählten Filtern findest du noch keine Ideen.
        </span>
      );

    const content = !loading ? (
      <React.Fragment>
        <ToggleDisplay show={dropdown === "10"}>
          <div>
            {recentScreamsMarkup}
            {noMoreScreamsMarkup}
          </div>
        </ToggleDisplay>
        <ToggleDisplay show={dropdown === "20"}>
          <div>
            {HotScreamsMarkup}
            {noMoreScreamsMarkup}
          </div>
        </ToggleDisplay>
      </React.Fragment>
    ) : (
      <div className="no-ideas-yet" style={{ marginTop: "100px" }}>
        {" "}
        Lade Daten...{" "}
      </div>
    );

    const projectsArray = projects ? (
      <Fragment>
        {_.orderBy(projects, "createdAt", "desc").map((projects) => (
          <option value={projects.project}> {projects.title}</option>
        ))}
      </Fragment>
    ) : null;

    const topicsArray = (
      <Fragment>
        <option value={"Inklusion / Soziales"} className={classes.formText}>
          Rodenkirchen
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
      </Fragment>
    );

    return (
      <div>
        {error}

        <MonitoringDesktopSidebar
          loading={this.state.loading}
          authenticated={authenticated}
          handleClick={this.handleClick}
          handleChannelClick={this.handleChannelClick}
          order={this.state.order}
          channelOrder={this.state.channelOrder}
          handleLegend={this.handleLegend}
          handleLegend1={this.handleLegend1}
          handleLegend2={this.handleLegend2}
          handleLegend3={this.handleLegend3}
          handleLegend4={this.handleLegend4}
          handleLegend5={this.handleLegend5}
          handleLegend6={this.handleLegend6}
          handleLegend7={this.handleLegend7}
          checked={this.state.checked}
          checked1={this.state.checked1}
          checked2={this.state.checked2}
          checked3={this.state.checked3}
          checked4={this.state.checked4}
          checked5={this.state.checked5}
          checked6={this.state.checked6}
          checked7={this.state.checked7}
          handleOpenInfoPageDesktop={this.handleOpenInfoPageDesktop}
          handleCloseInfoPageDesktop={this.handleCloseInfoPageDesktop}
          cookiesSetDesktop={this.state.cookiesSetDesktop}
          handleCookiesDesktop={this.handleCookiesDesktop}
          handleMinimumCookies={this.handleMinimumCookies}
          deleteAccount={this.deleteAccount}
          handleLogout={this.handleLogout}
          openInfoPageDesktop={this.state.openInfoPageDesktop}
          loadingProjects={loadingProjects}
          projectsData={projects}
        ></MonitoringDesktopSidebar>

        <div
          style={{
            marginLeft: "200px",
            width: "calc(100vw - 640px)",
            position: "fixed",
            top: "0",
            zIndex: "99",
            backgroundColor: "#ffd19b",
            height: "110px",
          }}
        >
          <div
            style={{
              position: "relative",
              marginLeft: "0px",

              marginTop: "20px",
              zIndex: 9,
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                marginLeft: "10px",
                fontFamily: "Playfair Display",
                fontSize: 20,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "#414345",
              }}
            >
              <select
                name="project"
                id="project"
                value={this.state.project}
                onChange={this.handleDropdown}
                style={{
                  fontSize: 20,
                  height: "40px",
                  width: "250px",
                  border: 0,
                  backgroundColor: "transparent",
                  fontFamily: "PlayfairDisplay-Bold",
                  pointerEvents: "none",
                  color: "#353535",
                }}
              >
                <option value="">Allgemein (Alle Ideen)</option>
                {projectsArray}
              </select>
              <select
                name="project"
                id="project"
                value={this.state.project}
                onChange={this.handleDropdown}
                style={{
                  fontSize: 0,
                  height: "40px",
                  marginLeft: "-50px",
                  width: "40px",
                  border: 0,
                  background:
                    "linear-gradient(90deg, rgba(255,209,155,0) 0%, rgba(255,209,155,1) 59%, rgba(255,209,155,1) 100%)",
                  transform: "scale(1.5) ",
                }}
              >
                <option value="">Allgemein (Alle Ideen)</option>
                {projectsArray}
              </select>
            </div>
            <div
              style={{
                marginLeft: "auto",
              }}
            >
              <MuiThemeProvider theme={theme}>
                <NativeSelect
                  value={this.state.topic}
                  onChange={this.handleDropdownTopic}
                  name="topic"
                  className="monitoringFormControlSmall"
                  style={{ width: "150px" }}
                  inputProps={{ "aria-label": "topic" }}
                  id="topic"
                  IconComponent={() => (
                    <img
                      src={Arrow}
                      width="15px"
                      alt="arrow-icon"
                      style={{
                        marginTop: "0px",
                        marginLeft: "-24px",
                        pointerEvents: "none",
                      }}
                    ></img>
                  )}
                >
                  <option value="" className={classes.formText}>
                    Alle Bezirke
                  </option>
                  {topicsArray}
                </NativeSelect>
              </MuiThemeProvider>
            </div>
            <div
              style={{
                marginLeft: "10px",
              }}
            >
              <MuiThemeProvider theme={theme}>
                <NativeSelect
                  value={dropdown}
                  onChange={this.handleDropdown}
                  name="dropdown"
                  className="monitoringFormControlSmall"
                  inputProps={{ "aria-label": "dropdown" }}
                  id="dropdown"
                  IconComponent={() => (
                    <img
                      src={Sort}
                      alt="sort-icon"
                      width="20px"
                      style={{
                        marginTop: "0px",
                        marginLeft: "-24px",
                        pointerEvents: "none",
                      }}
                    ></img>
                  )}
                >
                  <option value={10} className={classes.formText}>
                    neuste
                  </option>
                  <option value={20}>schärfste</option>
                </NativeSelect>
              </MuiThemeProvider>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginLeft: "10px",

              position: "relative",
              marginTop: "15px",
              height: "35px",
              borderBottom: "1px solid #353535",

              zIndex: 1,
            }}
          >
            <div
              style={{
                width: "300px",
                margin: "10px",

                marginLeft: "50px",
              }}
            >
              Titel{" "}
            </div>
            <div style={{ width: "110px", margin: "10px" }}> Ort </div>
            <div style={{ width: "110px", margin: "10px" }}> Nutzer:in </div>

            <div
              style={{
                width: "20px",
                margin: "10px",
                marginTop: "5px",
                marginLeft: "5px",
              }}
            >
              <img alt="like-icon" src={LikeIcon} width="20px"></img>{" "}
            </div>
            <div style={{ width: "20px", margin: "10px", marginTop: "8px" }}>
              <img alt="comments-icon" src={ChatBorder} width="20px"></img>{" "}
            </div>
            <div
              style={{
                width: "70px",
                margin: "10px",
                marginTop: "8px",
                textAlign: "center",
              }}
            >
              <img alt="calendar-icon" src={CreatedAtIcon} width="20px"></img>{" "}
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: "120px",
            marginLeft: "210px",
            width: "calc(100vw - 650px)",
          }}
        >
          {content}
        </div>

        <div className="monitoringBottombar">
          <ExportToExcel
            apiData={dataRar}
            fileName={"hi"}
            dataFinal={dataFinal}
          />
        </div>

        <div
          style={{
            position: "fixed",
            zIndex: 99,
            right: "20px",

            width: "400px",
            height: "calc(100vh - 40px)",

            bottom: "20px",
            backgroundColor: "white",

            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <img
            src={Not_connected}
            width="90%"
            alt="no-selected-idea-illustration"
            style={{ marginBottom: "50px" }}
          ></img>
          <div className="no-ideas-yet">
            Wähle eine Idee aus, um diesen Bereich zu aktivieren
          </div>
          <MonitoringEditScream />
        </div>
      </div>
    );
  }
}

monitoring.propTypes = {
  classes: PropTypes.object.isRequired,

  user: PropTypes.object.isRequired,

  getAllFullScreams: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,

  getallComments: PropTypes.func.isRequired,
  getallLikes: PropTypes.func.isRequired,
  openDialog: PropTypes.bool,

  getProjects: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,

  closeScream: PropTypes.func.isRequired,
  openScreamFirstTime: PropTypes.func.isRequired,
  openProject: PropTypes.func.isRequired,
  closeProject: PropTypes.func.isRequired,
};

const mapActionsToProps = {
  logoutUser,
  getAllFullScreams,

  getallComments,
  getallLikes,

  clearErrors,

  getProjects,
  closeScream,
  openScreamFirstTime,
  openProject,
  closeProject,
};

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
  UI: state.UI,
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(monitoring));
