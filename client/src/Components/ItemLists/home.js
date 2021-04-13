import React, { Component } from "react";
import AddItem from "../AddItem";
import EditItem from "../AddItem/edit.js";
import "../../cssfiles/lists.css";
import { toast } from "react-toastify";
import axios from "axios";

export default class HomeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: "",
      zIndex: "-9999999999",
      paddingBottom: "80px",
      backgroundColor: "rgba(35, 35, 202, 0.8)",
      checked: "#000",
      showEditPage: false,
    };
  }

  displayEditPage = (id) => {
    localStorage.setItem("task_id", id);
    this.setState({
      showEditPage: true,
    });
    console.log("hee");
  };

  getAllTasks = () => {
    axios
      .post("/tasks")
      .then((res) => {
        this.setState({
          tasks: res.data.data,
        });
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  changeHeaderOnScroll = (e) => {
    if (window.scrollY > 30) {
      this.setState({
        zIndex: "9999999999",
        paddingBottom: "10px",
        backgroundColor: "rgb(35, 35, 202)",
      });
    } else {
      this.setState({
        zIndex: "-9999999999",
        paddingBottom: "80px",
        backgroundColor: "rgba(35, 35, 202, 0.8)",
      });
    }
  };

  onCheckTask = (id) => {
    axios
      .put(`/complete/task/${id}`)
      .then((res) => {
        window.location.reload(false);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  deleteTask = (id) => {
    axios
      .delete(`/delete/task/${id}`)
      .then((res) => {
        window.location.reload(false);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    window.addEventListener("scroll", this.changeHeaderOnScroll);
    this.getAllTasks();
  }
  render() {
    const topStyle = {
      zIndex: this.state.zIndex,
      paddingBottom: this.state.paddingBottom,
      backgroundColor: this.state.backgroundColor,
    };

    const showEditStyle = !this.state.showEditPage
      ? { display: "none" }
      : { display: "block" };
    return (
      <div className="lists-page">
        <AddItem />
        <div style={showEditStyle}>
          <EditItem />
        </div>
        <div className="list-header" style={topStyle}>
          <div className="lists-page-top">
            <i className="fa fa-folder icons"></i>
            <br />
            <span>Home</span>
            <br />
            <span>
              {this.state.tasks.length === 0
                ? ""
                : this.state.tasks.map((task) => {
                    let taskcategory = task.category === "Home";
                    return <div>{taskcategory.length}</div>;
                  })}{" "}
              tasks
            </span>
          </div>
        </div>
        {/*  */}
        <div className="lists">
          <div className="container">
            <div className="list-container">
              {/* list */}
              {this.state.tasks.length !== 0 ? (
                this.state.tasks.map((task) => {
                  let taskcategory = task.category === "Home";
                  if (taskcategory) {
                    return (
                      <div className="list" key={task._id}>
                        <div className="flex space-between">
                          <p>
                            {task.complete === false ? "Pending" : "Complete"}
                          </p>
                          <i
                            className="fa fa-arrow-right"
                            onClick={() => this.displayEditPage(task._id)}
                          ></i>
                        </div>
                        <div className="flex space-between align-center">
                          <div>
                            <span
                              className={
                                task.complete === true
                                  ? "complete"
                                  : "incomplete"
                              }
                            >
                              <b>{task.taskname}</b>
                            </span>
                            <br />
                            <div className="flex space-between align-center">
                              <span className="start-date">
                                {task.startdate}
                              </span>
                              <span>{task.endDate}</span>
                            </div>
                            <p
                              className={
                                task.complete === true
                                  ? "complete"
                                  : "incomplete"
                              }
                            >
                              {task.category}
                            </p>
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              className={
                                task.complete === true ? "inactive" : "active"
                              }
                              // checked={this.state.checked}
                              onClick={() => this.onCheckTask(task._id)}
                            />
                            <i
                              className="fa fa-close"
                              onClick={() => this.deleteTask(task._id)}
                            ></i>
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return <div className="text-center"> </div>;
                  }
                })
              ) : (
                <div className="text-center"> </div>
              )}

              {/* end list */}
            </div>
          </div>
          {/* <div className="text-right add-icon">
            <i className="fa fa-plus" onClick={() => this.displayModal()}></i>
          </div> */}
        </div>
      </div>
    );
  }
}
