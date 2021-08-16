/** @format */

import {
  ADD_SCREAMS,
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  DELETE_SCREAM,
  SET_COMMENTS,
  SET_COMMENT,
  DELETE_COMMENT,
  POST_SCREAM,
  EDIT_SCREAM,
  ADMIN_EDIT_SCREAM,
  SET_SCREAM,
  SUBMIT_COMMENT,
  ADD_ALL_COMMENTS,
  SET_ALL_COMMENTS,
  ADD_ALL_LIKES,
  SET_ALL_LIKES,
  LOADING_PROJECTS_DATA,
  SET_PROJECTS,
  SET_PROJECT_SCREAMS,
  LOADING_PROJECT_SCREAMS,
  SET_MY_SCREAMS,
  LOADING_MY_SCREAMS,
  SUBMIT_CHAT,
  SET_SCREAM_USER,
  SET_FULL_SCREAMS,
} from "../types";

const initialState = {
  projects: [],
  projectScreams: [],
  loadingProjectScreams: false,

  myScreams: [],
  loadingMyScreams: false,

  screams: [],
  scream: {},

  comments: [],
  comment: {},
  likes: [],
  like: {},

  loading: false,

  loadingProjects: false,
  scream_user: {},

  full_screams: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case ADD_SCREAMS:
      return {
        ...state,
        screams: [...state.screams, ...action.payload],
        loading: false,
      };
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false,
      };
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload,
      };

    case SET_SCREAM_USER:
      return {
        ...state,
        scream_user: action.payload,
      };

    case ADD_ALL_COMMENTS:
      return {
        ...state,
        comments: [...state.comments, ...action.payload],
        loading: false,
      };

    case SET_ALL_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        loading: false,
      };

    case ADD_ALL_LIKES:
      return {
        ...state,
        likes: [...state.likes, ...action.payload],
        loading: false,
      };

    case SET_ALL_LIKES:
      return {
        ...state,
        likes: action.payload,
        loading: false,
      };

    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      let index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;
      if (state.scream.screamId === action.payload.screamId) {
        state.scream = action.payload;
      }
      return {
        ...state,
      };
    case DELETE_SCREAM:
      index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload
      );
      state.screams.splice(index, 1);
      return {
        ...state,
      };

    case SET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        loading: false,
      };
    case SET_COMMENT:
      return {
        ...state,
        comment: action.payload,
      };

    case DELETE_COMMENT:
      const listComments = state.scream.comments.filter(
        (comment) => comment.commentId !== action.payload
      );
      state.scream.comments = listComments;
      return {
        ...state,
      };

    case POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams],
      };

    case EDIT_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams],
      };

    case ADMIN_EDIT_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams],
      };

    case SUBMIT_COMMENT:
      return {
        ...state,
        scream: {
          ...state.scream,
          comments: [action.payload, ...state.scream.comments],
        },
      };

    case LOADING_PROJECTS_DATA:
      return {
        ...state,
        loadingProjects: true,
      };

    case SET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        loadingProjects: false,
      };

    case SET_PROJECT_SCREAMS:
      return {
        ...state,
        project: action.payload,
        // projectScreams: action.payload,
        // loadingProjectScreams: false,
      };

    case LOADING_PROJECT_SCREAMS:
      return {
        ...state,
        loadingProjectScreams: true,
      };

    case SET_MY_SCREAMS:
      return {
        ...state,
        myScreams: action.payload,
        loadingMyScreams: false,
      };

    case LOADING_MY_SCREAMS:
      return {
        ...state,
        loadingMyScreams: true,
      };

    case SUBMIT_CHAT:
      return {
        ...state,
        project: {
          ...state.project,
          chat: [action.payload, ...state.project.comments],
        },
      };

    case SET_FULL_SCREAMS:
      return {
        ...state,
        full_screams: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
