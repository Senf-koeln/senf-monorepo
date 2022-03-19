/** @format */

import React, { useState, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
// MUI Stuff
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
// Icons
import CloseIcon from "../../../images/icons/close.png";

//ANIMATION
import Slide from "@material-ui/core/Slide";

import { isMobileCustom } from "../../../util/customDeviceDetect";
import ExpandButton from "../../atoms/CustomButtons/ExpandButton";
import MyButtonStyle from "../../atoms/CustomButtons/MyButtonStyle";
import MyButton from "../../../util/MyButton";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const DistrictsGraph = React.lazy(() =>
  import(/* webpackChunkName: "DistrictsGraph" */ "./DistrictsGraph")
);
const styles = {
  root: {
    //backgroundColor: "rgb(0,0,0,0.5)",
    padding: "0",
    overflow: "hidden",
  },

  paper: {
    backgroundColor: "#f8f8f8",
    boxShadow: "none",
    overflow: "hidden",
    height: "auto",
    padding: "0",
    top: "8em",
    borderRadius: "10px",
  },

  paperWeb: {
    backgroundColor: "#f8f8f8",
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
      <MyButton
        onClick={() => setOpen(false)}
        btnClassName={classes.closeButton}
      >
        <img src={CloseIcon} width="20px" />
      </MyButton>

      <React.Suspense fallback={<CircularProgress size={50} thickness={2} />}>
        <DistrictsGraph classes={classes} screams={screams} />
      </React.Suspense>
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
      <MyButton
        onClick={() => setOpen(false)}
        btnClassName={classes.closeButton}
      >
        <img src={CloseIcon} width="20px" />
      </MyButton>

      <DialogContent>
        <React.Suspense fallback={<CircularProgress size={50} thickness={2} />}>
          <DistrictsGraph classes={classes} screams={screams} />
        </React.Suspense>
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
