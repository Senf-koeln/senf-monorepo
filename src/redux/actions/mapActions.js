/** @format */
import { SET_MAP_BOUNDS, SET_MAP_VIEWPORT } from "../types";

export const setMapViewport = (viewport) => (dispatch) => {
  dispatch({
    type: SET_MAP_VIEWPORT,
    payload: viewport,
  });
};

export const setMapBounds = (bounds) => (dispatch) => {
  // var metersPerPx =
  //   (156543.03392 * Math.cos((viewport.latitude * Math.PI) / 180)) /
  //   Math.pow(2, viewport.zoom);

  // var Addnew = metersPerPx / boundAdds[0];
  // var Addnewtop = metersPerPx / boundAdds[1];
  // var AddnewRight = metersPerPx / boundAdds[2];
  // var AddnewBottom = metersPerPx / boundAdds[3];

  // const bounds = {
  //   latitude1: viewport.latitude + Addnewtop,
  //   latitude2: viewport.latitude - AddnewBottom,
  //   longitude2: viewport.longitude - Addnew,
  //   longitude3: viewport.longitude + AddnewRight,
  // };

  const newBounds = {
    latitude1: bounds[0][1],
    latitude2: bounds[1][1],
    longitude2: bounds[0][0],
    longitude3: bounds[1][0],
  };

  dispatch({
    type: SET_MAP_BOUNDS,
    payload: newBounds,
  });
};

export const setResetMapBounds = (bounds) => (dispatch) => {
  dispatch({
    type: SET_MAP_BOUNDS,
    payload: bounds,
  });
};
