/** @format */

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import moment from "moment";
import { clearErrors } from "./errorsActions";
import { loadProjectRoomData } from "./projectActions";
import store from "../store";

import {
  SET_SCREAMS,
  LOADING_DATA,
  STOP_LOADING_DATA,
  DELETE_SCREAM,
  SET_ERRORS,
  POST_SCREAM,
  EDIT_SCREAM,
  LOADING_UI,
  SET_SCREAM,
  LOADING_IDEA_DATA,
  OPEN_SCREAM,
  CLOSE_SCREAM,
  SET_SCREAM_USER,
} from "../types";
import setColorByTopic from "../../data/setColorByTopic";

// Get all ideas
export const getScreams = (mapViewport) => async (dispatch) => {
  dispatch({ type: LOADING_DATA });

  dispatch({
    type: SET_SCREAMS,
    payload: [],
  });
};

export const reloadScreams = () => async (dispatch) => {
  const db = firebase.firestore();
  const ref = await db.collection("screams").orderBy("createdAt", "desc").get();

  const screams = [];
  ref.docs.forEach((doc) => {
    const docData = {
      screamId: doc.id,
      lat: doc.data().lat,
      long: doc.data().long,
      title: doc.data().title,
      body: doc.data().body.substr(0, 120),
      createdAt: doc.data().createdAt,
      commentCount: doc.data().commentCount,
      likeCount: doc.data().likeCount,
      status: doc.data().status,
      Thema: doc.data().Thema,
      Stadtteil: doc.data().Stadtteil,
      projectRoomId: doc.data().projectRoomId,
      color: setColorByTopic(doc.data().Thema),
    };

    screams.push(docData);
  });

  dispatch({
    type: SET_SCREAMS,
    payload: screams,
  });
};

// Open an idea
export const openScreamFunc = (screamId) => async (dispatch) => {
  // When the modal is shown, we want a fixed body
  // document.body.style.position = "fixed";
  // document.body.style.top = `-${window.scrollY}px`;
  dispatch({ type: LOADING_IDEA_DATA });
  dispatch({ type: OPEN_SCREAM });

  const db = firebase.firestore();
  const ref = await db.collection("screams").doc(screamId).get();
  const commentsRef = await db
    .collection("comments")
    .where("screamId", "==", screamId)
    .orderBy("createdAt", "asc")
    .get();

  if (!ref.exists) {
    console.log("No such document!");
    dispatch({ type: CLOSE_SCREAM });
    dispatch({ type: SET_SCREAM, payload: {} });
    window.history.pushState(null, null, "/");
    throw new Error("Idea not found");
  } else {
    const scream = ref.data();
    scream.screamId = ref.id;
    scream.color = setColorByTopic(ref.data().Thema);
    scream.comments = [];

    commentsRef.forEach((doc) =>
      scream.comments.push({ ...doc.data(), commentId: doc.id })
    );

    // window.location = "#" + scream.lat + "#" + scream.long;
    const projectroomPath = store.getState().UI.openProjectRoom
      ? "/projectRooms/" + store.getState().data.project.projectRoomId
      : "";

    const newPath = `${projectroomPath}/${screamId}`;
    window.history.pushState(null, null, newPath);
    dispatch({ type: SET_SCREAM, payload: scream });
  }
};

export const reloadScreamFunc = (screamId) => async (dispatch) => {
  const db = firebase.firestore();
  const ref = await db.collection("screams").doc(screamId).get();
  const commentsRef = await db
    .collection("comments")
    .where("screamId", "==", screamId)
    .orderBy("createdAt", "desc")
    .get();

  if (!ref.exists) {
    console.log("No such document!");
  } else {
    const scream = ref.data();
    scream.screamId = ref.id;
    scream.color = setColorByTopic(ref.data().Thema);
    scream.comments = [];

    commentsRef.forEach((doc) =>
      scream.comments.push({ ...doc.data(), commentId: doc.id })
    );
    dispatch({ type: SET_SCREAM, payload: scream });
  }
};

export const closeScream = () => (dispatch) => {
  const projectroomPath =
    store.getState().UI.openProjectRoom && store.getState().data.project
      ? "/projectRooms/" + store.getState().data.project.projectRoomId
      : "/";

  dispatch({ type: CLOSE_SCREAM });

  // IF IT BECOMES NECESSARY (IF IN PROJECTROOM, GET PROJECTSCREAMS)
  // setTimeout(() => {
  //   dispatch(reloadScreams());
  // }, 100);

  window.history.pushState(null, null, projectroomPath);
};

