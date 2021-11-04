/** @format */

import React, { useState, Fragment } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

//REDUX STUFF
import { Link } from "react-router-dom";

//GET TIME TIMESTAMP
import dayjs from "dayjs";

// MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";

//ICONS
import MenuIcon from "../../../images/icons/menu.png";
import CommentMenuModal from "../Modals/CommentMenuModal";
import { StyledText } from "../../../styles/GlobalStyle";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "95%",
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: "20px",
    borderTop: "0px solid #414345",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0)",
    zIndex: 99,
  },
  content: {
    padding: "16px",
    width: "calc(100% - 32px)",
    objectFit: "cover",
  },
  bodytext: {
    fontSize: "14pt",
    paddingTop: "0.5em",
  },

  header: {
    padding: 0,
    width: "90%",
    objectFit: "cover",
  },

  gridWrapper: {
    width: "100vw",
  },

  user: {
    position: "relative",
    float: "left",
    color: "#414345",
  },
  date: {
    position: "relative",
    width: "80vw",
    color: "#414345",
  },
  editButton: {
    position: "absolute",
    height: "3.5em",
    marginTop: "0",
    width: "15%",
    zIndex: "990",
    right: "0",
    top: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  editButtonCircle: {
    padding: 10,
    textAlign: "center",
    borderRadius: "10%",
  },
  vertline: {
    width: "4px",
    position: "relative",
    backgroundColor: "#414345",
    height: "10px",
    marginLeft: "-2px",
    left: "50%",
    zIndex: "0",
  },
};

const Comments = ({
  classes,
  setCommentMenuOpen,
  setUserHandleSelected,
  setCommentIdSelected,
}) => {
  const comments = useSelector((state) => state.data.scream.comments);

  return (
    <Grid container>
      {comments.map((comment, index) => {
        const { body, createdAt, userHandle, commentId } = comment;

        return (
          <Fragment key={createdAt}>
            <div className={classes.vertline} />

            <Grid item sm={12}>
              <Grid container>
                <Grid item sm={12} className={classes.gridWrapper}>
                  <div className={classes.commentData}>
                    <Card className={classes.card}>
                      <div className={classes.content}>
                        <div className={classes.header}>
                          <Typography
                            component={Link}
                            to={`/users/${userHandle}`}
                            className={classes.user}
                          >
                            {userHandle}&nbsp;–&nbsp;
                          </Typography>

                          <Typography className={classes.date}>
                            {dayjs(createdAt).format("DD.MM.YYYY")}
                          </Typography>
                        </div>

                        <div
                          className={classes.editButton}
                          onClick={() => {
                            setCommentMenuOpen(true);
                            setUserHandleSelected(userHandle);
                            setCommentIdSelected(commentId);
                          }}
                        >
                          <img
                            className={classes.editButtonCircle}
                            src={MenuIcon}
                            width="25"
                            alt="editIcon"
                          />
                        </div>

                        <StyledText>{body}</StyledText>
                      </div>
                    </Card>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Fragment>
        );
      })}
    </Grid>
  );
};

export default withStyles(styles)(Comments);
