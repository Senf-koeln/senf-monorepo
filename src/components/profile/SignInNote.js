/** @format */

import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { isAndroid } from "react-device-detect";

//Redux
import { loginUser, signupUser } from "../../redux/actions/userActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//Icons
import CloseIcon from "@material-ui/icons/Close";
import CircularProgress from "@material-ui/core/CircularProgress";

//Images
import Wirke_mit from "../../images/headlines/Wirke_mit.png";

//Components
import ResetPassword from "./ResetPassword";

// MUI Stuff
import Dialog from "@material-ui/core/Dialog";
import Swipe from "react-easy-swipe";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = {
  openButton: {
    zIndex: 999,
    backgroundColor: "rgba(155,109,155,0)",
    position: "absolute",
    left: "0%",
    top: "0",

    width: "100%",
    height: "100%",
    borderRadius: "50vh",
  },
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

  closeButton: {
    zIndex: 9999,
    position: "fixed",
    left: "2.5vw",
    top: "2.5vw",
    color: "black",
    backgroundColor: "white",
  },

  headline: {
    width: "60%",
    marginTop: "10%",
    marginLeft: "20%",
  },
  SignInButton: {
    position: "fixed",
    zIndex: 99,
    paddingTop: "10px",
    paddingBottom: "10px",
    textAlign: "center",
    width: "49vw",
    left: "25vw",
    top: "48vh",
    borderRadius: "100px",
    color: "white",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0)",
    backgroundColor: "#414345",
    textTransform: "none",
    fontSize: "15pt",
  },
  RegisterButton: {
    position: "fixed",
    zIndex: 99,
    paddingTop: "10px",
    paddingBottom: "10px",
    textAlign: "center",
    width: "50vw",
    left: "25vw",
    top: "56vh",
    borderRadius: "100px",
    color: "#414345",
    textTransform: "none",
    fontSize: "15pt",
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

  checkField: {
    zIndex: "999",
    width: "90vw",
    marginLeft: "10vw",
  },
  button: {
    position: "fixed",
    zIndex: "999",
    paddingTop: "10px",
    paddingBottom: "10px",
    fontSize: "14pt",
    width: "80vw",
    marginLeft: "10vw",
    bottom: "3em",
    borderRadius: "100px",
    color: "black",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.1)",
    backgroundColor: "white",
    textTransform: "none",
  },
  smallText: {
    position: "fixed",
    zIndex: "999",
    bottom: "1em",
    textAlign: "center",
    width: "100%",
    fontSize: "14pt",
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
    position: "fixed",
    left: "50%",
    marginLeft: "-15px",
    bottom: "4em",
    zIndex: "9999",
  },
  TermsWrapper: {
    whiteSpace: "nowrap",
  },

  data: {
    marginTop: "0.5em",
    marginLeft: "10vw",
    width: "80vw",
    fontSize: "11pt",
    textAlign: "center",
  },

  forgotWrapper: {
    position: "relative",
    marginTop: "2em",
    textAlign: "center",
    width: "100vw",
    height: "1em",
    fontSize: "12pt",
    backgroundColor: "green",
  },
  forgot: {
    position: "relative",
    marginTop: "1em",
    textAlign: "center",
    width: "100%",
    fontSize: "12pt",
  },
};

class SignInNote extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      accept: false,
      loading: false,
      open: false,
    };
  }

  handleOpenSign = () => {
    this.setState({
      open: true,
    });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData, this.props.history);

    // setTimeout(
    //   function () {
    //     window.location.reload();
    //   }.bind(this),
    //   59 * 1000
    // );
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSwipeMove(position) {
    if (`${position.x}` > 150) {
      this.handleClose();
    }
    if (`${position.y}` > 200) {
      this.handleClose();
    }
  }

  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;

    return (
      <Fragment>
        <button
          onClick={this.handleOpenSign}
          className={classes.openButton}
        ></button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          width="md"
          BackdropProps={{ classes: { root: classes.root } }}
          PaperProps={{ classes: { root: classes.paper } }}
          TransitionComponent={Transition}
        >
          <button
            onClick={this.handleClose}
            className="buttonRound buttonClose"
          >
            <CloseIcon />
          </button>

          <Swipe onSwipeMove={this.onSwipeMove.bind(this)}>
            <img
              src={Wirke_mit}
              className={classes.headline}
              alt="wirke_mit_headline"
            />

            <form noValidate onSubmit={this.handleSubmit}>
              <div className={classes.textfields}>
                <TextField
                  id="outlined-name"
                  name="email"
                  type="email"
                  label="E-Mail"
                  margin="normal"
                  color="transparent"
                  variant="outlined"
                  className={classes.textField}
                  // helperText={errors.email}
                  error={errors.email ? true : false}
                  value={this.state.email}
                  onChange={this.handleChange}
                ></TextField>

                <TextField
                  id="outlined-password-input"
                  name="password"
                  label="Passwort"
                  type="password"
                  autoComplete="current-password"
                  margin="normal"
                  variant="outlined"
                  className={classes.textField}
                  // helperText={errors.password}
                  error={errors.password ? true : false}
                  value={this.state.password}
                  onChange={this.handleChange}
                ></TextField>

                <br />
                <ResetPassword></ResetPassword>

                {/* <div className={classes.forgot}>
                  Du hast dein{" "}
                  <span className="Terms">Passwort vergessen? </span>
                </div> */}

                {errors.general && (
                  <Typography className={classes.customError}>
                    {errors.general}
                  </Typography>
                )}
                {errors.emailVerified && (
                  <Typography className={classes.customError}>
                    {errors.emailVerified}
                  </Typography>
                )}
              </div>

              <div
                className={
                  isAndroid ? "buttonSignWrapperAndroid" : "buttonSignWrapper"
                }
              >
                <button
                  type="submit"
                  className="buttonWide buttonSign"
                  onClick={loading}
                >
                  Anmelden
                </button>
              </div>

              {loading && (
                <CircularProgress
                  color="black"
                  size={30}
                  className={classes.progress}
                />
              )}
            </form>
          </Swipe>
        </Dialog>
      </Fragment>
    );
  }
}

SignInNote.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  signupUser: PropTypes.func.isRequired,

  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});
const mapActionsToProps = {
  loginUser,
  signupUser,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(withRouter(SignInNote)));