// Post an idea
export const postScream = (newScream, user, history) => async (dispatch) => {
  console.log(history, user);
  const db = firebase.firestore();

  dispatch({ type: LOADING_DATA });

  if (newScream.title.trim() === "") {
    dispatch({
      type: SET_ERRORS,
      payload: { title: "" },
    });
  } else if (newScream.body.trim() === "") {
    dispatch({
      type: SET_ERRORS,
      payload: { body: "Beschreibung fehlt" },
    });
  } else {
    const ageCapture =
      user.age !== "" ? moment().diff(moment(user.age, "YYYY"), "years") : "";

    const newScreamData = {
      locationHeader: newScream.locationHeader,
      district: newScream.fulladdress,
      Stadtteil: newScream.neighborhood,
      title: newScream.title,
      lat: newScream.lat,
      long: newScream.long,
      body: newScream.body,
      userHandle: user.handle,
      userId: user.userId,
      sex: user.sex,
      age: ageCapture,
      createdAt: new Date().toISOString(),
      likeCount: 0,
      commentCount: 0,
      status: "None",
      projectRoomId: newScream.projectRoomId,
    };

    if (newScream.Thema === "" || newScream.Thema === undefined) {
      newScreamData.Thema = "Sonstige";
    } else {
      newScreamData.Thema = newScream.Thema;
    }
    if (newScream.weblinkTitle)
      newScreamData.weblinkTitle = newScream.weblinkTitle;
    if (newScream.weblink) newScreamData.weblink = newScream.weblink;
    if (newScream.contactTitle)
      newScreamData.contactTitle = newScream.contactTitle;
    if (newScream.contact) newScreamData.contact = newScream.contact;
    if (newScream.selectedUnix)
      newScreamData.selectedUnix = newScream.selectedUnix;

    await db
      .collection("screams")
      .add(newScreamData)
      .then((doc) => {
        const resScream = newScream;
        resScream.screamId = doc.id;

        dispatch({
          type: POST_SCREAM,
          payload: resScream,
        });
        setTimeout(() => {
          dispatch(reloadScreams());
          if (newScream.projectRoomId) {
            dispatch(loadProjectRoomData(newScream.projectRoomId));
          }

          const screamId = resScream.screamId;
          dispatch(openScreamFunc(screamId));
        }, 100);
      });
  }
};

// Edit your idea
export const editScreamFunc = (editScream) => async (dispatch) => {
  const db = firebase.firestore();
  dispatch({ type: LOADING_UI });
  const screamId = editScream.screamId;

  if (editScream.notes) {
    editScream.notes = editScream.notes;
  } else {
    delete editScream.notes;
  }

  await db
    .collection("screams")
    .doc(screamId)
    .update(editScream)
    .then((doc) => {
      dispatch({
        type: EDIT_SCREAM,
        payload: editScream,
      });
    });
  dispatch(openScreamFunc(screamId));
  dispatch(clearErrors());
};

// Delete your idea
export const deleteScream = (screamId, user) => async (dispatch) => {
  const projectroomPath = store.getState().UI.openProjectRoom
    ? "/projectRooms/" + store.getState().data.project.projectRoomId
    : "/";
  const db = firebase.firestore();
  const ref = db.collection("screams").doc(screamId);
  const doc = await ref.get();

  console.log(doc.data());

  if (!doc.exists) {
    console.log("Scream not found");
  }
  // else if (doc.data().userHandle !== user.handle) {
  //   console.log("Unauthorized", doc.data().handle, user.handle);
  //   // return res.status(403).json({ error: "Unauthorized" });
  // }
  else {
    window.history.pushState(null, null, projectroomPath);

    dispatch({
      type: DELETE_SCREAM,
      payload: screamId,
    });
    ref.delete().then(() => {
      setTimeout(() => {
        window.location.reload(false);
        dispatch(clearErrors());
      }, 100);
    });
  }
};

export const getUserEmail = (userId) => async (dispatch) => {
  const db = firebase.firestore();
  await db
    .collection("users")
    .doc(userId)
    .collection("Private")
    .doc(userId)
    .get()
    .then((doc) => {
      dispatch({
        type: SET_SCREAM_USER,
        payload: doc.data(),
      });
    });
};
