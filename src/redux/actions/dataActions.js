/** @format */

import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  SET_COMMENTS,
  SET_COMMENT,
  DELETE_COMMENT,
  SET_ERRORS,
  POST_SCREAM,
  EDIT_SCREAM,
  ADMIN_EDIT_SCREAM,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_SCREAM,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
  SET_ALL_COMMENTS,
  SET_ALL_LIKES,
  LOADING_PROJECTS_DATA,
  SET_PROJECTS,
  SET_PROJECT_SCREAMS,
  LOADING_PROJECT_SCREAMS,
  LOADING_MY_SCREAMS,
  SET_MY_SCREAMS,
  SUBMIT_CHAT,
  OPEN_SCREAM,
  CLOSE_SCREAM,
  OPEN_PROJECT,
  CLOSE_PROJECT,
  CLEAR_LOADING_ERRORS,
  SET_SCREAM_USER,
  SET_FULL_SCREAMS,
  OPEN_MONITORING_SCREAM,
  CLOSE_MONITORING_SCREAM,
} from "../types";
import axios from "axios";

export const getallComments = () => (dispatch) => {
  // dispatch({ type: LOADING_DATA });
  axios
    .get("/comments")
    .then((res) => {
      dispatch({
        type: SET_ALL_COMMENTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_ALL_COMMENTS,
        payload: [],
      });
    });
};

export const getallLikes = () => (dispatch) => {
  // dispatch({ type: LOADING_DATA });
  axios
    .get("/likes")
    .then((res) => {
      dispatch({
        type: SET_ALL_LIKES,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_ALL_LIKES,
        payload: [],
      });
    });
};

// Get all Projects
export const getProjects = () => (dispatch) => {
  dispatch({ type: LOADING_PROJECTS_DATA });
  axios
    .get("/projects")
    .then((res) => {
      dispatch({
        type: SET_PROJECTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_PROJECTS,
        payload: [],
      });
    });
};

// Get all screams for project
export const getProjectScreams = (project) => (dispatch) => {
  dispatch({ type: LOADING_PROJECT_SCREAMS });

  axios
    .get(`/project/${project.id}`)
    .then((res) => {
      dispatch({
        type: SET_PROJECT_SCREAMS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_PROJECT_SCREAMS,
        payload: [],
      });
    });
};

// Get my Screams
export const getMyScreams = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_MY_SCREAMS });
  axios
    .get(`/screams/${userHandle}`)
    .then((res) => {
      dispatch({
        type: SET_MY_SCREAMS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_MY_SCREAMS,
        payload: [],
      });
    });
};

// Get all screams
export const getScreams = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  console.time("Time this");
  axios
    .get("/screamsFrontend")
    .then((res) => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_SCREAMS,
        payload: [],
      });
    });
  console.timeEnd("Time this");
};

export const openProject = (project) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .get(`/projectGet/${project}`)
    .then((res) => {
      dispatch({
        type: SET_PROJECT_SCREAMS,
        payload: res.data,
      });
      dispatch({ type: OPEN_PROJECT });
      dispatch({ type: STOP_LOADING_UI });

      // const { lat, long } = res.data;
      // dispatch((window.location = "#" + lat + "#" + long));
    })

    .catch((err) => console.log(err));

  // dispatch({ type: LOADING_PROJECT_SCREAMS });
  // dispatch({ type: OPEN_PROJECT });

  // axios
  //   .get(`/projectGet/${projectId}`)
  //   .then((res) => {
  //     dispatch({
  //       type: SET_PROJECT_SCREAMS,
  //       payload: res.data,
  //     });
  //     console.log(res);
  //   })
  //   .catch((err) => {
  //     dispatch({
  //       type: SET_PROJECT_SCREAMS,
  //       payload: [],
  //     });
  //   });
};

export const closeProject = () => (dispatch) => {
  dispatch({ type: CLOSE_PROJECT });
  window.history.pushState(null, null, "/");
  // window.scrollTo({
  //   top: 0,
  //   left: 0,
  //   behavior: "smooth",
  // });
  setTimeout(() => {
    document.body.style.overflow = "scroll";
  }, 1000);
};

export const openMonitoringScream = (screamId) => (dispatch) => {
  // const newPath = `/monitoring/${screamId}`;
  // window.history.pushState(null, null, newPath);

  dispatch({ type: LOADING_UI });

  dispatch({ type: OPEN_MONITORING_SCREAM });

  axios
    .get(`/scream/${screamId}`)
    .then((res) => {
      dispatch({
        type: SET_SCREAM,
        payload: res.data,
      });

      dispatch({ type: STOP_LOADING_UI });
    })

    .catch((err) => console.log(err));
};

export const closeMonitoringScream = () => (dispatch) => {
  dispatch({ type: CLOSE_MONITORING_SCREAM });
  window.history.pushState(null, null, "/monitoring");
};

export const openScream = (screamId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  dispatch({ type: OPEN_SCREAM });
  const newPath = `/${screamId}`;
  window.history.pushState(null, null, newPath);
  debugger
  axios
    .get(`/scream/${screamId}`)
    .then((res) => {
      dispatch({
        type: SET_SCREAM,
        payload: res.data,
      });

      dispatch({ type: STOP_LOADING_UI });

      const { lat, long } = res.data;
      dispatch((window.location = "#" + lat + "#" + long));
    })

    .catch((err) => console.log(err));
};

