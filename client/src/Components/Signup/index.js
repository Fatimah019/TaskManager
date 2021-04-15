import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { handleSignUp } from "../../ReduxSetup/Actions/auth";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../cssfiles/auth.css";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      spinSignup: "Create",
    };
  }

  //handle input for multiple fields
  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  loadSpinner = (spinSignup) => {
    this.setState({
      spinSignup,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.handleSignUp(this.state);
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    const { email, username, password } = this.state;
    return (
      <div className="auth-container">
        <div className="auth-form-container">
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            className="toast-container"
          />
          <h3>
            <Link to="/" className="links">
              Create An Account
            </Link>
          </h3>
          <br />
          <form method="post" onSubmit={this.onSubmit}>
            <label className="flex align-center">
              <i class="fa fa-envelope"></i>
              <input
                type="email"
                placeholder="email"
                name="email"
                onChange={this.handleInputChange}
                value={email}
              />
            </label>
            <br />
            <label className="flex align-center">
              <i class="fa fa-user"></i>
              <input
                type="text"
                placeholder="username"
                name="username"
                onChange={this.handleInputChange}
                value={username}
              />
            </label>
            <br />
            <label className="flex align-center">
              <i class="fa fa-key"></i>
              <input
                type="password"
                placeholder="password"
                name="password"
                onChange={this.handleInputChange}
                value={password}
              />
            </label>
            <br />
            <input
              type="submit"
              value={this.state.spinSignup}
              className="auth-btn"
              onClick={() => this.loadSpinner("Creating...")}
            />
            <br />

            <div>
              <p>
                Don't have an account?{" "}
                <Link to="/continue" className="links">
                  Continue
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  handleSignUp: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { handleSignUp })(withRouter(Signup));
