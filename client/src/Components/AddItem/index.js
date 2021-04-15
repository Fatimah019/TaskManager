import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../cssfiles/lists.css";
import { toast } from "react-toastify";
import axios from "axios";

export default class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskname: "",
      taskPlan: "",
      taskstartdate: "",
      endDate: "",
      category: "",
      tasks: [],
      showModal: false,
    };
  }

  displayModal = () => {
    this.setState({
      showModal: true,
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

  submit = () => {
    const newItem = {
      taskname: this.state.taskname,
      startdate: this.state.taskstartdate,
      endDate: this.state.endDate,
      category: this.state.category,
      textPlan: this.state.taskPlan,
    };
    let id = localStorage.getItem("user_id");
    axios
      .post(`/new/task/${id}`, newItem)
      .then((res) => {
        this.setState({
          tasks: this.state.tasks.push(res.data.data),
        });
        window.location.reload(false);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        <Modal show={this.state.showModal} onHide={this.exitModal}>
          <Modal.Body>
            <div className="text-center">
              <p>
                <b>Add An Item</b>
              </p>
            </div>
            <form>
              <label>
                <input
                  type="text"
                  placeholder="Task"
                  name="taskname"
                  className="text-name"
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
                  name="textPlan"
                  value={this.state.textPlan}
                  onChange={this.handleInputChange}
                ></textarea>
              </label>
              <br />
              <label className="flex align-center space-between start-end-form ">
                <div>
                  <span>Start</span>
                  <input
                    type="date"
                    placeholder="Start Date"
                    name="taskstartdate"
                    value={this.state.taskstartdate}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div>
                  <span>End</span>
                  <input
                    type="date"
                    placeholder="End Date"
                    name="endDate"
                    value={this.state.endDate}
                    onChange={this.handleInputChange}
                  />
                </div>
              </label>
              <br />
              <label className="flex align-center space-between">
                <i className="fa fa-pencil"></i>
                <select
                  name="category"
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
                  onClick={() => this.submit()}
                >
                  Add
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>

        <div className="text-right add-icon">
          <i className="fa fa-plus" onClick={() => this.displayModal()}></i>
        </div>
      </div>
    );
  }
}
