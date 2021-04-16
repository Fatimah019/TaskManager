import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../cssfiles/home.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../../ReduxSetup/Actions/user";
import { logout } from "../../ReduxSetup/Actions/auth";
import { fetchTasks } from "../../ReduxSetup/Actions/tasks";
import { Link } from "react-router-dom";
import AddItem from "../AddItem";

class Home extends Component {
  componentDidMount() {
    this.props.fetchUser(this.state);
    this.props.fetchTasks(this.state);
    window.scrollTo(0, 0);
  }
  logOut = () => {
    this.props.logout(this.state);
  };
  render() {
    return (
      <div className="container-fluid home">
        <AddItem />
        <div className="container header flex space-between align-center">
          {/* <i className="fa fa-bars"></i> */}
          {/* <h5>TaskManger</h5> */}
          <p>{this.props.user.username}</p>
          <pre onClick={() => this.logOut()} className="logout">
            Logout
          </pre>
        </div>
        <div className="main">
          <p>
            <b>Categories</b>
          </p>
          <div className="main-category">
            <Link to="/all" className="category-list">
              <div className="categories">
                <div>
                  <i className="fa fa-folder"></i>
                </div>
                <br />
                <span>All</span>
                <br />
                <span>
                  {" "}
                  {this.props.tasks.length !== 0
                    ? this.props.tasks.data.length + " "
                    : 0 + " "}
                </span>
                <span>Tasks</span>
              </div>
            </Link>
            <Link to="/work" className="category-list">
              <div className="categories">
                <div>
                  <i className="fa fa-envelope"></i>
                </div>
                <br />
                <span>Work</span>
                <br />
                <span></span>
                <span>Tasks</span>
              </div>
            </Link>
            <Link to="/home" className="category-list">
              <div className="categories">
                <div>
                  <i className="fa fa-home"></i>
                </div>
                <br />
                <span>Home</span>
                <br />
                <span></span>
                <span>Tasks</span>
              </div>
            </Link>
            <Link to="/music" className="category-list">
              <div className="categories">
                <div>
                  <i className="fa fa-music"></i>
                </div>
                <br />
                <span>Music</span>
                <br />
                <span></span>
                <span>Tasks</span>
              </div>
            </Link>
            <Link to="/study" className="category-list">
              <div className="categories">
                <div>
                  <i className="fa fa-book"></i>
                </div>
                <br />
                <span>Study</span>
                <br />
                <span></span>
                <span>Tasks</span>
              </div>
            </Link>
            <Link to="/travel" className="category-list">
              <div className="categories">
                <div>
                  <i className="fa fa-plane"></i>
                </div>
                <br />
                <span>Travel</span>
                <br />
                <span></span>
                <span>Tasks</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  tasks: state.tasks.tasks,
});

export default connect(mapStateToProps, { fetchUser, fetchTasks, logout })(
  withRouter(Home)
);
