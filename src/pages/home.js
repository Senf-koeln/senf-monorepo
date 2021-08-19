/** @format */

import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getScreams,
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
import lamploader from "../images/lamp.png";
import PostScream from "../components/postScream/PostScream";

import Appbar from "../components/layout/Appbar";

import { InsightsPage } from "../mainComponents/Insights/InsightsPage";
import { DesktopSidebar } from "../components/layout/DesktopSidebar";

import Cookies from "universal-cookie";
import Topbar from "../components/layout/Topbar";
import MapDesktop from "../components/map/MapDesktop";
import { AllIdeasPage } from "../mainComponents/Ideas/AllIdeasPage";
import { ProjectsPage } from "../mainComponents/Projects/ProjectsPage";
import ScreamDialog from "../components/scream/ScreamDialog";
import ProjectDialog from "../mainComponents/Projects/projectComponents/ProjectDialog";
const cookies = new Cookies();

const styles = {};

export class home extends Component {
  // TOGGLES
  constructor(props) {
    super(props);
    this.props.getScreams();
    this.props.getProjects();

    this.state = {
      order: 1,

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
    const { screams, loading, projects, loadingProjects } = this.props.data;
    const {
      order,
      screamIdParam,
      latitude1,
      latitude2,
      latitude3,
      latitude4,
      longitude1,
      longitude2,
      longitude3,
      longitude4,
      checked,
      checked1,
      checked2,
      checked3,
      checked4,
      checked5,
      checked6,
      checked7,
    } = this.state;

    const {
      classes,
      user: {
        credentials: { handle },
        authenticated,
      },
    } = this.props;

    let dataRar = [];
    const dataArray = screams;

    dataArray.forEach((element) => {
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

    let dataRarMap = [];
    const dataArrayMap = screams;

    dataArrayMap.forEach((element) => {
      if (checked === 1) {
        dataRarMap.push(element);
      }
      if (element.Thema !== undefined && element.Thema === checked1) {
        dataRarMap.push(element);
      }
      if (element.Thema !== undefined && element.Thema === checked2) {
        dataRarMap.push(element);
      }
      if (element.Thema !== undefined && element.Thema === checked3) {
        dataRarMap.push(element);
      }
      if (element.Thema !== undefined && element.Thema === checked4) {
        dataRarMap.push(element);
      }
      if (element.Thema !== undefined && element.Thema === checked5) {
        dataRarMap.push(element);
      }
      if (element.Thema !== undefined && element.Thema === checked6) {
        dataRarMap.push(element);
      }
      if (element.Thema !== undefined && element.Thema === checked7) {
        dataRarMap.push(element);
      }
    });

    let dataFinalMap = [];
    const dataArrayFinalMap = dataRarMap;
    if (dataArrayFinalMap !== undefined && dataArrayFinalMap.length > 0) {
      dataArrayFinalMap.forEach((element) => {
        if (element.status === "None") {
          dataFinalMap.push(element);
        }
      });
    }

    // let StatusFulfilleddataFinal = [];
    // const StatusFulfilleddataArray = dataRar;
    // if (
    //   StatusFulfilleddataArray !== undefined &&
    //   StatusFulfilleddataArray.length > 0
    // ) {
    //   StatusFulfilleddataArray.forEach((element) => {
    //     if (element.status === "Fulfilled") {
    //       StatusFulfilleddataFinal.push(element);
    //     }
    //   });
    // }

    // let StatusDeletedataFinal = [];
    // const StatusDeletedataArray = dataRar;
    // if (
    //   StatusDeletedataArray !== undefined &&
    //   StatusDeletedataArray.length > 0
    // ) {
    //   StatusDeletedataArray.forEach((element) => {
    //     if (element.status === "Discarded") {
    //       StatusDeletedataFinal.push(element);
    //     }
    //   });
    // }

    const error =
      !loading && screams.length === 0 && (
        <div className="errorBackground">
               <div className="homeHeader"> Ooops! </div>
          <br />
          <span className="oopsText">
            Etwas ist schiefgelaufen. Bitte lade die Seite neu!
          </span>
        </div>
      );

    const loader =
      loading &&
      !this.state.openInfoPageDesktop &&
      (cookies.get("Cookie_settings") === "all" ||
        cookies.get("Cookie_settings") === "minimum") ? (
        <div className="spinnerDivBackground">
          <img src={lamploader} className="lamploader" alt="loader" />
        </div>
      ) : null;

    const projectDialogComponent =
      this.props.UI.openProject === true ? (
        <ProjectDialog
          loading={loading}
          openProject={this.props.UI.openProject}
          screamIdParam={screamIdParam}
          _onViewportChangeDesktop={this._onViewportChangeDesktop}
          zoomToBounds={this.zoomToBounds}
          showTitles={this.state.showTitles}
          handleClick={this.handleClick}
          handleLegend={this.handleLegend}
          handleLegend1={this.handleLegend1}
          handleLegend2={this.handleLegend2}
          handleLegend3={this.handleLegend3}
          handleLegend4={this.handleLegend4}
          handleLegend5={this.handleLegend5}
          handleLegend6={this.handleLegend6}
          handleLegend7={this.handleLegend7}
          checked={checked}
          checked1={checked1}
          checked2={checked2}
          checked3={checked3}
          checked4={checked4}
          checked5={checked5}
          checked6={checked6}
          checked7={checked7}
          latitude1={latitude1}
          latitude2={latitude2}
          latitude3={latitude3}
          latitude4={latitude4}
          longitude1={longitude1}
          longitude2={longitude2}
          longitude3={longitude3}
          longitude4={longitude4}
          openInfoPageDesktop={this.state.openInfoPageDesktop}
          loadingProjects={loadingProjects}
          projectsData={projects}
          viewport={this.state.viewport}
          mapDesktopShowResults={this.mapDesktopShowResults}
        ></ProjectDialog>
      ) : null;

    return (
      <div>
        {error}
        <div className="appbar">
          <Appbar
            loading={this.state.loading}
            handleClick={this.handleClick}
            order={this.state.order}
          ></Appbar>
          <PostScream
            openInfoPageDesktop={this.state.openInfoPageDesktop}
            loadingProjects={loadingProjects}
            projectsData={projects}
          />
        </div>

        <Topbar
          loading={loading}
          handleClick={this.handleClick}
          showDemand={this.state.showDemand}
          order={this.state.order}
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
          deleteAccount={this.deleteAccount}
          handleLogout={this.handleLogout}
          openInfoPageDesktop={this.state.openInfoPageDesktop}
        />
        <DesktopSidebar
          loading={this.state.loading}
          authenticated={authenticated}
          handleClick={this.handleClick}
          order={this.state.order}
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
        ></DesktopSidebar>

        {/* <MainPage
          order={order}
          loading={loading}
          dropdown={this.state.dropdown}
          screamIdParam={screamIdParam}
          screams={this.props.data.screams}
          classes={classes}
          openInfoPageDesktop={this.state.openInfoPageDesktop}
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
          zoomToBounds={this.zoomToBounds}
          handleRevert={this.handleRevert}
          noLocation={this.noLocation}
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
          dataNoLocationHandle={this.dataNoLocationHandle}
          showDemand={this.state.showDemand}
          handleClick={this.handleClick}
          handleDropdown={this.handleDropdown}
          handleOpenGeofilter={this.handleOpenGeofilter}
          handleCloseGeofilter={this.handleCloseGeofilter}
          handleResetGeofilter={this.handleResetGeofilter}
          openGeofilter={this.state.openGeofilter}
          showGeofilterResults={this.state.showGeofilterResults}
          createGeofilterCircle={this.state.createGeofilterCircle}
          selectedId={this.state.selectedId}
          channelOrder={this.state.channelOrder}
          projectsData={projects}
          handleChannelClick={this.handleChannelClick}
          _onViewportChangeDesktop={this._onViewportChangeDesktop}
          mapDesktopShowResults={this.mapDesktopShowResults}
          mapDesktopReset={this.mapDesktopReset}
          showTitles={this.state.showTitles}
          loadingProjects={loadingProjects}
          userHandle={this.props.user.credentials.handle}
          openProject={this.props.UI.openProject}
        ></MainPage> */}

        <MapDesktop
          loading={loading}
          loadingProjects={loadingProjects}
          dataFinal={dataFinalMap}
          id="mapDesktop"
          style={{ zIndex: 9999 }}
          noLocation={this.noLocation}
          handleLegend={this.handleLegend}
          handleLegend1={this.handleLegend1}
          handleLegend2={this.handleLegend2}
          handleLegend3={this.handleLegend3}
          handleLegend4={this.handleLegend4}
          handleLegend5={this.handleLegend5}
          handleLegend6={this.handleLegend6}
          handleLegend7={this.handleLegend7}
          checked={checked}
          checked1={checked1}
          checked2={checked2}
          checked3={checked3}
          checked4={checked4}
          checked5={checked5}
          checked6={checked6}
          checked7={checked7}
          dataNoLocationHandle={this.dataNoLocationHandle}
          _onViewportChangeDesktop={this._onViewportChangeDesktop}
          mapDesktopShowResults={this.mapDesktopShowResults}
          viewport={this.state.viewport}
          selectedId={this.state.selectedId}
          showTitles={this.state.showTitles}
          openInfoPageDesktop={this.state.openInfoPageDesktop}
          mapDesktopShowResults={this.mapDesktopShowResults}
          mapDesktopReset={this.mapDesktopReset}
        ></MapDesktop>
        <div
          className={
            this.state.openInfoPageDesktop
              ? "contentWrapper_hide"
              : "contentWrapper"
          }
        >
          {loader}
          <div className="MainBackgroundHome" />

          <AllIdeasPage
            loading={loading}
            order={order}
            classes={classes}
            dataFinal={dataFinal}
            viewport={this.state.viewport}
            latitude1={latitude1}
            latitude2={latitude2}
            latitude3={latitude3}
            latitude4={latitude4}
            longitude1={longitude1}
            longitude2={longitude2}
            longitude3={longitude3}
            longitude4={longitude4}
            handleLegend={this.handleLegend}
            handleLegend1={this.handleLegend1}
            handleLegend2={this.handleLegend2}
            handleLegend3={this.handleLegend3}
            handleLegend4={this.handleLegend4}
            handleLegend5={this.handleLegend5}
            handleLegend6={this.handleLegend6}
            handleLegend7={this.handleLegend7}
            checked={checked}
            checked1={checked1}
            checked2={checked2}
            checked3={checked3}
            checked4={checked4}
            checked5={checked5}
            checked6={checked6}
            checked7={checked7}
            dataNoLocationHandle={this.dataNoLocationHandle}
            noLocation={this.noLocation}
            showDemand={this.state.showDemand}
            handleClick={this.state.handleClick}
            handleDropdown={this.handleDropdown}
            handleOpenGeofilter={this.handleOpenGeofilter}
            handleCloseGeofilter={this.handleCloseGeofilter}
            handleResetGeofilter={this.handleResetGeofilter}
            openGeofilter={this.state.openGeofilter}
            showGeofilterResults={this.state.showGeofilterResults}
            createGeofilterCircle={this.state.createGeofilterCircle}
            selectedId={this.state.selectedId}
            projectsData={projects}
            _onViewportChange={this._onViewportChange}
            dropdown={this.state.dropdown}
          ></AllIdeasPage>

          <ProjectsPage
            loading={loading}
            loadingProjects={loadingProjects}
            order={order}
            classes={classes}
            openInfoPageDesktop={this.state.openInfoPageDesktop}
            viewport={this.state.viewport}
            latitude1={latitude1}
            latitude2={latitude2}
            latitude3={latitude3}
            latitude4={latitude4}
            longitude1={longitude1}
            longitude2={longitude2}
            longitude3={longitude3}
            longitude4={longitude4}
            zoomToBounds={this.zoomToBounds}
            handleLegend={this.handleLegend}
            handleLegend1={this.handleLegend1}
            handleLegend2={this.handleLegend2}
            handleLegend3={this.handleLegend3}
            handleLegend4={this.handleLegend4}
            handleLegend5={this.handleLegend5}
            handleLegend6={this.handleLegend6}
            handleLegend7={this.handleLegend7}
            checked={checked}
            checked1={checked1}
            checked2={checked2}
            checked3={checked3}
            checked4={checked4}
            checked5={checked5}
            checked6={checked6}
            checked7={checked7}
            showDemand={this.state.showDemand}
            handleClick={this.handleClick}
            handleDropdown={this.handleDropdown}
            handleOpenGeofilter={this.handleOpenGeofilter}
            handleCloseGeofilter={this.handleCloseGeofilter}
            handleResetGeofilter={this.handleResetGeofilter}
            selectedId={this.state.selectedId}
            projectsData={projects}
            _onViewportChange={this._onViewportChange}
            _onViewportChangeDesktop={this._onViewportChangeDesktop}
            mapDesktopShowResults={this.state.mapDesktopShowResults}
            mapDesktopReset={this.mapDesktopReset}
            showTitles={this.state.showTitles}
            dropdown={this.state.dropdown}
            screamIdParam={screamIdParam}
            userHandle={handle}
          ></ProjectsPage>

          <InsightsPage order={order}></InsightsPage>

          <ScreamDialog
            screamIdParam={screamIdParam}
            projectsData={projects}
          ></ScreamDialog>

          {projectDialogComponent}
        </div>
      </div>
    );
  }
}

home.propTypes = {
  classes: PropTypes.object.isRequired,

  user: PropTypes.object.isRequired,

  getScreams: PropTypes.func.isRequired,
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
  getScreams,

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
)(withStyles(styles)(home));
