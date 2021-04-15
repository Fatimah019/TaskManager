import * as actionTypes from "./types";
import axios from "axios";
import { toast } from "react-toastify";

let id = localStorage.getItem("user_id");
// fetch user info
export const fetchUser = () => (dispatch) => {
  axios
    .post(`/user/${id}`)
    .then((response) => {
      dispatch({
        type: actionTypes.GET_USER,
        payload: response.data.data,
      });
      console.log(response.data);
    })
    .catch((err) => {
      toast.error(err);
    });
};
