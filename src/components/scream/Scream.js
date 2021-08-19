/** @format */

import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";

//UTILITIES
import setColorByTopic from "../../util/setColorByTopic";

//TIMESTAMP
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// COMPONENTS
import LikeButton from "./LikeButton";
import SignNote from "../profile/SignNote";

// MUI Stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

// Custom style
import screamStyles from "../../util/screamStyles";

// Icons
import ChatBorder from "../../images/icons/chat.png";

// Redux
import { connect } from "react-redux";

import {
  clearErrors,
  openScream,
  openProject,
} from "../../redux/actions/dataActions";

const styles = screamStyles;

class Scream extends Component {
  state = {
    cardHeight: {},
  };

  pushScreamId = (screamId) => {
    this.props.openScream(screamId);
  };

  openProject = (project) => {
    this.props.openProject(project);
  };

  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      projectsData,
      scream: {
        title,
        body,
        screamId,
        likeCount,
        commentCount,
        Stadtteil,
        project,
        Thema,
      },
      user: { authenticated },
    } = this.props;

    const neuladen = Stadtteil === undefined && (
      <span
        style={{
          left: "0",
          position: "relative",
          margintop: "5px",
          float: "left",
          color: "rgb(255, 205, 6)",
        }}
      >
        Aktualisiere die Seite
      </span>
    );

    const commentButton = (
      <div
        className={
          !authenticated
            ? classes.commentButtonWrapperNotAuthenticated
            : classes.commentButtonWrapper
        }
        style={project && projectsData ? { top: "100px" } : {}}
      >
        <div className={classes.commentButton}>
          <MyButton>
            {!authenticated && <SignNote />}
            <img src={ChatBorder} width="100%" alt="ChatIcon" />
          </MyButton>
        </div>
        <div className={classes.engagement}>{commentCount}</div>
      </div>
    );

    const colorNew = setColorByTopic(Thema);

    const projectsDataFinal = [];

    if (projectsData) {
      projectsData.forEach((element) => {
        if (project === element.project) {
          projectsDataFinal.push(element.title);
        }
      });
    }

    const projectTitle =
      project && projectsData ? (
        <>
          <div className={classes.gradient2}></div>
          <button
            className="screamcardProjectContainer buttonWide "
            onClick={() => this.openProject(project)}
          >
            {projectsDataFinal}
          </button>
        </>
      ) : null;

    return (
      <Card
        className={classes.card}
        style={project && projectsData ? { height: "23em" } : {}}
      >
        <CardContent className={classes.content}>
          {neuladen}
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
          <div className={classes.locationOuter}>
            <div className={classes.locationHeader}> {Stadtteil} </div>
          </div>
          <div className="screamcardTitle">{title} </div>
          <div className="bodytext">{body}</div>
          <div className={classes.gradient}></div>
          <div className={classes.line} />
          <div
            className={classes.likeButtonWrapper}
            style={project && projectsData ? { top: "10px" } : {}}
          >
            <div className={classes.likeButton}>
              <LikeButton screamId={screamId} />
            </div>
            <div className={classes.engagement}>{likeCount} </div>
          </div>
          {commentButton}
          <br />
          {projectTitle}
          <button
            onClick={() => this.pushScreamId(screamId)}
            className="buttonExpand ripple"
          ></button>
          {/* <ScreamDialog
            screamId={screamId}
            userHandle={userHandle}
            lat={lat}
            long={long}
            openDialog={this.props.openDialog}
          /> */}
        </CardContent>
      </Card>
    );
  }
}

Scream.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
  openScream: PropTypes.func.isRequired,
  openProject: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapActionsToProps = {
  openScream,
  openProject,
  clearErrors,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Scream));
