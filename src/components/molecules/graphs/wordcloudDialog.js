/** @format */

import React, { Component, Fragment } from "react";
import { isMobileCustom } from "../../../util/customDeviceDetect";

// Icons
import CloseIcon from "@material-ui/icons/Close";

//Component
import { Wordcloud } from "./wordcloud";

// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import MyButtonStyle from "../../atoms/CustomButtons/MyButtonStyle";
import ExpandButton from "../../atoms/CustomButtons/ExpandButton";
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
    padding: "0",
    top: "8em",
    overflow: "hidden",
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
  dialogcontent: {
    position: "relative",
    marginLeft: "2.5vw",

    width: "95vw",
    height: "auto",
  },

  card: {
    marginTop: "2.5vw",
    top: "0em",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
    paddingTop: "1em",
    backgroundColor: "white",
    height: "auto",
    paddingBottom: "1em",
    borderRadius: "10px",
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
  plot: {
    top: "2vh",
    position: "relative",
    width: "100%",
  },
  clickblocker: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: "9",
  },
  legendwrapper: {
    color: "black",
    zIndex: "1",
    position: "relative",
    width: "110vw",
    height: "20vh",
    left: "-12.5vw",
    borderRadius: "10px",
    top: "-0.5vw",
    transform: "scale(0.8)",
    marginLeft: "7px",
    paddingLeft: "20px",
  },
  textField: {
    backgroundColor: "white",
    borderRadius: "5px",
    marginTop: "10px",
    paddingBottom: "1em",
  },
  wordcloud: {
    position: "relative",
    backgroundColor: "whiite",
    zIndex: 999,
    left: "-5%",
    height: "50vh",
    width: "90%",
    maxWidth: "500px",
    marginLeft: "50%",
    transform: "translateX(-50%)",
  },
};

class DistrictsDialog extends Component {
  state = {
    open: false,

    oldPath: "",
    newPath: "",
    path: "",
  };

  handleOpen = () => {
    this.setState({ open: true });
    setTimeout(() => {
      alert(
        "INFO: Die Keywords können erst aussagekräftig werden, wenn mehr Ideen geteilt werden"
      );
    }, 500);
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    const dialogComponent = isMobileCustom ? (
      <Dialog
        scroll={"body"}
        open={this.state.open}
        onClose={this.handleClose}
        BackdropProps={{ classes: { root: classes.root } }}
        PaperProps={{ classes: { root: classes.paper } }}
        TransitionComponent={Transition}
        fullScreen
        className="dialogOverlayContent"
        maxWidth={"lg"}
      >
        <MyButtonStyle
          onClick={this.handleClose}
          btnClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButtonStyle>

        <DialogContent>
          <Wordcloud data={this.props.data} classes={this.props.classes} />
        </DialogContent>
      </Dialog>
    ) : (
      <Dialog
        scroll={"body"}
        open={this.state.open}
        onClose={this.handleClose}
        BackdropProps={{ classes: { root: classes.root } }}
        PaperProps={{ classes: { root: classes.paperWeb } }}
        TransitionComponent={Transition}
        fullScreen
        className="dialogOverlayContent"
        maxWidth={"lg"}
      >
        <MyButtonStyle
          onClick={this.handleClose}
          btnClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButtonStyle>

        <DialogContent>
          <Wordcloud data={this.props.data} classes={this.props.classes} />
        </DialogContent>
      </Dialog>
    );

    return (
      <Fragment>
        <ExpandButton handleButtonClick={this.handleOpen}></ExpandButton>

        {dialogComponent}
      </Fragment>
    );
  }
}

export default withStyles(styles)(DistrictsDialog);
