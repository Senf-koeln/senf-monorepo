/** @format */

import firebase from "firebase/app";
import "firebase/firestore";

import { closeScream } from "./screamActions";
import {
  LOADING_UI,
  STOP_LOADING_UI,
  LOADING_PROJECTS_DATA,
  SET_PROJECTS,
  SET_PROJECT,
  OPEN_PROJECT,
  CLOSE_PROJECT,
} from "../types";

// Get all projects
export const getProjects = () => async (dispatch) => {
  dispatch({ type: LOADING_PROJECTS_DATA });

  const db = firebase.firestore();
  const ref = await db
    .collection("projects")
    .orderBy("createdAt", "desc")
    .get();

  const projects = [];
  ref.docs.forEach((doc) => {
    const docData = {
      project: doc.id,
      title: doc.data().title,
      // description: doc.data().description,
      owner: doc.data().owner,
      createdAt: doc.data().createdAt,
      imgUrl: doc.data().imgUrl,
      startDate: doc.data().startDate,
      endDate: doc.data().endDate,
      status: doc.data().status,
      geoData: doc.data().geoData,
      centerLat: doc.data().centerLat,
      centerLong: doc.data().centerLong,
      zoom: doc.data().zoom,
      projectId: doc.id,
      calendar: doc.data().calendar,
      // weblink: doc.data().weblink,
    };

    projects.push(docData);
  });

  dispatch({
    type: SET_PROJECTS,
    payload: projects,
  });
};

// Open a project
export const openProjectFunc = (project) => async (dispatch) => {
  dispatch({ type: LOADING_UI });

  const db = firebase.firestore();
  const ref = await db.collection("projects").doc(project).get();

  const screamsRef = await db
    .collection("screams")
    .where("project", "==", project)
    .orderBy("createdAt", "desc")
    .get();

  if (!ref.exists) {
    console.log("No such document!");
  } else {
    const project = ref.data();

    project.id = ref.id;
    project.screams = [];

    screamsRef.docs.forEach((doc) =>
      project.screams.push({ ...doc.data(), screamId: doc.id })
    );
    dispatch(closeScream());
    const newPath = `/${project.id}`;
    window.history.pushState(null, null, newPath);
    dispatch({ type: SET_PROJECT, payload: project });
    dispatch({ type: OPEN_PROJECT });

    dispatch({ type: STOP_LOADING_UI });
  }
};

export const closeProject = () => (dispatch) => {
  dispatch({ type: SET_PROJECT, payload: null });
  dispatch({ type: CLOSE_PROJECT });

  window.history.pushState(null, null, "/");

  setTimeout(() => {
    document.body.style.overflow = "scroll";
  }, 1000);
};
