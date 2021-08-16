/** @format */

import React, { Component } from "react";
import { isMobileOnly } from "react-device-detect";

//REDUX STUFF
import { connect } from "react-redux";

//Icons
import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from "@material-ui/icons/Close";

//Images
import Celebrate from "../../images/celebrateImage.png";
import Fast_geschafft from "../../images/headlines/Fast_geschafft.png";

//COMPONENT
import SignInNote from "./SignInNote";

//MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  question: {
    fontSize: "14pt",
    border: "1px #414345 solid",
    borderRadius: "100%",
    position: "fixed",
    bottom: "2vh",
    right: "2vh",
    zIndex: 99,
    width: "1.5em",
    height: "1.5em",
    lineHeight: "22pt",
    textAlign: "center",
  },
};

export class info extends Component {
  handleClick = () => {
    alert(
      "Abhängig davon, welchen E-Mail Dienstleister du nutzt, kann die Verifizierungs-E-Mail verzögert eintreffen. Falls wirklich keine E-Mail eintreffen sollte, bitte melde dich bei uns: dein@senf.koeln"
    );
  };
  render() {
    const { loading } = this.props.data;
    const { classes } = this.props;

    const closeButtonDesktop = !isMobileOnly ? (
      <a href="/">
        <button className="buttonRound buttonClose">
          <CloseIcon />
        </button>
      </a>
    ) : null;

    const start = !loading ? (
      <div>
        {/* <div className="MainBackground"></div> */}
        {closeButtonDesktop}
        <img
          src={Fast_geschafft}
          className="VerifyHeader"
          alt="Fast_geschafft_headline"
        />

        <div className="VerifySubHeader">
          Du bekommst in den nächsten Minuten von uns eine E-Mail. <br /> &#40;
          {this.props.history.location.state.email}, evtl. im Junk-Ordner&#41;{" "}
          <br />
          <br /> Bitte öffne sie und klicke auf den Link um deinen Account zu
          verifizieren. Danach kannst du dich anmelden!
        </div>

        <button className="buttonWide buttonVerify">
          Zur Anmeldung <SignInNote />
        </button>

        <img src={Celebrate} className="CelebrateVerify" alt="EndImage" />

        <div className={classes.question} onClick={() => this.handleClick()}>
          ?
        </div>
      </div>
    ) : (
      <div className="white">
        <div className="spinnerDiv">
          <CircularProgress size={50} thickness={2} />
        </div>
      </div>
    );

    return <div>{start}</div>;
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps)(withStyles(styles)(info));
