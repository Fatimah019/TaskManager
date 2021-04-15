import * as actionTypes from "./types";
import axios from "axios";
import { toast } from "react-toastify";
import swal from "sweetalert";

let id = localStorage.getItem("user_id");

export const createTask = ({
  taskname,
  taskstartdate,
  endDate,
  taskPlan,
  category,
}) => (dispatch) => {
  let formData = new FormData();

  formData.append("taskname", taskname);
  formData.append("taskPlan", taskPlan);
  formData.append("taskstartdate", taskstartdate);
  formData.append("endDate", endDate);
  formData.append("category", category);

  axios
    .post(`/new/task/${id}`, formData)
    .then((res) => {
      dispatch({
        type: actionTypes.CREATE_TASK,
      });
      res.data.status === false
        ? toast.error(res.data.message)
        : window.location.reload(true);
    })
    .catch((err) => {
      toast.error(err);
    });
};

// fetch tasks
export const fetchTasks = () => (dispatch) => {
  axios
    .post(`/tasks/${id}`)
    .then((response) => {
      dispatch({
        type: actionTypes.FETCH_TASKS,
        payload: response.data,
      });
      // console.log(response.data);
    })
    .catch((err) => {
      toast.error(err);
    });
};

export const fetchTask = (id) => (dispatch) => {
  axios
    .post(`/task/${id}`)
    .then((response) => {
      dispatch({
        type: actionTypes.FETCH_TASK,
        payload: response.data.data,
      });
    })
    .catch((err) => {
      toast.error(err);
    });
};

export const deleteTask = (taskid) => (dispatch) => {
  swal("Are your sure you want to Delete this task?", {
    buttons: {
      no: {
        text: "cancel",
      },
      yes: {
        text: "Delete",
      },
    },
  }).then((value) => {
    switch (value) {
      case "yes":
        axios.delete(`/delete/task/${taskid}`).then((res) => {
          dispatch({
            type: actionTypes.DELETE_TASK,
          });
          swal("Deleted Successfully!");
          window.location.reload(false);
        });
        break;
      case "no":
        window.location.reload(false);
        break;
      default:
        window.location.reload(false);
    }
  });
};

export const completeTask = (taskid) => (dispatch) => {
  swal("You Cannot Edit Task After Clicking Continue", {
    buttons: {
      no: {
        text: "Go Back",
      },
      yes: {
        text: "Continue",
      },
    },
  }).then((value) => {
    switch (value) {
      case "yes":
        axios.put(`/complete/task/${taskid}`).then((res) => {
          dispatch({
            type: actionTypes.COMPLETE_TASK,
          });
          swal("Yay!! Task Completed");
          window.location.reload(false);
        });
        break;
      case "no":
        window.location.reload(false);
        break;
      default:
        window.location.reload(false);
    }
  });
};
