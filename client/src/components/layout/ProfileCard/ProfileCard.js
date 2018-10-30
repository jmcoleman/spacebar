import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import isEmpty from "../../../validation/is-empty";
import { getCurrentUserProfile } from "../../../actions/userprofileActions";
import moment from "moment";
import "./ProfileCard.css";

class Avatar extends Component {
  render() {
    var image = this.props.image,
      style = {
        width: this.props.width || 50,
        height: this.props.height || 50
      };

    if (!image) return null;

    return (
      <div className="avatar" style={style}>
        <img src={this.props.image} alt="User Profile" />
      </div>
    );
  }
}

class MainPanel extends Component {
  render() {
    var info = this.props.info;

    if (!info) return null;

    return (
      <div className="bg-white">
        <div className="top">
          <Avatar image={info.photo} width={100} height={100} />
          <hr className="app-bg-color-black w-75" />
        </div>

        <div>
          <h2>{info.name}</h2>
          <h3>{info.location}</h3>
        </div>

        <div>
          <p>
            {info.gender} | {info.birthday}
          </p>
        </div>

        <div className="bottom">
          <h4>Biography</h4>
          <p>{info.bio}</p>
        </div>
      </div>
    );
  }
}

class ProfileCard extends Component {
  constructor() {
    super();
    this.state = {
      // errors: {}
    };
  }

  componentDidMount() {
    this.props.getCurrentUserProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  // return in utc to convert the date from the offset provided to UTC
  formatDate = date => moment.utc(date).format("MM/DD/YYYY");
  formatDateLong = date => moment.utc(date).format("MMMM Do, YYYY");

  render() {
    // const { errors } = this.state;
    const { user } = this.props.auth;
    const { profile, loading } = this.props.userprofile;

    let userProfileContent;

    // check if profile has been created
    if (isEmpty(profile) || loading) {
      // load default user when no profile created
      const defaultUser = {
        basicInfo: {
          name: "Jane Doe",
          gender: "Female",
          birthday: "April 3, 1990",
          location: "Los Angeles, CA",
          photo:
            "https://style.anu.edu.au/_anu/4/images/placeholders/person_8x10.png",
          bio:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat fugit quia pariatur est saepe necessitatibus, quibusdam reiciendis ratione voluptate atque in qui provident rem repellat soluta. Blanditiis repellat velit eligendi."
        }
      };

      userProfileContent = <MainPanel info={defaultUser.basicInfo} />;
    } else {
      console.log("=== CURRENT PROFILE ===");
      console.log(profile);

      const profileInfo = {
        name: user.name,
        photo:
          user.avatar ||
          "https://style.anu.edu.au/_anu/4/images/placeholders/person_8x10.png",
        gender: isEmpty(profile.gender) ? "Unknown" : profile.gender,
        birthday: this.formatDateLong(profile.birthday) || "Jan 1, 1900",
        location: isEmpty(profile.location) ? "Atlanta, GA" : profile.location,
        bio: isEmpty(profile.bio) ? "" : profile.bio
      };

      userProfileContent = <MainPanel info={profileInfo} />;
    }

    return (
      <div id="user-profile" className="app-border-color-black m-0">
        {userProfileContent}
      </div>
    );
  }
}

ProfileCard.propTypes = {
  getCurrentUserProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  userprofile: PropTypes.object.isRequired //,
  // errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  userprofile: state.userprofile //,
  // errors: state.errors
});

export default connect(
  mapStateToProps,
  { getCurrentUserProfile }
)(ProfileCard);
