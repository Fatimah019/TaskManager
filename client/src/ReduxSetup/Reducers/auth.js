import * as actionTypes from "../Actions/types";

const initialState = {
  authenticated: localStorage.getItem("token") ? true : false,
  user: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SIGNUP:
      return {
        ...state,
      };
    case actionTypes.LOGIN:
      return {
        ...state,
        authenticated: true,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
      };
    default:
      return state;
  }
}
