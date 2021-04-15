import React, { Component } from "react";
import "../../cssfiles/lists.css";
import { toast } from "react-toastify";
import axios from "axios";

export default class EditItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskname: "",
      taskPlan: "",
      taskstartdate: "",
      endDate: "",
      category: "",
      tasks: [],
      complete: false,
      showModal: false,
      disabled: true,
    };
  }

  enableEdit = () => {
    this.setState({
      disabled: false,
    });
  };

  exitModal = () => {
    this.setState({
      showModal: false,
    });
  };

  //handle input for multiple fields
  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  getATask = (id) => {
    axios
      .post(`/task/${id}`)
      .then((res) => {
        this.setState({
          taskname: res.data.data.taskname,
          taskstartdate: res.data.data.taskstartdate,
          endDate: res.data.data.endDate,
          category: res.data.data.category,
          taskPlan: res.data.data.taskPlan,
        });
        if (res.data.data.complete === true) {
          this.setState({
            complete: true,
          });
        }
        // console.log(res.data);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  editTask = (newTask) => {
    let id = localStorage.getItem("task_id");
    axios
      .request({
        method: "put",
        url: "/edit/task/" + id,
        data: newTask,
      })
      .then(() => {
        window.location.reload(false);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  onSubmit = (e) => {
    const newTask = {
      taskname: this.refs.taskname.value,
      taskstartdate: this.refs.taskstartdate.value,
      endDate: this.refs.endDate.value,
      category: this.refs.category.value,
      taskPlan: this.refs.taskPlan.value,
    };
    this.editTask(newTask);
    window.location.reload(false);
  };

  closeEdit = () => {
    window.location.reload(false);
  };
  componentDidMount() {
    window.scrollTo(0, 0);
    this.getATask(localStorage.getItem("task_id"));
  }

  render() {
    let editBtnStyle = !this.state.disabled
      ? { display: "block" }
      : { display: "none" };
    let enableStyle = this.state.disabled ? "disabled" : "";
    let checkCompleteTask = !this.state.complete
      ? { display: "block" }
      : { display: "none" };
    return (
      <div className="edit-box">
        {/* <Modal>
          <Modal.Body> */}
        <div className="edit-box-inner">
          <div className="text-right">
            <i className="fa fa-close" onClick={() => this.closeEdit()}></i>
          </div>
          <div className="flex space-between">
            <p>
              <b>Your Task</b>
            </p>
            <i className="fa fa-pencil" onClick={() => this.enableEdit()}>
              Edit
            </i>
          </div>
          <form>
            <label>
              <input
                type="text"
                placeholder="Task"
                name="taskname"
                ref="taskname"
                className="text-name"
                disabled={enableStyle}
                value={this.state.taskname}
                onChange={this.handleInputChange}
              />
            </label>
            <br />
            <label>
              <textarea
                rows="3"
                placeholder="What are you planning"
                className="text-plan"
                name="taskPlan"
                ref="taskPlan"
                value={this.state.taskPlan}
                disabled={enableStyle}
                onChange={this.handleInputChange}
              ></textarea>
            </label>
            <br />
            <label className="date-start">
              <div>
                <p>Start</p>
                <input
                  type="date"
                  placeholder="Start Date"
                  name="taskstartdate"
                  ref="taskstartdate"
                  value={this.state.taskstartdate}
                  disabled={enableStyle}
                  onChange={this.handleInputChange}
                />
              </div>
              <div>
                <p>End</p>
                <input
                  type="date"
                  placeholder="End Date"
                  name="endDate"
                  ref="endDate"
                  disabled={enableStyle}
                  value={this.state.endDate}
                  onChange={this.handleInputChange}
                />
              </div>
            </label>
            <br />
            <label className="flex align-center space-between">
              <select
                name="category"
                ref="category"
                disabled={enableStyle}
                value={this.state.category}
                onChange={this.handleInputChange}
              >
                <option>Category</option>
                <option>Study</option>
                <option>Home</option>
                <option>Travel</option>
                <option>Music</option>
                <option>Work</option>
              </select>
            </label>
            <br />
            {/* add note */}

            {/* submit */}
            <div className="text-right">
              <button
                type="button"
                className="add-btn"
                style={editBtnStyle}
                onClick={() => this.onSubmit()}
              >
                Edit
              </button>
            </div>
          </form>
        </div>
        {/* </Modal.Body>
        </Modal> */}
      </div>
    );
  }
}
