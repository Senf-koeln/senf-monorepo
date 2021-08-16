/** @format */

import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";
// MUI Stuff
import Dialog from "@material-ui/core/Dialog";
// Icons
import CloseIcon from "@material-ui/icons/Close";

// Redux stuff
import { connect } from "react-redux";

import Poster from "../../images/poster.png";

//ANIMATION
import Share from "../../images/icons/share.png";

//SHARE
import {
  EmailShareButton,
  FacebookShareButton,
  WhatsappShareButton,
} from "react-share";

//SHAREICONS
import { EmailIcon, FacebookIcon, WhatsappIcon } from "react-share";

import html2canvas from "html2canvas";
import Swipe from "react-easy-swipe";

//COOKIES
import Cookies from "universal-cookie";
import { isMobileOnly } from "react-device-detect";
const cookies = new Cookies();

const styles = {
  root: {
    position: "fixed",
    padding: "0",
    top: 0,
    left: 0,
    height: "100vh",
    width: "100%",
    backgroundColor: "transparent",
  },

  paper: {
    padding: 0,
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    boxShadow: "none",
    backgroundColor: "transparent",
  },

  paperWeb: {
    borderRadius: "20px",
    height: "150px",
    width: "90%",
    maxWidth: "400px",
  },

  Background: {
    position: "fixed",
    padding: "0",
    top: 0,
    left: 0,
    height: "100vh",
    width: "100%",
    backgroundImage:
      "linear-gradient(to bottom, rgba(255,209,155,0.9), rgba(255,218,83,0.9), rgba(255,255,255,0.9))",
    backgroundRepeat: "no-repeat",
  },

  closeButtonShare: {
    position: "fixed",
    top: "2.5vw",
    left: "2.5vw",
    color: "black",
    zIndex: "990",
    padding: 10,
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

  functions: {
    zIndex: "999",
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",

    height: "auto",
    width: "100%",
    top: "0.5em",
  },

  shareButtons: {
    position: "relative",
    width: "13%",
    height: "10vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    zIndex: "990",
  },

  faceButton: {
    zIndex: 9999,
  },

  expandButton: {
    position: "absolute",
    left: "0%",
    top: "0%",
    width: "100%",
    height: "100%",
    borderRadius: "100%",
    zIndex: 9,
    // backgroundColor: "rgb(0,0,0,0.5)",
  },
};

class ScreamShare extends Component {
  state = {
    openShare: false,
    clicked: false,
    boolean: true,

    oldPath: "",
    newPath: "",
    path: "",
    zoomdetail: false,
    MapHeight: "80vw",
    MapMargin: "0vh",
    viewport: {
      position: "fixed",
      width: "100vw",
      height: "52vh",
      zoom: 12,
      color: "lightgrey",
    },
  };

  componentDidMount() {
    document.body.style.overflow = "hidden";
  }

  handleOpenShare = () => {
    this.setState({
      openShare: true,
    });
  };

  handleImageLoaded() {
    function hiddenClone(element) {
      // Create clone of element
      window.scroll(0, 0);

      var clone = element.cloneNode(true);

      // Position element relatively within the
      // body but still out of the viewport
      var style = clone.style;
      style.position = "absolute";
      style.top = window.innerHeight + "px";
      style.left = 0;

      // Append clone to body and return the clone
      document.body.appendChild(clone);
      return clone;
    }

    var offScreen = document.querySelector("#content");

    // Clone off-screen element
    var clone = hiddenClone(offScreen);

    setTimeout(
      function () {
        html2canvas(clone, {
          removeContainer: true,
        }).then(function (canvas) {
          window.scroll(0, 0);
          var image = new Image();
          image.src = canvas.toDataURL("image/png");
          image.style.width = "100%";
          document.querySelector("#container").appendChild(image);
          clone.remove();
        });

        this.props.handleUnErrorMap();
      }.bind(this),
      500
    );
  }

  handleCloseShare = () => {
    this.setState({ openShare: false });
  };

  onSwipeMove(position) {
    if (`${position.x}` > 150) {
      this.handleCloseShare();
    }
    if (`${position.y}` > 200) {
      this.handleCloseShare();
    }
  }

  render() {
    const { classes } = this.props;

    const std =
      this.props.Stadtteil !== "Ohne Ortsangabe" ? (
        <span>{this.props.Stadtteil} – </span>
      ) : null;

    const photoComponent = this.props.locationHeader ? (
      <>
        <p
          style={{
            fontFamily: "Futura PT W01-Bold",
            fontSize: "15pt",
            color: "#414345",
            width: "70vw",
            textAlign: "center",
            marginLeft: "15vw",
            left: 0,
            zIndex: "999",
            position: "relative",
            top: "0em",
          }}
        >
          Oder speicher und teile das Story-Poster!
        </p>
        <div
          id="container"
          style={{
            position: "relative",

            left: "20vw",
            width: "60vw",
            height: "60vw",
            zIndex: 999,
            boxShadow: "0 8px 40px -12px rgba(0,0,0,0.5)",
          }}
        ></div>

        <p
          style={{
            fontFamily: "Futura PT W01 Book",
            fontSize: "12pt",
            color: "#414345",
            width: "70vw",
            textAlign: "center",
            marginLeft: "15vw",
            left: 0,
            zIndex: "999",
            position: "relative",
            top: "1em",
          }}
        >
          (Halte das Foto lange gedrückt)
        </p>

        <div
          id="content"
          style={{
            position: "absolute",
            top: "-200vh",
            width: "100vw",
            height: "100vw",
            overflowY: "hidden",
          }}
        >
          <img
            src={Poster}
            alt="ChatIcon"
            onLoad={this.handleImageLoaded.bind(this)}
            style={{
              position: "absolute",

              left: "0vw",
              width: "100%",
              height: "100%",
              top: "0vw",
            }}
          />
          <span
            style={{
              fontFamily: "Futura PT W01 Book",
              fontSize: "12pt",
              color: "#414345",
              width: "100vw",

              marginLeft: "1.8em",
              left: 0,
              zIndex: "999",
              position: "absolute",
              top: "6em",
              fontVariantLigatures: "none",
            }}
          >
            {std} {this.props.locationHeader}
          </span>

          <p
            style={{
              fontFamily: "Futura PT W01-Bold",
              fontSize: "14pt",
              color: "#414345",
              zIndex: "999",
              width: "60vw",
              left: 0,
              marginLeft: "1.5em",
              textAlign: "left",
              zIndex: "999",
              position: "absolute",
              top: "5.5em",
              fontVariantLigatures: "none",
            }}
          >
            {this.props.title}
          </p>
        </div>
      </>
    ) : null;

    const dialogComponent = isMobileOnly ? (
      <Dialog
        open={this.state.openShare}
        onClose={this.handleCloseShare}
        BackdropProps={{ classes: { root: classes.root } }}
        PaperProps={{ classes: { root: classes.paper } }}
        className={classes.Background}
        fullScreen
      >
        <button
          onClick={this.handleCloseShare}
          className="buttonRound buttonClose"
        >
          <CloseIcon />
        </button>
        <Swipe onSwipeMove={this.onSwipeMove.bind(this)}>
          <p
            style={{
              fontFamily: "Futura PT W01-Bold",
              fontSize: "15pt",
              color: "#353535",
              width: "100%",
              textAlign: "center",
              marginLeft: "0",
              left: 0,
              zIndex: "9",
              position: "relative",
              top: "1em",
              marginBottom: "0.5em",
            }}
          >
            Teile den Link per
          </p>

          <div className={classes.functions}>
            <WhatsappShareButton
              url={this.props.path}
              className={classes.shareButtons}
            >
              <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton>

            <FacebookShareButton
              url={this.props.path}
              className={classes.shareButtons}
            >
              <FacebookIcon
                className={classes.faceButton}
                size={32}
                round={true}
              />
            </FacebookShareButton>

            <EmailShareButton
              url={this.props.path}
              className={classes.shareButtons}
            >
              <EmailIcon
                className={classes.faceButton}
                size={32}
                round={true}
              />
            </EmailShareButton>
          </div>
          {photoComponent}
        </Swipe>
      </Dialog>
    ) : (
      <Dialog
        open={this.state.openShare}
        onClose={this.handleCloseShare}
        width="md"
        BackdropProps={{ classes: { root: classes.rootWeb } }}
        PaperProps={{ classes: { root: classes.paperWeb } }}
      >
        <p
          style={{
            fontFamily: "Futura PT W01-Bold",
            fontSize: "15pt",
            color: "#414345",
            width: "100%",
            textAlign: "center",
            marginLeft: "0",
            left: 0,
            zIndex: "999",
            position: "relative",
            top: "1em",
            marginBottom: "0.5em",
          }}
        >
          Teile den Link per
        </p>

        <div className={classes.functions}>
          <WhatsappShareButton
            url={this.props.path}
            className={classes.shareButtons}
          >
            <WhatsappIcon size={32} round={true} />
          </WhatsappShareButton>

          <FacebookShareButton
            url={this.props.path}
            className={classes.shareButtons}
          >
            <FacebookIcon
              className={classes.faceButton}
              size={32}
              round={true}
            />
          </FacebookShareButton>

          <EmailShareButton
            url={this.props.path}
            className={classes.shareButtons}
          >
            <EmailIcon className={classes.faceButton} size={32} round={true} />
          </EmailShareButton>
        </div>
      </Dialog>
    );
    return (
      <Fragment>
        <button
          onClick={this.handleOpenShare}
          className="buttonRound buttonShare"
        >
          <img src={Share} width="20" alt="editIcon" />
        </button>

        {dialogComponent}
      </Fragment>
    );
  }
}

ScreamShare.propTypes = {};

const mapStateToProps = (state) => ({
  UI: state.UI,
  user: state.user,
});

const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ScreamShare));
