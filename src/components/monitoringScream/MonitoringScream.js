/** @format */

import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

//TIMESTAMP
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Redux
import { connect } from "react-redux";

// Icons
import menuIcon from "../../images/icons/menu.png";
import statusIcon from "../../images/icons/flag.png";

import {
  clearErrors,
  openMonitoringScream,
} from "../../redux/actions/dataActions";

const styles = {
  gradient: {
    width: "100%",
    height: "70px",
    position: "absolute",
    bottom: 0,

    background:
      "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 20%, rgba(255,255,255,0) 100%)",
  },

  card: {
    position: "relative",
    display: "flex",
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto",

    maxWidth: "95%",
    borderRadius: 20,
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0)",
    height: "100px",
  },

  content: {
    padding: 0,
    color: "rgb(87, 87, 87)",
    width: "100%",

    objectFit: "cover",
    display: "flex",
    justifyContent: "space-between",
  },
};

class MonitoringScream extends Component {
  state = {
    isToggleOn: false,
    cardHeight: "30px",
    notes: null,
  };

  componentDidMount() {
    this.setState({
      notes: null,
    });
  }

  handleExpand = (screamId) => {
    this.props.openMonitoringScream(screamId);
    this.setState((prevState) => ({
      isToggleOn: !prevState.isToggleOn,
    }));
  };

  handleChange = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });

    console.log(this.state.selectedUnix);
  };

  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      projectsData,
      scream: {
        title,
        screamId,
        likeCount,
        commentCount,
        Stadtteil,
        project,
        Thema,
        status,
        createdAt,
        userHandle,
      },
    } = this.props;

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

    const projectsDataFinal = [];
    if (projectsData) {
      const projectsDataArray = projectsData;

      projectsDataArray.forEach((element) => {
        if (project === element.project) {
          projectsDataFinal.push(element.imgUrl);
        }
      });
    }

    return (
      <button
        className="monitoringCard"
        onClick={() => this.handleExpand(screamId)}
      >
        <div>
          <div className={classes.content}>
            <div style={{ width: "20px", margin: "10px" }}>
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
            <div style={{ width: "300px", margin: "10px" }}>{title} </div>
            <div style={{ width: "110px", margin: "10px" }}>{Stadtteil}</div>
            <div style={{ width: "110px", margin: "10px" }}>{userHandle}</div>

            <div style={{ width: "20px", margin: "10px" }}>{likeCount}</div>
            <div style={{ width: "20px", margin: "10px" }}>{commentCount}</div>

            <div style={{ width: "40px", margin: "10px" }}>
              {dayjs(createdAt).format("DD.MM.")}
            </div>
            <div style={{ width: "30px", margin: "10px" }}>
              <img
                src={projectsDataFinal}
                width="30px"
                alt="project-thumbnail"
                style={{ borderRadius: "10px", overflow: "hidden" }}
              ></img>
            </div>
            <div style={{ width: "20px", margin: "10px" }}>
              {" "}
              {status === "None" ? (
                <img src={statusIcon} width="22" alt="status-icon" />
              ) : null}
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: 0,
            zIndex: 999,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            borderRadius: "20px",
          }}
          className="hoverIcon"
        >
          <div style={{ width: "50px", margin: "10px" }}>
            {" "}
            <img
              className="hoverIcon"
              src={menuIcon}
              style={{ paddingTop: "5px" }}
              width="30"
              alt="WeblinkIcon"
            />
          </div>
        </div>
      </button>
    );
  }
}

MonitoringScream.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openMonitoringScream: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapActionsToProps = {
  openMonitoringScream,
  clearErrors,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(MonitoringScream));
