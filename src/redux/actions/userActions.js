/** @format */
import firebase from "firebase/app";
import "firebase/firestore";

import { SET_USER, SET_UNAUTHENTICATED } from "../types";
import { closeAccountFunc } from "./accountActions";

export const resetPassword = (email, history) => (dispatch) => {
  console.log(email);
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      console.log("Password reset email sent!", email);
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
};

export const logoutUser = () => (dispatch) => {
  firebase.auth().signOut();
  dispatch({ type: SET_UNAUTHENTICATED });
  dispatch(closeAccountFunc());
};

export const getUserData = (uid) => async (dispatch) => {
  const db = firebase.firestore();
  const userDocument = await db
    .collection("users")
    .where("userId", "==", uid)
    .get();

  userDocument.docs.forEach((doc) => {
    const userData = doc.data();
    userData.likes = [];
    dispatch(getUserLikes(userData));
  });
};

export const getUserLikes = (userData) => async (dispatch) => {
  const db = firebase.firestore();

  const userLikes = await db
    .collection("likes")
    .where("userHandle", "==", userData.handle)
    .get();

  userLikes.docs.forEach((doc) => userData.likes.push({ ...doc.data() }));

  dispatch({
    type: SET_USER,
    payload: userData,
  });
};
