import * as actionTypes from "../Actions/types";

const initialState = {
  task: {},
  tasks: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.CREATE_TASK:
      return {
        ...state,
      };
    case actionTypes.FETCH_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    case actionTypes.FETCH_TASK:
      return {
        ...state,
        task: action.payload,
      };
    case actionTypes.EDIT_TASK:
      return {
        ...state,
        task: action.payload,
      };
    case actionTypes.DELETE_TASK:
      return {
        ...state,
      };
    default:
      return state;
  }
}
