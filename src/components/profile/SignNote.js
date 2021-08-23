/** @format */

import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { isAndroid } from "react-device-detect";
import Swipe from "react-easy-swipe";

//Redux
import { loginUser, signupUser } from "../../redux/actions/userActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//Components
import ToggleDisplay from "react-toggle-display";
import ResetPassword from "./ResetPassword";

//Icons

//Images
import Wirke_mit from "../../images/headlines/Wirke_mit.png";

// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
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
    borderRadius: "20px",
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

class SignNote extends Component {
  state = {
    open: false,
    signup: true,
    signin: false,
    email: "",
    password: "",
    confirmPassword: "",
    handle: "",
    errors: {},
    accept: false,
    sex: "",
    age: "",
  };

  handleOpenSign = () => {
    this.setState({
      open: true,
      signup: true,
      signin: false,
      scrollCSS: true,
      accept: true,
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
    //   function() {
    //     this.setState({ open: false });
    //   }.bind(this),
    //   1500
    // );
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

  handleSubmitRegister = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });

    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle,
      age: this.state.age,
      sex: this.state.sex,
    };

    this.props.signupUser(newUserData, this.props.history);
  };

  handleForgot = (event) => {
    var link =
      "mailto:dein@senf.koeln" +
      "?subject=" +
      escape("Passwort vergessen: Bitte setzt mein Passwort zurueck") +
      "&body=" +
      escape(
        "Ich habe mein Passwort vergessen. Mit dieser E-Mail-Adresse habe ich den Account erstellt:" +
          "\n" +
          "\n" +
          "________@____.de " +
          "\n" +
          "\n" +
          "Bitte setzt mein Passwort zurueck."
      );
    window.location.href = link;
    //this.props.signupUser(newUserData, this.props.history);
  };

  handleClickSignIn() {
    this.setState({
      signup: false,
      signin: true,
    });
  }

  handleClickSignUp() {
    this.setState({
      signup: true,
      signin: false,
    });
  }

  handleChangeSignup = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleAccept() {
    this.setState({
      accept: !this.state.accept,
    });
  }

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
          data-cy="open-signnote"
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
            <ToggleDisplay show={this.state.signin}>
              <form noValidate onSubmit={this.handleSubmit}>
                <div className={classes.textfields}>
                  <div
                    className={classes.smallText}
                    onClick={() => this.handleClickSignUp()}
                  >
                    Noch kein Mitglied?{" "}
                    <span className="Terms">Registrieren</span>
                  </div>
                  <TextField
                    id="outlined-name"
                    name="email"
                    type="email"
                    label="E-Mail"
                    margin="normal"
                    variant="outlined"
                    className={classes.textField}
                    data-cy="login-email"
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
                    data-cy="login-password"
                    // helperText={errors.password}
                    error={errors.password ? true : false}
                    value={this.state.password}
                    onChange={this.handleChange}
                  ></TextField>

                  <br />

                  <ResetPassword></ResetPassword>

                  {/* <div className={classes.forgot}>
                    Du hast dein{" "}
                    <span className="Terms" onClick={() => this.handleForgot()}>
                      Passwort vergessen?{" "}
                    </span>
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
                    disabled={loading}
                    data-cy="login-user"
                  >
                    Anmelden
                    {loading && (
                      <CircularProgress
                        size={30}
                        className={classes.progress}
                      />
                    )}
                  </button>
                </div>
                <div
                  className={
                    isAndroid
                      ? classes.smallText_fixed_android
                      : classes.smallText_fixed
                  }
                  onClick={() => this.handleClickSignUp()}
                >
                  Noch kein Mitglied?{" "}
                  <span className="Terms">Registrieren</span>
                </div>
              </form>
            </ToggleDisplay>

            <ToggleDisplay show={this.state.signup}>
              <form noValidate onSubmit={this.handleSubmitRegister}>
                <div className={classes.textfields}>
                  <div
                    className={classes.smallText}
                    onClick={() => this.handleClickSignIn()}
                  >
                    Bereits Mitglied?{" "}
                    <span className="Terms" data-cy="login">
                      Anmelden
                    </span>
                  </div>
                  <TextField
                    id="email"
                    name="email"
                    type="email"
                    label="E-Mail"
                    margin="dense"
                    variant="outlined"
                    className={classes.textField}
                    // helperText={errors.email}
                    error={errors.email ? true : false}
                    value={this.state.email}
                    onChange={this.handleChangeSignup}
                    fullWidth
                  ></TextField>
                  <TextField
                    id="password"
                    name="password"
                    type="password"
                    label="Passwort mit mind. 8 Zeichen"
                    margin="dense"
                    variant="outlined"
                    className={classes.textField}
                    // helperText={errors.password}
                    error={errors.password ? true : false}
                    value={this.state.password}
                    onChange={this.handleChangeSignup}
                    fullWidth
                  ></TextField>
                  <TextField
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    label="Passwort bestätigen"
                    margin="dense"
                    variant="outlined"
                    className={
                      this.state.password === ""
                        ? classes.textField_hide
                        : classes.textField
                    }
                    // helperText={errors.confirmPassword}
                    error={errors.confirmPassword ? true : false}
                    value={this.state.confirmPassword}
                    onChange={this.handleChangeSignup}
                    fullWidth
                  ></TextField>
                  <TextField
                    id="handle"
                    name="handle"
                    type="text"
                    label="Nutzername"
                    margin="dense"
                    variant="outlined"
                    className={classes.textField}
                    // helperText={errors.handle}
                    error={errors.handle ? true : false}
                    value={this.state.handle}
                    onChange={this.handleChangeSignup}
                    fullWidth
                  ></TextField>

                  <FormControl
                    variant="outlined"
                    className={
                      this.state.handle === ""
                        ? classes.textFieldAge_hide
                        : classes.textFieldAge
                    }
                  >
                    <InputLabel
                      margin="dense"
                      htmlFor="outlined-age-native-simple"
                    >
                      Jahrgang
                    </InputLabel>
                    <Select
                      native
                      margin="dense"
                      value={this.state.age}
                      onChange={this.handleChangeSignup}
                      label="Geschlecht"
                      id="standard-textarea"
                      inputProps={{
                        name: "age",
                        id: "outlined-age-native-simple",
                      }}
                    >
                      <option aria-label="None" value="" />
                      <option value={"2004"}>2004</option>
                      <option value={"2003"}>2003</option>
                      <option value={"2002"}>2002</option>
                      <option value={"2001"}>2001</option>
                      <option value={"2000"}>2000</option>
                      <option value={"1999"}>1999</option>
                      <option value={"1998"}>1998</option>
                      <option value={"1997"}>1997</option>
                      <option value={"1996"}>1996</option>
                      <option value={"1995"}>1995</option>
                      <option value={"1994"}>1994</option>
                      <option value={"1993"}>1993</option>
                      <option value={"1992"}>1992</option>
                      <option value={"1991"}>1991</option>
                      <option value={"1990"}>1990</option>
                      <option value={"1989"}>1989</option>
                      <option value={"1988"}>1988</option>
                      <option value={"1987"}>1987</option>
                      <option value={"1986"}>1986</option>
                      <option value={"1985"}>1985</option>
                      <option value={"1984"}>1984</option>
                      <option value={"1983"}>1983</option>
                      <option value={"1982"}>1982</option>
                      <option value={"1981"}>1981</option>
                      <option value={"1980"}>1980</option>
                      <option value={"1979"}>1979</option>
                      <option value={"1978"}>1978</option>
                      <option value={"1977"}>1977</option>
                      <option value={"1976"}>1976</option>
                      <option value={"1975"}>1975</option>
                      <option value={"1974"}>1974</option>
                      <option value={"1973"}>1973</option>
                      <option value={"1972"}>1972</option>
                      <option value={"1971"}>1971</option>
                      <option value={"1970"}>1970</option>
                      <option value={"1969"}>1969</option>
                      <option value={"1968"}>1968</option>
                      <option value={"1967"}>1967</option>
                      <option value={"1966"}>1966</option>
                      <option value={"1965"}>1965</option>
                      <option value={"1964"}>1964</option>
                      <option value={"1963"}>1963</option>
                      <option value={"1962"}>1962</option>
                      <option value={"1961"}>1961</option>
                      <option value={"1960"}>1960</option>
                      <option value={"1959"}>1959</option>
                      <option value={"1958"}>1958</option>
                      <option value={"1957"}>1957</option>
                      <option value={"1956"}>1956</option>
                      <option value={"1955"}>1955</option>
                      <option value={"1954"}>1954</option>
                      <option value={"1953"}>1953</option>
                      <option value={"1952"}>1952</option>
                      <option value={"1951"}>1951</option>
                      <option value={"1950"}>1950</option>
                      <option value={"1949"}>1949</option>
                      <option value={"1948"}>1948</option>
                      <option value={"1947"}>1947</option>
                      <option value={"1946"}>1946</option>
                      <option value={"1945"}>1945</option>
                      <option value={"1944"}>1944</option>
                      <option value={"1943"}>1943</option>
                      <option value={"1942"}>1942</option>
                      <option value={"1941"}>1941</option>
                      <option value={"1940"}>1940</option>
                      <option value={"1939"}>1939</option>
                      <option value={"1938"}>1938</option>
                      <option value={"1937"}>1937</option>
                      <option value={"1936"}>1936</option>
                      <option value={"1935"}>1935</option>
                      <option value={"1934"}>1934</option>
                      <option value={"1933"}>1933</option>
                      <option value={"1932"}>1932</option>
                      <option value={"1931"}>1931</option>
                      <option value={"1930"}>1930</option>
                      <option value={"1929"}>1929</option>
                      <option value={"1928"}>1928</option>
                      <option value={"1927"}>1927</option>
                      <option value={"1926"}>1926</option>
                      <option value={"1925"}>1925</option>
                      <option value={"1924"}>1924</option>
                      <option value={"1923"}>1923</option>
                      <option value={"1922"}>1922</option>
                      <option value={"1921"}>1921</option>
                      <option value={"1920"}>1920</option>
                      <option value={"1919"}>1919</option>
                      <option value={"1918"}>1918</option>
                      <option value={"1917"}>1917</option>
                      <option value={"1916"}>1916</option>
                      <option value={"1915"}>1915</option>
                      <option value={"1914"}>1914</option>
                      <option value={"1913"}>1913</option>
                      <option value={"1912"}>1912</option>
                      <option value={"1911"}>1911</option>
                      <option value={"1910"}>1910</option>
                      <option value={"1909"}>1909</option>
                      <option value={"1908"}>1908</option>
                      <option value={"1907"}>1907</option>
                      <option value={"1906"}>1906</option>
                      <option value={"1905"}>1905</option>
                      <option value={"1904"}>1904</option>
                      <option value={"1903"}>1903</option>
                      <option value={"1902"}>1902</option>
                      <option value={"1901"}>1901</option>
                      <option value={"1900"}>1900</option>
                    </Select>
                  </FormControl>
                  <FormControl
                    variant="outlined"
                    className={
                      this.state.handle === ""
                        ? classes.textFieldSex_hide
                        : classes.textFieldSex
                    }
                  >
                    <InputLabel
                      margin="dense"
                      htmlFor="outlined-age-native-simple"
                    >
                      Geschlecht
                    </InputLabel>
                    <Select
                      native
                      margin="dense"
                      value={this.state.sex}
                      onChange={this.handleChangeSignup}
                      label="Geschlecht"
                      id="standard-textarea"
                      inputProps={{
                        name: "sex",
                        id: "outlined-age-native-simple",
                      }}
                    >
                      <option aria-label="None" value="" />
                      <option value={"female"}>Weiblich</option>
                      <option value={"male"}>Männlich</option>
                      <option value={"diverse"}>Divers</option>
                    </Select>
                  </FormControl>
                  {/* {errors.handle && (
                    <Typography className={classes.customError}>
                      {errors.handle}
                    </Typography>
                  )} */}
                  <div className={classes.data}>
                    Mit der Registrierung bestätige ich, dass ich die &nbsp;
                    <a className="Terms" href="/agb" target="_blank">
                      AGB
                    </a>
                    &nbsp; und die &nbsp;
                    <a className="Terms" href="/datenschutz" target="_blank">
                      Datenschutzrichtlinie
                    </a>
                    &nbsp; von Senf gelesen habe und ihnen zustimme.
                    {/* Ich bestätige außerdem, dass ich mindestens 18 Jahre alt bin */}
                  </div>
                </div>
                <div
                  className={
                    isAndroid ? "buttonSignWrapperAndroid" : "buttonSignWrapper"
                  }
                >
                  <button
                    type="submit"
                    className="buttonWide buttonSign"
                    disabled={loading}
                  >
                    Registrieren
                    {loading && (
                      <CircularProgress
                        size={30}
                        className={classes.progress}
                      />
                    )}
                  </button>
                </div>
                <div
                  className={
                    isAndroid
                      ? classes.smallText_fixed_android
                      : classes.smallText_fixed
                  }
                  onClick={() => this.handleClickSignIn()}
                >
                  Bereits Mitglied? <span className="Terms">Anmelden</span>
                </div>
              </form>
            </ToggleDisplay>
          </Swipe>
        </Dialog>
      </Fragment>
    );
  }
}

SignNote.propTypes = {
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
)(withStyles(styles)(withRouter(SignNote)));
