import { combineReducers } from "redux";
import auth from "./auth";
import user from "./user";
import tasks from "./tasks";

const rootReducer = combineReducers({
  auth: auth,
  user: user,
  tasks: tasks,
});
export default rootReducer;
