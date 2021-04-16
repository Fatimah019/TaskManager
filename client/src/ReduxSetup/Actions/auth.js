import * as actionTypes from "./types";
import axios from "axios";
import { toast } from "react-toastify";
import swal from "sweetalert";

export const handleSignUp = ({ email, username, password }) => (dispatch) => {
  axios
    .post("/signup", {
      email,
      username,
      password,
    })
    .then((res) => {
      dispatch({
        type: actionTypes.SIGNUP,
      });
      // console.log(res.data);
      if (res.data.status === false) {
        toast.error(res.data.message);
      } else {
        window.location.replace("/continue");
        toast.success(res.data.message);
        // console.log(res.data);
      }
    })
    .catch((error) => {
      toast.error("Try Again!");
    });
};

export const handleLogin = ({ email, password }) => (dispatch) => {
  axios
    .post("/login", {
      email,
      password,
    })
    .then((res) => {
      dispatch({
        type: actionTypes.LOGIN,
      });

      if (res.data.status === false) {
        toast.error(res.data.message);
      } else {
        window.location.replace("/");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_id", res.data.data.id);
      }
      // console.log(res.data);
    })
    .catch((error) => {
      toast.error(error);
    });
};

export const logout = () => (dispatch) => {
  dispatch({
    type: actionTypes.LOGOUT,
  });
  swal("Are your sure you want to Logout?", {
    buttons: {
      no: {
        text: "cancel",
      },
      yes: {
        text: "Logout",
      },
    },
  }).then((value) => {
    switch (value) {
      case "yes":
        localStorage.clear();
        window.location.replace("/continue");
        break;
      case "no":
        window.location.reload(false);
        break;
      default:
        swal("Logged Out Successfully!");
    }
  });
};
