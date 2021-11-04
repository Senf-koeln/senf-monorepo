/** @format */

import React, { useState, Fragment, useEffect } from "react";
import { isMobileOnly } from "react-device-detect";
import _ from "lodash";
// Icons
import CloseIcon from "@material-ui/icons/Close";

//Components
import AgegroupGraph from "./AgegroupGraph";
import MyButton from "../../../util/MyButton";

// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
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
    marginTop: "0",
    top: "0em",
    position: "relative",
    overflow: "hidden",
    paddingTop: "1em",
    backgroundColor: "white",
    height: "auto",
    paddingBottom: "0em",
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
    width: "100%",

    borderRadius: "10px",
    top: "2vh",
    transform: "scale(0.8)",
    marginLeft: "7px",
    paddingLeft: "20px",

    marginBottom: "20px",
    maxWidth: "500px",
    marginLeft: "50%",
    transform: "translateX(-50%)",
  },
};

const AgegroupDialog = ({ classes, data, screams, likes }) => {
  const [open, setOpen] = useState(false);

  let topics_care;
  let topics_traffic;

  useEffect(() => {
    const agegroupUnder18 = _.filter(screams, ({ age }) => age < 18);
    const agegroup18To24 = _.filter(screams, ({ age }) => age > 18 && age < 25);
    const agegroup25To34 = _.filter(screams, ({ age }) => age > 24 && age < 35);
    const agegroup35To44 = _.filter(screams, ({ age }) => age > 24 && age < 35);
    const agegroup45To54 = _.filter(screams, ({ age }) => age > 24 && age < 35);
    const agegroup55To64 = _.filter(screams, ({ age }) => age > 24 && age < 35);
    const agegroupOver65 = _.filter(screams, ({ age }) => age > 64);

    let topics_care = [
      _.filter(agegroupUnder18, { Thema: "Versorgung" }).likeCount,
      _.filter(agegroupUnder18, { Thema: "Versorgung" }).length * -1,
      _.filter(agegroup18To24, { Thema: "Versorgung" }).likeCount,
      _.filter(agegroup18To24, { Thema: "Versorgung" }).length * -1,
      _.filter(agegroup25To34, { Thema: "Versorgung" }).likeCount,
      _.filter(agegroup25To34, { Thema: "Versorgung" }).length * -1,
      _.filter(agegroup35To44, { Thema: "Versorgung" }).likeCount,
      _.filter(agegroup35To44, { Thema: "Versorgung" }).length * -1,
      _.filter(agegroup45To54, { Thema: "Versorgung" }).likeCount,
      _.filter(agegroup45To54, { Thema: "Versorgung" }).length * -1,
      _.filter(agegroup55To64, { Thema: "Versorgung" }).likeCount,
      _.filter(agegroup55To64, { Thema: "Versorgung" }).length * -1,
      _.filter(agegroupOver65, { Thema: "Versorgung" }).likeCount,
      _.filter(agegroupOver65, { Thema: "Versorgung" }).length * -1,
    ];

    const topics_traffic = [
      _.filter(agegroupUnder18, { Thema: "Verkehr" }).likeCount,
      _.filter(agegroupUnder18, { Thema: "Verkehr" }).length * -1,
      _.filter(agegroup18To24, { Thema: "Verkehr" }).likeCount,
      _.filter(agegroup18To24, { Thema: "Verkehr" }).length * -1,
      _.filter(agegroup25To34, { Thema: "Verkehr" }).likeCount,
      _.filter(agegroup25To34, { Thema: "Verkehr" }).length * -1,
      _.filter(agegroup35To44, { Thema: "Verkehr" }).likeCount,
      _.filter(agegroup35To44, { Thema: "Verkehr" }).length * -1,
      _.filter(agegroup45To54, { Thema: "Verkehr" }).likeCount,
      _.filter(agegroup45To54, { Thema: "Verkehr" }).length * -1,
      _.filter(agegroup55To64, { Thema: "Verkehr" }).likeCount,
      _.filter(agegroup55To64, { Thema: "Verkehr" }).length * -1,
      _.filter(agegroupOver65, { Thema: "Verkehr" }).likeCount,
      _.filter(agegroupOver65, { Thema: "Verkehr" }).length * -1,
    ];

    const topics_ecoAndGreen = [
      _.filter(agegroupUnder18, { Thema: "Umwelt und Grün" }).likeCount,
      _.filter(agegroupUnder18, { Thema: "Umwelt und Grün" }).length * -1,
      _.filter(agegroup18To24, { Thema: "Umwelt und Grün" }).likeCount,
      _.filter(agegroup18To24, { Thema: "Umwelt und Grün" }).length * -1,
      _.filter(agegroup25To34, { Thema: "Umwelt und Grün" }).likeCount,
      _.filter(agegroup25To34, { Thema: "Umwelt und Grün" }).length * -1,
      _.filter(agegroup35To44, { Thema: "Umwelt und Grün" }).likeCount,
      _.filter(agegroup35To44, { Thema: "Umwelt und Grün" }).length * -1,
      _.filter(agegroup45To54, { Thema: "Umwelt und Grün" }).likeCount,
      _.filter(agegroup45To54, { Thema: "Umwelt und Grün" }).length * -1,
      _.filter(agegroup55To64, { Thema: "Umwelt und Grün" }).likeCount,
      _.filter(agegroup55To64, { Thema: "Umwelt und Grün" }).length * -1,
      _.filter(agegroupOver65, { Thema: "Umwelt und Grün" }).likeCount,
      _.filter(agegroupOver65, { Thema: "Umwelt und Grün" }).length * -1,
    ];

    const topics_bike = [
      _.filter(agegroupUnder18, { Thema: "Rad" }).likeCount,
      _.filter(agegroupUnder18, { Thema: "Rad" }).length * -1,
      _.filter(agegroup18To24, { Thema: "Rad" }).likeCount,
      _.filter(agegroup18To24, { Thema: "Rad" }).length * -1,
      _.filter(agegroup25To34, { Thema: "Rad" }).likeCount,
      _.filter(agegroup25To34, { Thema: "Rad" }).length * -1,
      _.filter(agegroup35To44, { Thema: "Rad" }).likeCount,
      _.filter(agegroup35To44, { Thema: "Rad" }).length * -1,
      _.filter(agegroup45To54, { Thema: "Rad" }).likeCount,
      _.filter(agegroup45To54, { Thema: "Rad" }).length * -1,
      _.filter(agegroup55To64, { Thema: "Rad" }).likeCount,
      _.filter(agegroup55To64, { Thema: "Rad" }).length * -1,
      _.filter(agegroupOver65, { Thema: "Rad" }).likeCount,
      _.filter(agegroupOver65, { Thema: "Rad" }).length * -1,
    ];

    const topics_inclusionAndSocial = [
      _.filter(agegroupUnder18, { Thema: "Inklusion / Soziales" }).likeCount,
      _.filter(agegroupUnder18, { Thema: "Inklusion / Soziales" }).length * -1,
      _.filter(agegroup18To24, { Thema: "Inklusion / Soziales" }).likeCount,
      _.filter(agegroup18To24, { Thema: "Inklusion / Soziales" }).length * -1,
      _.filter(agegroup25To34, { Thema: "Inklusion / Soziales" }).likeCount,
      _.filter(agegroup25To34, { Thema: "Inklusion / Soziales" }).length * -1,
      _.filter(agegroup35To44, { Thema: "Inklusion / Soziales" }).likeCount,
      _.filter(agegroup35To44, { Thema: "Inklusion / Soziales" }).length * -1,
      _.filter(agegroup45To54, { Thema: "Inklusion / Soziales" }).likeCount,
      _.filter(agegroup45To54, { Thema: "Inklusion / Soziales" }).length * -1,
      _.filter(agegroup55To64, { Thema: "Inklusion / Soziales" }).likeCount,
      _.filter(agegroup55To64, { Thema: "Inklusion / Soziales" }).length * -1,
      _.filter(agegroupOver65, { Thema: "Inklusion / Soziales" }).likeCount,
      _.filter(agegroupOver65, { Thema: "Inklusion / Soziales" }).length * -1,
    ];

    const topics_sportsAndLeisure = [
      _.filter(agegroupUnder18, { Thema: "Sport / Freizeit" }).likeCount,
      _.filter(agegroupUnder18, { Thema: "Sport / Freizeit" }).length * -1,
      _.filter(agegroup18To24, { Thema: "Sport / Freizeit" }).likeCount,
      _.filter(agegroup18To24, { Thema: "Sport / Freizeit" }).length * -1,
      _.filter(agegroup25To34, { Thema: "Sport / Freizeit" }).likeCount,
      _.filter(agegroup25To34, { Thema: "Sport / Freizeit" }).length * -1,
      _.filter(agegroup35To44, { Thema: "Sport / Freizeit" }).likeCount,
      _.filter(agegroup35To44, { Thema: "Sport / Freizeit" }).length * -1,
      _.filter(agegroup45To54, { Thema: "Sport / Freizeit" }).likeCount,
      _.filter(agegroup45To54, { Thema: "Sport / Freizeit" }).length * -1,
      _.filter(agegroup55To64, { Thema: "Sport / Freizeit" }).likeCount,
      _.filter(agegroup55To64, { Thema: "Sport / Freizeit" }).length * -1,
      _.filter(agegroupOver65, { Thema: "Sport / Freizeit" }).likeCount,
      _.filter(agegroupOver65, { Thema: "Sport / Freizeit" }).length * -1,
    ];

    const topics_other = [
      _.filter(agegroupUnder18, { Thema: "Sonstige" }).likeCount,
      _.filter(agegroupUnder18, { Thema: "Sonstige" }).length * -1,
      _.filter(agegroup18To24, { Thema: "Sonstige" }).likeCount,
      _.filter(agegroup18To24, { Thema: "Sonstige" }).length * -1,
      _.filter(agegroup25To34, { Thema: "Sonstige" }).likeCount,
      _.filter(agegroup25To34, { Thema: "Sonstige" }).length * -1,
      _.filter(agegroup35To44, { Thema: "Sonstige" }).likeCount,
      _.filter(agegroup35To44, { Thema: "Sonstige" }).length * -1,
      _.filter(agegroup45To54, { Thema: "Sonstige" }).likeCount,
      _.filter(agegroup45To54, { Thema: "Sonstige" }).length * -1,
      _.filter(agegroup55To64, { Thema: "Sonstige" }).likeCount,
      _.filter(agegroup55To64, { Thema: "Sonstige" }).length * -1,
      _.filter(agegroupOver65, { Thema: "Sonstige" }).likeCount,
      _.filter(agegroupOver65, { Thema: "Sonstige" }).length * -1,
    ];
  }, []);

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
        <CloseIcon />
      </MyButton>

      <DialogContent>
        <AgegroupGraph
          data={data}
          classes={classes}
          screams={screams}
          likes={likes}
        />
      </DialogContent>
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
        <CloseIcon />
      </MyButton>

      <DialogContent>
        <AgegroupGraph
          data={data}
          screams={screams}
          likes={likes}
          classes={classes}
        />
      </DialogContent>
    </Dialog>
  );

  return (
    <Fragment>
      <MyButton
        onClick={() => setOpen(true)}
        btnClassName={classes.expandButton}
      ></MyButton>

      {dialogComponent}
    </Fragment>
  );
};

export default withStyles(styles)(AgegroupDialog);
