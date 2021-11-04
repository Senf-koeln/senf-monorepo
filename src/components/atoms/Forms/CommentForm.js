/** @format */

import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import withStyles from "@material-ui/core/styles/withStyles";
// MUI Stuff
import TextField from "@material-ui/core/TextField";
// Redux stuff
import { compose } from "redux";
import { connect } from "react-redux";
import { submitComment } from "../../../redux/actions/commentActions";
import LikeButton from "../CustomButtons/LikeButton";
import { SubmitButton } from "../CustomButtons/SubmitButton";

const styles = {
  textField: {
    position: "absolute",
    bottom: "5px",
    marginLeft: "2.5%",
    width: "calc(100% - 110px)",

    float: "left",
    color: "white",
    marginTop: "10px",
    backgroundColor: "rgb(250,250,250,0.9)",
  },

  button: {
    position: "absolute",
    color: "white",
    height: "40px",
    width: "70px",
    bottom: "10px",

    right: "10px",
    boxShadow: "none",
    borderRadius: "20px",
    textTransform: "none",
  },
  progress: {
    zIndex: 99999,
  },
};

class CommentForm extends Component {
  state = {
    body: "",
    errors: {},
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.clicked) {
      document.getElementById("outlined-name").focus();
    }
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: "" });
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    this.props
      .submitComment(
        this.props.screamId,
        { body: this.state.body },
        this.props.user
      )
      .then(() => {
        this.setState({
          loading: false,
          body: "",
        });
      });
  };

  render() {
    const { classes, authenticated, screamId } = this.props;

    const errors = this.state.errors;

    // if (clicked) {
    //   this.handleChange;
    // }

    const commentFormMarkup = authenticated ? (
      <div className="commentFormWrapper">
        {/* <div className="buttonLikeFixed">
          <LikeButton screamId={screamId} />
        </div> */}
        <form onSubmit={this.handleSubmit}>
          <TextField
            name="body"
            type="text"
            label={this.props.t("opinion")}
            id="outlined-name"
            margin="dense"
            variant="outlined"
            error={errors.comment ? true : false}
            // helperText={errors.comment}
            value={this.state.body}
            onChange={this.handleChange}
            multiline
            fullWidth
            className={classes.textField}
          />
          <SubmitButton
            text="Senden"
            zIndex="999"
            backgroundColor="#fed957"
            width="50px"
            textColor="#353535"
            position="absolute"
            bottom="10px"
            left="calc(50% - 50px)"
            loading={this.state.loading}
            disabled={this.state.body === "" || this.state.loading}
            smallSubmitButton={true}
          />
          {/* <Button
            type="submit"
            variant="contained"
            color="secondary"
            disabled={this.state.body === ""}
            className={classes.button}
          >
            Senden
          </Button> */}

          {/* {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )} */}
        </form>
      </div>
    ) : null;

    return commentFormMarkup;
  }
}

const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
  user: state.user,
});

export default compose(
  withStyles(styles),
  withTranslation(),
  connect(mapStateToProps, { submitComment })
)(CommentForm);
