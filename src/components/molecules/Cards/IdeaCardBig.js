/** @format */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import * as linkify from "linkifyjs";
import withStyles from "@material-ui/core/styles/withStyles";
import { Typography } from "@material-ui/core";
import LikeButton from "../../atoms/CustomButtons/LikeButton";
import dayjs from "dayjs";
import { openProjectRoomFunc } from "../../../redux/actions/projectActions";

// Icons
import CalendarIcon from "../../../images/icons/calendar.png";
import PenIcon from "../../../images/icons/pen.png";
import LocationIcon from "../../../images/icons/location.png";

import WeblinkIcon from "../../../images/icons/weblink.png";
import contactIcon from "../../../images/icons/mail.png";

import { EngagementWrapper } from "./styles/sharedStyles";
import CommentButton from "../../atoms/CustomButtons/CommentButton";

const Content = styled.div`
  width: 95%;
  padding: 15px;
  object-fit: cover;
`;

const Button = styled.button`
  border-radius: 20px;
  text-transform: none;
  font-size: 12pt;
  background-color: white;
  height: 40px;
  font-family: Futura PT W01 Book;
  box-shadow: none;
  padding-right: 15px;
  padding-left: 15px;
  background-color: rgb(254, 217, 87);
  margin-right: 5px;
  box-shadow: rgb(38, 57, 77, 0) 0px 20px 30px -16px;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const styles = {
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
    pointerEvents: "none",
  },
  date: {
    position: "relative",
    color: "#353535",
    fontSize: "12pt",
    pointerEvents: "none",
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
    pointerEvents: "none",
  },

  horrizontalLine: {
    position: "relative",
    left: "-15px",

    height: "1px",
    backgroundColor: "#d5dadd",
    width: "calc(85% + 25px)",
    marginTop: "20px",
    marginBottom: "10px",
    pointerEvents: "none",
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

    fontFamily: "Playfair Display",
    fontWeight: "900",
    clear: "both",
    pointerEvents: "none",
  },
  bodytext: {
    width: "80%",
    fontSize: "19px !important",
    whiteSpace: "pre-line",
    pointerEvents: "none",
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
    alignItems: "center",
  },
  selectedDatesOuter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",

    height: "auto",
    paddingBottom: "10px",
    alignItems: "center",
  },

  district: {
    float: "left",
    marginLeft: "10px",
    color: "rgb(255, 205, 6)",
    height: "25px",
    pointerEvents: "none",
  },

  districtHeader: {
    color: "rgb(255, 205, 6)",
    float: "left",
    paddingRight: "2%",
    width: "100%",
    pointerEvents: "none",
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

const IdeaCardBig = ({ classes, setClicked }) => {
  const dispatch = useDispatch();

  const authenticated = useSelector((state) => state.user.authenticated);

  const {
    screamId,
    locationHeader,
    Stadtteil,
    title,
    body,
    createdAt,
    likeCount,
    commentCount,
    userHandle,
    color,
    project,
    weblink,
    weblinkTitle,
    contact,
    contactTitle,
    selectedUnix,
  } = useSelector((state) => state.data.scream);
  const projects = useSelector((state) => state.data.projects);

  const convertedLinkRaw = weblink && linkify.find(weblink);
  const convertedLink =
    weblink && convertedLinkRaw[0] !== undefined && convertedLinkRaw[0].href;

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 1000);
  };

  const openTheProject = (project) => {
    dispatch(openProjectRoomFunc(project, true));
  };

  const openLink = (convertedLink) => {
    window.open(convertedLink, "_blank");
  };
  const openMail = (contact) => {
    window.location.href = "mailto:" + contact;
  };

  const projectsDataFinal = [];
  if (projects) {
    projects.forEach(({ projectRoomId, title }) => {
      if (project === projectRoomId) {
        projectsDataFinal.push(title);
      }
    });
  }

  const projectTitle = project ? (
    // && project === this.props.projects.project
    <button
      className="screamcardProjectContainer buttonWide "
      onClick={() => openTheProject(project)}
    >
      {projectsDataFinal}
    </button>
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

  return (
    <div
      className="dialogCard"
      style={project ? { paddingBottom: "50px", zIndex: 9999 } : {}}
    >
      <Content>
        <div
          style={{
            width: "15px",
            position: "relative",
            height: "15px",
            margintop: "5px",
            borderRadius: "100%",
            border: "0.5px white solid",
            backgroundColor: color,
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
        <EngagementWrapper>
          <LikeButton screamId={screamId} />
          <h4>{likeCount} </h4>

          <CommentButton handleButtonClick={() => handleClick()} />
          <h4>{commentCount}</h4>
        </EngagementWrapper>
        <div className={classes.horrizontalLine}></div>
        <div className={classes.header}>
          {selectedUnixArray !== undefined && selectedUnixArray !== null && (
            <div className={classes.selectedDatesOuter}>
              <img
                src={CalendarIcon}
                width="20px"
                style={{ paddingRight: "5px", alignSelf: "center" }}
                al="CalendarIcon"
              />

              <div className={classes.locationHeader}> {selectedDates} </div>
            </div>
          )}
          <div className={classes.locationOuter}>
            <img
              src={LocationIcon}
              width="20px"
              height="20px"
              style={{ paddingRight: "5px", alignSelf: "center" }}
              alt="locationIcon"
            />

            <div className={classes.locationHeader}> {locationHeader} </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "start",
            }}
          >
            <img
              src={PenIcon}
              width="20px"
              style={{ paddingRight: "5px", alignSelf: "center" }}
              alt="CreatorIcon"
            />

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

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {weblink && (
              <Button onClick={() => openLink(convertedLink)}>
                {weblinkTitle}
                <img
                  src={WeblinkIcon}
                  style={{
                    paddingLeft: "9px",
                    marginTop: "-2px",
                  }}
                  width="15"
                  alt="WeblinkIcon"
                />
              </Button>
            )}

            {contact && (
              <Button onClick={() => openMail(contact)}>
                {contactTitle}
                <img
                  src={contactIcon}
                  style={{ paddingLeft: "9px" }}
                  width="22"
                  alt="WeblinkIcon"
                />
              </Button>
            )}
          </div>

          {projectTitle}
        </div>
      </Content>
    </div>
  );
};

export default withStyles(styles)(IdeaCardBig);
