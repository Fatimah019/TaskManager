import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../cssfiles/home.css";
import { Link } from "react-router-dom";

export default class Home extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div className="container home">
        <div className="header">
          <i className="fa fa-bars"></i>
        </div>
        <div className="main">
          <h2>Categories</h2>
          <div className="main-category">
            <Link to="/all" className="category-list">
              <div className="categories">
                <div>
                  <i className="fa fa-folder"></i>
                </div>
                <br />
                <span>All</span>
                <br />
                <span>23</span>
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
                <span>23</span>
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
                <span>23</span>
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
                <span>23</span>
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
                <span>23</span>
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
                <span>23</span>
                <span>Tasks</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
