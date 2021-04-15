import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { handleLogin } from "../../ReduxSetup/Actions/auth";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../cssfiles/auth.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      spinLogin: "Continue",
    };
  }

  //handle input for multiple fields
  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  loadSpinner = (spinLogin) => {
    this.setState({
      spinLogin,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.handleLogin(this.state);
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    const { email, password } = this.state;
    return (
      <div className="auth-container flex justify-content-center align-center">
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
              Continue
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
              value={this.state.spinLogin}
              className="auth-btn"
              onClick={() => this.loadSpinner("Loading...")}
            />
            <br />

            <div>
              <p>
                Don't have an account?{" "}
                <Link to="/create" className="links">
                  Create
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { handleLogin })(withRouter(Login));
