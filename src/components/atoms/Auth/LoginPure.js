/** @format */

import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import firebase from "firebase/app";
import "firebase/auth";
import { useHistory } from "react-router";

import PropTypes from "prop-types";
import Swipe from "react-easy-swipe";

//Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import ExpandButton from "../CustomButtons/ExpandButton";
//Icons

//Images
import Wirke_mit from "../../../images/headlines/Wirke_mit.png";

// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import RegistrationFormComponent from "./RegistrationFormComponent";
import LoginFormComponent from "./LoginFormComponent";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = {
  root: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgb(255,255,255,0.1)",
    backgroundImage:
      "linear-gradient(to bottom, rgba(255,209,155,0.9), rgba(255,218,83,0.9), #ffffff)",
    backgroundRepeat: "no-repeat",
    padding: 0,
    top: 0,

    overflow: "hidden",
  },

  paper: {
    width: "100vw",
    height: "100%",
    boxShadow: "none",
    position: "fixed",
    top: 0,
    backgroundColor: "transparent",
    margin: "0",
    paddingBottom: "30vh",
  },

  headline: {
    width: "60%",
    marginTop: "10%",
    marginLeft: "20%",
  },
  textfields: {
    zIndex: 9999,
    maxWidth: "600px",
    position: "relative",
    top: "5vh",
  },

  textField: {
    zIndex: "999",
    width: "80%",
    marginLeft: "10%",
    backgroundColor: "white",
    borderRadius: "5px",
    marginTop: "5px",
  },
  textField_hide: {
    zIndex: "999",
    width: "80%",
    marginLeft: "10%",
    backgroundColor: "white",
    borderRadius: "5px",
    marginTop: "5px",
    display: "none",
  },

  textFieldAge: {
    zIndex: "999",
    width: "38.75%",
    marginLeft: "10%",
    backgroundColor: "white",
    borderRadius: "5px",
    marginTop: "5px",
  },
  textFieldAge_hide: {
    zIndex: "999",
    width: "38.75%",
    marginLeft: "10%",
    backgroundColor: "white",
    borderRadius: "5px",
    marginTop: "5px",
    display: "none",
  },
  textFieldSex: {
    zIndex: "999",
    width: "38.75%",
    marginLeft: "2.5%",
    backgroundColor: "white",
    borderRadius: "5px",
    marginTop: "5px",
  },

  textFieldSex_hide: {
    zIndex: "999",
    width: "38.75%",
    marginLeft: "2.5%",
    backgroundColor: "white",
    borderRadius: "5px",
    marginTop: "5px",
    display: "none",
  },
  checkField: {
    zIndex: "999",
    width: "90vw",
    marginLeft: "10vw",
  },

  smallText: {
    width: "100%",
    fontSize: "14pt",
    position: "relative",
    top: "0",
    marginBottom: "20px",
    zIndex: "999",
    maxWidth: "600px",
    textAlign: "center",
  },

  smallText_fixed: {
    width: "100%",
    fontSize: "14pt",
    position: "fixed",
    bottom: "10px",
    zIndex: "999",
    maxWidth: "600px",
    textAlign: "center",
  },

  smallText_fixed_android: {
    width: "100%",
    fontSize: "14pt",
    position: "relative",
    marginTop: "20px",
    zIndex: "999",
    maxWidth: "600px",
    textAlign: "center",
  },
  customError: {
    zIndex: "999",
    marginTop: "1em",
    textAlign: "center",
    width: "100%",
    fontSize: "12pt",
    color: "red",
  },

  progress: {
    position: "absolute",
    left: "50%",
    marginLeft: "-15px",
    marginTop: "-4px",
    zIndex: "9999",
  },
  TermsWrapper: {
    whiteSpace: "nowrap",
  },

  data: {
    marginTop: "0.5em",
    marginLeft: "10%",
    width: "80%",
    fontSize: "11pt",
    textAlign: "center",
  },

  forgot: {
    position: "relative",
    marginTop: "1em",
    textAlign: "center",
    width: "100%",
    fontSize: "12pt",
  },
};

const LoginPure = ({ classes }) => {
  const [open, setOpen] = useState(false);
  const [toggleSignup, setToggleSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [handle, setHandle] = useState("");

  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");

  const { loading, errors } = useSelector((state) => state.UI);
  const dispatch = useDispatch();
  const history = useHistory();

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.UI.errors) {
  //     setState({ errors: nextProps.UI.errors });
  //   }
  // }

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    const userInfo = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
  };

  const handleSubmitRegister = async (event) => {
    event.preventDefault();
    const userInfo = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        const db = firebase.firestore();

        if (userCredential) {
          await db.collection("users").doc(handle).set({
            handle: handle,
            email: email,
            age: age,
            sex: sex,
            createdAt: new Date().toISOString(),
            userId: userCredential.user.uid,
          });
        }
      })
      .then(async () => {
        var user = firebase.auth().currentUser;
        await user.sendEmailVerification();
      })
      .then(async () => {
        const emailWrapper = {
          email: email,
        };
        history.push("/verify", emailWrapper);
      });
  };

  const handleToggle = () => {
    setToggleSignup(!toggleSignup);
  };

  const onSwipeMove = (position) => {
    if (`${position.x}` > 150) {
      setOpen(false);
    }
    if (`${position.y}` > 200) {
      setOpen(false);
    }
  };

  return (
    <Fragment>
      <ExpandButton
        handleButtonClick={() => setOpen(true)}
        data-cy="open-RegistrationAndLogin"
      ></ExpandButton>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        width="md"
        BackdropProps={{ classes: { root: classes.root } }}
        PaperProps={{ classes: { root: classes.paper } }}
        TransitionComponent={Transition}
      >
        <button
          onClick={() => setOpen(false)}
          className="buttonRound buttonClose"
        >
          <CloseIcon />
        </button>

        <Swipe onSwipeMove={onSwipeMove.bind(this)}>
          <img
            src={Wirke_mit}
            className={classes.headline}
            alt="wirke_mit_headline"
          />

          <LoginFormComponent
            classes={classes}
            errors={errors}
            handleToggle={handleToggle}
            handleSubmitLogin={handleSubmitLogin}
            setEmail={setEmail}
            setPassword={setPassword}
            email={email}
            password={password}
          />
        </Swipe>
      </Dialog>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});
const mapActionsToProps = {};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(withRouter(LoginPure)));