export const openScreamFirstTime = (screamId) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .get(`/scream/${screamId}`)
    .then((res) => {
      dispatch({
        type: SET_SCREAM,
        payload: res.data,
      });
      dispatch({ type: OPEN_SCREAM });

      dispatch({ type: STOP_LOADING_UI });

      const { lat, long } = res.data;
      dispatch((window.location = "#" + lat + "#" + long));
    })

    .catch((err) => console.log(err));
};

export const closeScream = () => (dispatch) => {
  dispatch({ type: CLOSE_SCREAM });
  window.history.pushState(null, null, "/");

  setTimeout(() => {
    document.body.style.overflow = "scroll";
  }, 1000);
};

export const getScream = (screamId, coordinates) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios
    .get(`/scream/${screamId}`)
    .then((res) => {
      dispatch({
        type: SET_SCREAM,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
      dispatch((window.location = "#" + coordinates));
    })

    .catch((err) => console.log(err));
};
// Post a scream
export const postScream = (newScream, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/postScream", newScream)
    .then((res) => {
      dispatch({
        type: POST_SCREAM,
        payload: res.data,
      });

      setTimeout(() => {
        const project =
          window.location.pathname.indexOf("_") > 0
            ? window.location.pathname.substring(1)
            : "";

        if (project.indexOf("_") > 0) {
          dispatch(openProject(project));
        } else {
          history.push(`/${res.data.screamId}`);
          const screamId = res.data.screamId;
          dispatch(openScream(screamId));
        }
      }, 20);

      dispatch(clearErrors());
    })

    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const editScream = (editScream, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  const screamId = editScream.screamId;

  axios
    .post(`/editScream/${screamId}`, editScream)
    .then((res) => {
      dispatch({
        type: EDIT_SCREAM,
        payload: res.data,
      });

      dispatch(openScream(screamId));
      dispatch(clearErrors());
    })

    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const adminEditScream = (editScream, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  const screamId = editScream.screamId;

  axios
    .post(`/adminEditScream/${screamId}`, editScream)
    .then((res) => {
      dispatch({
        type: ADMIN_EDIT_SCREAM,
        payload: res.data,
      });

      dispatch(openScream(screamId));
      dispatch(clearErrors());
    })

    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Like a scream

export const likeScream = (screamId) => (dispatch) => {
  axios
    .get(`/scream/${screamId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_SCREAM,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
// Unlike a scream
export const unlikeScream = (screamId) => (dispatch) => {
  axios
    .get(`/scream/${screamId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_SCREAM,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const deleteScream = (screamId) => (dispatch) => {
  axios
    .delete(`/scream/${screamId}`)
    .then(() => {
      dispatch({
        type: DELETE_SCREAM,
        payload: screamId,
      });
    })

    .catch((err) => console.log(err))
    .finally(() => {
      setTimeout(() => {
        window.history.pushState(null, null, "/");
        window.location.reload(false);
        dispatch(clearErrors());
      }, 10);
    });
};

// Get all comments
export const getComments = () => (dispatch) => {
  console.log("getComments...");
  dispatch({ type: LOADING_DATA });
  axios
    .get("/comments")
    .then((res) => {
      console.log("getComments", res);
      dispatch({
        type: SET_COMMENTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_COMMENTS,
        payload: [],
      });
    });
};
export const getComment = (commentId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/comment/${commentId}`)
    .then((res) => {
      dispatch({
        type: SET_COMMENT,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

// Submit a comment
export const submitComment = (screamId, commentData) => (dispatch) => {
  axios
    .post(`/scream/${screamId}/comment`, commentData)
    .then((res) => {
      console.log("res=", res);

      console.log("res after", res);

      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      console.log("error aqui", err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const deleteComment = (commentId) => (dispatch) => {
  axios
    .delete(`/comment/${commentId}`)
    .then(() => {
      dispatch({
        type: DELETE_COMMENT,
        payload: commentId,
      });
      dispatch(clearErrors());
    })
    .catch((err) => console.log(err));
};

export const getUserData = (userHandle) => (dispatch) => {
  // dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch(
        {
          type: SET_SCREAM_USER,
          payload: res.data.user,
        },
        console.log(res.data.user)
      );
    })

    .catch((err) => console.log(err));
  // .catch(() => {
  //   dispatch({
  //     type: SET_SCREAMS,
  //     payload: null,
  //   });
  // });
};

export const submitChat = (project, chatData) => (dispatch) => {
  console.log(project, chatData);
  axios
    .post(`/project/${project}/chatData`, chatData)
    .then((res) => {
      dispatch({
        type: SUBMIT_CHAT,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Get all screams
export const getAllFullScreams = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/fullscreams")
    .then((res) => {
      dispatch({
        type: SET_FULL_SCREAMS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_FULL_SCREAMS,
        payload: [],
      });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const clearLoadingErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_LOADING_ERRORS });
};
