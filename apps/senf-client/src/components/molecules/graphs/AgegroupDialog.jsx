/** @format */

import React, { useState, Fragment, useEffect } from "react";
import { isMobileOnly } from "react-device-detect";
// Icons
import CloseIcon from "../../../images/icons/close.png";

//Components

import MyButton from "../../../util/MyButton";
import ExpandButton from "../../atoms/CustomButtons/ExpandButton";

// MUI Stuff
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const AgegroupGraph = React.lazy(() =>
  import(/* webpackChunkName: "Agegroup-Graph" */ "./AgegroupGraph")
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

const AgegroupDialog = ({ classes, data, screams, likes }) => {
  const [open, setOpen] = useState(false);

  console.log(likes);

  const dialogComponent = isMobileOnly ? (
    <Dialog
      scroll={"body"}
      open={open}
      onClose={() => setOpen(false)}
      BackdropProps={{ classes: { root: classes.root } }}
      PaperProps={{ classes: { root: classes.paper } }}
      TransitionComponent={Transition}
      fullScreen
      className="dialogOverlayContent"
      maxWidth={"lg"}
    >
      <MyButton
        onClick={() => setOpen(false)}
        btnClassName={classes.closeButton}
      >
        <img src={CloseIcon} width="20px" />
      </MyButton>

      <React.Suspense fallback={<CircularProgress size={50} thickness={2} />}>
        <AgegroupGraph
          data={data}
          classes={classes}
          screams={screams}
          likes={likes}
        />
      </React.Suspense>
    </Dialog>
  ) : (
    <Dialog
      scroll={"body"}
      open={open}
      onClose={() => setOpen(false)}
      BackdropProps={{ classes: { root: classes.root } }}
      PaperProps={{ classes: { root: classes.paperWeb } }}
      TransitionComponent={Transition}
      fullScreen
      className="dialogOverlayContent"
      maxWidth={"lg"}
    >
      <MyButton
        onClick={() => setOpen(false)}
        btnClassName={classes.closeButton}
      >
        <img src={CloseIcon} width="20px" />
      </MyButton>

      <React.Suspense fallback={<CircularProgress size={50} thickness={2} />}>
        <AgegroupGraph data={data} screams={screams} likes={likes} />
      </React.Suspense>
    </Dialog>
  );

  return (
    <Fragment>
      <ExpandButton handleButtonClick={() => setOpen(true)} />

      {dialogComponent}
    </Fragment>
  );
};

export default withStyles(styles)(AgegroupDialog);
