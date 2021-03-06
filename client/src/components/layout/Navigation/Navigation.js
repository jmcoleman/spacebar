import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import "./Navigation.css";

//TODO convert to React components for hamburger to show menu
class Navigation extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { branding } = this.props;

    const authLinks = (
      <React.Fragment>
        <li className="nav-item">
          <Link to="/home" className="nav-link app-color-white">
            <i className="fas fa-home" /> Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to={`/api/profile`} className="nav-link app-color-white">
            <i className="fas fa-user" /> Profile
          </Link>
        </li>

        {/* vertical separator */}
        {/* <div className="vl ml-2 mr-2 app-color-white"></div> */}

        <li onClick={this.onLogoutClick.bind(this)} className="nav-item">
          <Link to="/" className="nav-link app-color-white" id="logout">
            {/* <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: "30px", marginRight: "5px" }}
              title="You must have a Gravatar connected to your email to display an image"
            />{" "} */}
            <i className="fas fa-sign-out-alt" /> Logout
          </Link>
        </li>
      </React.Fragment>
    );

    const guestLinks = (
      <React.Fragment>
        {/* <li className="nav-item ml-2">
          <Link to="/register" className="nav-link app-color-white">
            <div className="btn app-btn-primary">
              <i className="fas fa-user-plus" /> Sign-up
            </div>
          </Link>
        </li>
        <li className="nav-item ml-2">
          <Link to="/login" className="nav-link app-color-white">
            <div className="btn app-btn-primary">
              <i className="fas fa-sign-in-alt" /> Login
            </div>
          </Link>
        </li> */}

        {/* vertical separator */}
        {/* <div className="vl ml-2 mr-2 app-color-white"></div> */}
      </React.Fragment>
    );

    return (
      <nav
        id="main-nav"
        // className="navbar navbar-expand-md app-bg-color-black py-0 px-5 app-color-white"
        className="navbar navbar-custom navbar-expand-md navbar-dark app-bg-color-black"
      >
        {/* branding */}
        <a
          id="brand"
          href="/"
          className="navbar-brand m-0 px-4 py-2 app-color-white"
        >
          <i className="fas fa-rocket fa-lg mr-2 app-color-white" hidden />
          {branding}
        </a>
        <button
          className="navbar-toggler app-border-color-darkgray"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div id="navbarText" className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            {isAuthenticated ? authLinks : guestLinks}

            <li className="nav-item">
              <Link to="/about" className="nav-link app-color-white" id="about">
                <i className="fas fa-question" /> About
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

Navigation.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navigation);
