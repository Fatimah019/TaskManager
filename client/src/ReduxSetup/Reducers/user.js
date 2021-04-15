import * as actionTypes from "../Actions/types";

const initialState = {
  user: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case actionTypes.UPDATE_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
