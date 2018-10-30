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
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Connection Hub</h1>
                <p className="lead">
                  {" "}
                  Discover what's trending, chat, connect, and post with those
                  you collaborate with most
                </p>
                <hr />
                <Link
                  id="btn-signup"
                  to="/register"
                  className="btn btn-lg app-btn-bg-primary text-white mr-2"
                >
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-light ml-2">
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
