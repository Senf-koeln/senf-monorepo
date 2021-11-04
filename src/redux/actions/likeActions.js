/** @format */

import firebase from "firebase/app";
import "firebase/firestore";
import moment from "moment";
import setColorByTopic from "../../data/setColorByTopic";

import { LIKE_SCREAM, UNLIKE_SCREAM, VOTED_TRUE, VOTED_FALSE } from "../types";

// Like a scream
export const likeScream = (screamId, user) => async (dispatch) => {
  dispatch({
    type: VOTED_TRUE,
  });
  setTimeout(() => {
    dispatch({
      type: VOTED_FALSE,
    });
  }, 2000);
  const db = firebase.firestore();
  const screamDocument = db.collection("screams").doc(screamId);
  const doc = await screamDocument.get();

  const commentsRef = await db
    .collection("comments")
    .where("screamId", "==", screamId)
    .orderBy("createdAt", "desc")
    .get();

  const likeDocument = await db
    .collection("likes")
    .where("userHandle", "==", user.handle)
    .where("screamId", "==", screamId)
    .limit(1)
    .get();

  if (!doc.exists) {
    console.log("No such document!");
  } else {
    const scream = doc.data();
    scream.screamId = doc.id;
    scream.color = setColorByTopic(doc.data().Thema);
    scream.comments = [];

    commentsRef.forEach((doc) =>
      scream.comments.push({ ...doc.data(), commentId: doc.id })
    );

    const ageCapture =
      user.age !== "" ? moment().diff(moment(user.age, "YYYY"), "years") : "";

    if (likeDocument.exists) {
      console.log("already liked");
    } else {
      db.collection("likes").add({
        screamId: screamId,
        userHandle: user.handle,
        userId: user.userId,
        createdAt: new Date().toISOString(),
        sex: user.sex,
        age: ageCapture,
        Thema: doc.data().Thema,
      });

      scream.likeCount++;
      screamDocument.update({ likeCount: scream.likeCount });

      dispatch({
        type: LIKE_SCREAM,
        payload: scream,
      });
    }
  }
};
// Unlike an idea
export const unlikeScream = (screamId, user) => async (dispatch) => {
  dispatch({
    type: VOTED_TRUE,
  });
  setTimeout(() => {
    dispatch({
      type: VOTED_FALSE,
    });
  }, 2000);
  console.log(screamId, user);
  const db = firebase.firestore();
  const screamDocument = db.collection("screams").doc(screamId);
  const doc = await screamDocument.get();

  const commentsRef = await db
    .collection("comments")
    .where("screamId", "==", screamId)
    .orderBy("createdAt", "desc")
    .get();

  const likeDocument = await db
    .collection("likes")
    .where("userHandle", "==", user.handle)
    .where("screamId", "==", screamId)
    .limit(1)
    .get();

  if (!doc.exists) {
    console.log("No such document!");
  } else {
    const scream = doc.data();
    scream.screamId = doc.id;
    scream.color = setColorByTopic(doc.data().Thema);
    scream.comments = [];

    commentsRef.forEach((doc) =>
      scream.comments.push({ ...doc.data(), commentId: doc.id })
    );

    if (likeDocument.docs[0].id === undefined) {
      console.log("scream not liked");
    } else {
      db.collection("likes").doc(likeDocument.docs[0].id).delete();

      scream.likeCount--;
      screamDocument.update({ likeCount: scream.likeCount });

      dispatch({
        type: UNLIKE_SCREAM,
        payload: scream,
      });
    }
  }
};
