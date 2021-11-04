/** @format */

import React, { useState, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
// MUI Stuff
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

// Icons
import CloseIcon from "@material-ui/icons/Close";

//ANIMATION
import Slide from "@material-ui/core/Slide";
import DistrictsGraph from "./DistrictsGraph";

import { isMobileCustom } from "../../../util/customDeviceDetect";
import ExpandButton from "../../atoms/CustomButtons/ExpandButton";
import MyButtonStyle from "../../atoms/CustomButtons/MyButtonStyle";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = {
  root: {
    //backgroundColor: "rgb(0,0,0,0.5)",
    padding: "0",
    overflow: "hidden",
  },

  paper: {
    //backgroundColor: "rgb(0,0,0,0.5)",
    boxShadow: "none",
    overflow: "hidden",
    height: "auto",
    padding: "0",
    top: "8em",
    borderRadius: "10px",
  },

  paperWeb: {
    borderRadius: "20px",
    width: "1000px",
    height: "auto",
    maxHeight: "calc(100vh - 80px)",
    overflowX: "hidden",
  },

  closeButton: {
    position: "absolute",
    top: "2.5vw",
    left: "2.5vw",
    color: "black",
    zIndex: "990",
    padding: 10,
  },

  expandButton: {
    position: "absolute",
    left: "0%",
    top: "0%",
    width: "100%",
    height: "100%",
    borderRadius: 0,
    zIndex: 9,
  },
  card: {
    marginTop: "2.5vw",
    top: "0em",
    position: "relative",
    width: "100%",
    paddingTop: "1em",
    backgroundColor: "white",
    height: "auto",
    paddingBottom: "1em",
    borderRadius: "10px",
    overflow: "hidden",
  },

  title: {
    fontFamily: "Futura PT W01-Bold",
    position: "relative",
    height: "2em",
    width: "100%",
    fontSize: "28",
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Futura PT W01 Book",
    position: "relative",
    height: "auto",
    width: "100%",
    maxWidth: "500px",
    marginLeft: "50%",
    transform: "translateX(-50%)",
    fontSize: "20",
    textAlign: "center",
  },
  legendwrapper: {
    color: "black",
    zIndex: "1",
    position: "relative",
    width: "100%",

    borderRadius: "10px",
    top: "2vh",
    paddingLeft: "20px",

    marginBottom: "20px",
    maxWidth: "500px",
    marginLeft: "50%",
    transform: "translateX(-50%)",
  },
  plot: {
    position: "relative",
    width: "100%",
  },
  clickblocker: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: "9",
  },
};

const DistrictsDialog = ({ classes, screams }) => {
  const [open, setOpen] = useState("");

  const dialogComponent = isMobileCustom ? (
    <Dialog
      scroll={"body"}
      open={open}
      onClose={() => setOpen(false)}
      className="dialogOverlayContent"
      BackdropProps={{ classes: { root: classes.root } }}
      PaperProps={{ classes: { root: classes.paper } }}
      maxWidth={"lg"}
      TransitionComponent={Transition}
      fullScreen
    >
      <MyButtonStyle
        onClick={() => setOpen(false)}
        btnClassName={classes.closeButton}
      >
        <CloseIcon />
      </MyButtonStyle>

      <DialogContent>
        <DistrictsGraph classes={classes} screams={screams} />
      </DialogContent>
    </Dialog>
  ) : (
    <Dialog
      scroll={"body"}
      open={open}
      onClose={() => setOpen(false)}
      className="dialogOverlayContent"
      BackdropProps={{ classes: { root: classes.root } }}
      PaperProps={{ classes: { root: classes.paperWeb } }}
      maxWidth={"lg"}
      TransitionComponent={Transition}
      fullScreen
    >
      <MyButtonStyle
        onClick={() => setOpen(false)}
        btnClassName={classes.closeButton}
      >
        <CloseIcon />
      </MyButtonStyle>

      <DialogContent>
        <DistrictsGraph classes={classes} screams={screams} />
      </DialogContent>
    </Dialog>
  );

  return (
    <Fragment>
      <ExpandButton handleButtonClick={() => setOpen(true)}></ExpandButton>

      {dialogComponent}
    </Fragment>
  );
};

export default withStyles(styles)(DistrictsDialog);
