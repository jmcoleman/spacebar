import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div id="landing-page" className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div id="landing-banner-row" className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Connector Hub</h1>
                <p className="lead">
                  {" "}
                  Discover what's trending, chat, connect, and post <br />
                  with those you collaborate with most
                </p>
                <hr className="app-bg-color-darkgray" />
                <Link
                  id="btn-signup"
                  to="/register"
                  className="btn btn-lg app-btn-bg-primary text-white mr-2 mt-4"
                >
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-light ml-2 mt-4">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
