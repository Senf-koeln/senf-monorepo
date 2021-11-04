/** @format */

import firebase from "firebase/app";
import "firebase/firestore";
import setColorByTopic from "../../data/setColorByTopic";

import {
  SET_MY_SCREAMS,
  OPEN_ACCOUNT,
  CLOSE_ACCOUNT,
  LOADING_MYSCREAMS_DATA,
} from "../types";

export const openAccountFunc = (userId) => async (dispatch) => {
  dispatch({
    type: OPEN_ACCOUNT,
  });

  if (userId !== undefined) {
    dispatch({ type: LOADING_MYSCREAMS_DATA });
    const db = firebase.firestore();
    const ref = await db
      .collection("screams")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .get();

    const screams = [];
    ref.docs.forEach((doc) => {
      const docData = {
        screamId: doc.id,
        lat: doc.data().lat,
        long: doc.data().long,
        title: doc.data().title,
        body: doc.data().body.substr(0, 170),
        createdAt: doc.data().createdAt,
        commentCount: doc.data().commentCount,
        likeCount: doc.data().likeCount,
        status: doc.data().status,
        Thema: doc.data().Thema,
        Stadtteil: doc.data().Stadtteil,
        project: doc.data().project,
        projectId: doc.data().project,
        color: setColorByTopic(doc.data().Thema),
      };

      screams.push(docData);
    });

    dispatch({
      type: SET_MY_SCREAMS,
      payload: screams,
    });
  } else {
    setTimeout(() => {
      openAccountFunc(userId);
    }, 1000);
  }
};

export const closeAccountFunc = () => async (dispatch) => {
  dispatch({
    type: SET_MY_SCREAMS,
    payload: null,
  });
  dispatch({
    type: CLOSE_ACCOUNT,
  });
};
