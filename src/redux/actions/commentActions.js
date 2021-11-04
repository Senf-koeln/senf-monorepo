/** @format */
import firebase from "firebase/app";
import "firebase/firestore";

import { clearErrors } from "./errorsActions";

import { reloadScreamFunc } from "./screamActions";

import {
  SET_COMMENT,
  DELETE_COMMENT,
  LOADING_UI,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
} from "../types";
import moment from "moment";

//get the data for one comment
export const getComment = (commentId) => async (dispatch) => {
  const db = firebase.firestore();
  dispatch({ type: LOADING_UI });

  const ref = await db.collection("comments").doc(commentId).get();

  if (!ref.exists) {
    console.log("Comment not found");
  } else {
    const commentData = ref.data();
    commentData.id = ref.id;

    dispatch({
      type: SET_COMMENT,
      payload: commentData,
    });
  }
  dispatch({ type: STOP_LOADING_UI });
};
// Submit a comment to an idea
export const submitComment =
  (screamId, commentData, user) => async (dispatch) => {
    const db = firebase.firestore();
    const ref = db.collection("screams").doc(screamId);
    const doc = await ref.get();

    if (!doc.exists) {
      console.log("No such document!");
    } else {
      ref.update({ commentCount: doc.data().commentCount + 1 });

      const ageCapture =
        user.age !== "" ? moment().diff(moment(user.age, "YYYY"), "years") : "";

      const newComment = {
        body: commentData.body,
        createdAt: new Date().toISOString(),
        screamId: screamId,
        userHandle: user.handle,
        userId: user.userId,
        sex: user.sex,
        age: ageCapture,
        Thema: doc.data().Thema,
      };
      await db.collection("comments").add(newComment);

      dispatch({
        type: SUBMIT_COMMENT,
        payload: newComment,
      });

      setTimeout(() => {
        dispatch(reloadScreamFunc(screamId));
      }, 100);
    }
  };

//delete your comment
export const deleteComment =
  (commentId, user, screamId, isAdmin, isModerator) => async (dispatch) => {
    const db = firebase.firestore();
    const ref = db.collection("comments").doc(commentId);
    const doc = await ref.get();

    const screamDocument = db.collection("screams").doc(screamId);
    const screamDoc = await screamDocument.get();

    const commentsRef = await db
      .collection("comments")
      .where("screamId", "==", screamId)
      .orderBy("createdAt", "desc")
      .get();

    if (!doc.exists) {
      console.log("No such document!");
    } else if (
      doc.data().userHandle === user.handle ||
      isAdmin ||
      isModerator
    ) {
      const scream = screamDoc.data();
      scream.commentCount--;
      screamDocument.update({ commentCount: scream.commentCount });
      scream.comments = [];
      commentsRef.forEach((doc) =>
        scream.comments.push({ ...doc.data(), commentId: doc.id })
      );

      ref.delete();
      dispatch({
        type: DELETE_COMMENT,
        payload: commentId,
      });

      setTimeout(() => {
        dispatch(reloadScreamFunc(screamId));
      }, 100);
    } else {
      console.log(doc.data().userHandle, user.handle, "not your comment");
      // return res.status(403).json({ error: "Unauthorized" });
    }
    dispatch(clearErrors());
  };
