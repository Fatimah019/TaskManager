import React, { Component } from "react";
import AddItem from "../AddItem";
import "../../cssfiles/lists.css";
import { toast } from "react-toastify";
import axios from "axios";

export default class AllList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: "",
      zIndex: "-9999999999",
      paddingBottom: "80px",
      backgroundColor: "rgba(35, 35, 202, 0.8)",
    };
  }

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

    return (
      <div className="lists-page">
        <AddItem />

        <div className="list-header" style={topStyle}>
          <div className="lists-page-top">
            <i className="fa fa-folder icons"></i>
            <br />
            <span>All</span>
            <br />
            <span>{this.state.tasks.length} tasks</span>
          </div>
        </div>
        {/*  */}
        <div className="lists">
          <div className="container">
            <div className="list-container">
              {/* list */}

              {this.state.tasks.length !== 0 ? (
                this.state.tasks.map((task) => {
                  return (
                    <div className="list" key={task._id}>
                      <p>{task.complete === false ? "Pending" : "Complete"}</p>
                      <div className="flex space-between align-center">
                        <div>
                          <span>
                            <b>{task.taskname}</b>
                          </span>
                          <br />
                          <div className="flex space-between align-center">
                            <span>{task.startdate}</span>
                            <span>{task.endDate}</span>
                          </div>
                          <p>{task.category}</p>
                        </div>
                        <div>
                          <input type="checkbox" />
                          <i className="fa fa-close"></i>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center">
                  <h3>No Task Has Been Created</h3>
                </div>
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
