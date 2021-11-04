/** @format */

import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import _ from "lodash";
//MAPSTUFF
import "mapbox-gl/dist/mapbox-gl.css";

// Redux stuff
import { connect } from "react-redux";
import { closeProject } from "../../../redux/actions/projectActions";
import { clearErrors } from "../../../redux/actions/errorsActions";
import {
  setMapViewport,
  setMapBounds,
  setResetMapBounds,
} from "../../../redux/actions/mapActions";

//Components
import CalendarComponent from "../../atoms/calendar/CalendarComponent";

import IdeaList from "../IdeaList/IdeaList";
import ProjectHeader from "../../molecules/Headers/ProjectHeader";
import ProjectInfo from "../../molecules/Cards/ProjectInfo";
import styled from "styled-components";
import MainAnimations from "../../atoms/Animations/MainAnimations";
import {
  BackgroundDesktop,
  BackgroundMobile,
} from "../../atoms/Backgrounds/GradientBackgrounds";

const Break = styled.div`
  position: relative;
  height: 110px;
  width: 100%;

  @media (min-width: 768px) {
    height: 30px;
  }
`;

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
};

class ProjectDialog extends Component {
  state = {
    open: false,
    oldPath: "",
    newPath: "",
    path: "",
    order: 1,
    screamIdParam: null,
    dropdown: "newest",
    dialogStyle: {},
  };

  componentDidMount() {
    if (this.props.openProject) {
      this.handleOpen();
    }
  }

  handleOpen = () => {
    const bounds = {
      latitude1: 51.08,
      latitude2: 50.79,
      longitude2: 6.712,
      longitude3: 7.17,
    };

    this.props.setResetMapBounds(bounds);
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
          const zoom = isMobileCustom
            ? this.props.project.zoom - 2
            : this.props.project.zoom;

          this.zoomToBounds(centerLat, centerLong, zoom);
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

    const viewport = {
      latitude: 50.95,
      longitude: 6.9503,
      zoom: isMobileCustom ? 9.5 : 11.5,
      transitionDuration: 4000,
      pitch: 30,
      bearing: 0,
    };
    this.props.setMapViewport(viewport);

    setTimeout(() => {
      this.setState({
        dialogStyle: {},
      });
    }, 1000);
  };

  handleClick = (order) => {
    this.setState({
      order,
    });

    if (order === 2) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }

    this.props.clearErrors();
  };

  handleDropdown = (value) => {
    this.setState({
      dropdown: value,
    });
  };

  zoomToBounds = (centerLat, centerLong, zoom) => {
    const viewport = {
      latitude: centerLat,
      longitude: centerLong,
      zoom: zoom,
      transitionDuration: 1000,
      pitch: 30,
      bearing: 0,
    };
    this.props.setMapViewport(viewport);
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
      viewport,
      handleTopicSelector,
      topicsSelected,
      projectsData,
      loadingProjects,
      dataFinalMap,
    } = this.props;

    const dataRar = this.props.project.screams;

    const sortedScreams =
      this.state.dropdown === "newest"
        ? _.orderBy(dataRar, "createdAt", "desc")
        : _.orderBy(dataRar, "likeCount", "desc");

    const dataFinal = sortedScreams.filter(
      ({ Thema, status, lat, long }) =>
        topicsSelected.includes(Thema) &&
        lat <= this.props.data.mapBounds.latitude1 &&
        lat >= this.props.data.mapBounds.latitude2 &&
        long >= this.props.data.mapBounds.longitude2 &&
        long <= this.props.data.mapBounds.longitude3 &&
        status === "None"
    );

    const dataFinalLength = dataFinal.length;

    return (
      this.props.openProject && (
        <React.Fragment>
          <ProjectHeader
            imgUrl={imgUrl}
            title={title}
            loading={loading}
            calendar={calendar}
            order={this.state.order}
            path={this.state.path}
            project={this.props.project}
            handleClose={this.handleClose}
            handleClick={this.handleClick}
          />

          <div className="projectDialog">
            {isMobileCustom ? <BackgroundMobile /> : <BackgroundDesktop />}

            {this.state.order === 1 && (
              <IdeaList
                type="projectIdeas"
                loading={loading}
                order={this.state.order}
                dataFinal={dataFinal}
                dataFinalLength={dataFinalLength}
                geoData={geoData}
                viewport={viewport}
                handleDropdown={this.handleDropdown}
                projectsData={projectsData}
                loadingProjects={loadingProjects}
                project={this.props.project}
                dropdown={this.state.dropdown}
                handleTopicSelector={handleTopicSelector}
                topicsSelected={topicsSelected}
                dataFinalMap={dataFinalMap}
              ></IdeaList>
            )}
            {this.state.order === 2 && (
              <div style={{ overflow: "scroll", height: "100vh" }}>
                <Break />

                <MainAnimations
                  transition="0.5s"
                  display="block"
                  paddingBottom="2em"
                  height="100%"
                >
                  <ProjectInfo
                    description={description}
                    weblink={weblink}
                    contact={contact}
                    startDate={startDate}
                    endDate={endDate}
                    owner={owner}
                  />
                  <br />
                </MainAnimations>
              </div>
            )}
            {this.state.order === 3 && (
              <React.Fragment>
                <Break />

                <MainAnimations
                  transition="0.5s"
                  display="block"
                  paddingBottom="2em"
                  height="100%"
                  position={document.body.clientWidth > 768 && "fixed"}
                  top={document.body.clientWidth > 768 && "100px"}
                >
                  <CalendarComponent
                    projectScreams={this.props.project.screams}
                    handleClick={this.handleClick}
                  ></CalendarComponent>
                </MainAnimations>
              </React.Fragment>
            )}
          </div>
        </React.Fragment>
      )
    );
  }
}

const mapStateToProps = (state) => ({
  scream: state.data.scream,
  project: state.data.project,
  data: state.data,
  UI: state.UI,
  user: state.user,
});

const mapActionsToProps = {
  clearErrors,
  closeProject,
  setMapViewport,
  setMapBounds,
  setResetMapBounds,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ProjectDialog));
