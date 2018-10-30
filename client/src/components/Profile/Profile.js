import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentUserProfile } from "../../actions/userprofileActions";
import "./Profile.css";

var user = {
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

class UserProfile extends Component {
  componentDidMount() {
    this.props.getCurrentUserProfile();

    // if (this.props.auth.isAuthenticated) {
    //   const { name, avatar } = this.props.auth.user;
    //   const { gender, birthday, location, bio } = this.props.profile;

    //   // user data
    //   user.basicInfo.name = name;
    //   user.basicInfo.avatar = avatar;
    //   // user profile data
    //   user.basicInfo.gender = gender || "";
    //   user.basicInfo.birthday = birthday;
    //   user.basicInfo.location = location;
    //   user.basicInfo.bio = bio;
    // }
  }

  render() {
    // const { errors } = this.state;
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let userProfileContent;

    // if has profile or not TODO
    if (profile === null || loading) {
      console.log("is loading profile...");
      // TODO load profile info

      userProfileContent = <MainPanel info={user.basicInfo} />;
    } else {
      userProfileContent = <MainPanel info={user} />;
    }

    return (
      <div id="user-profile" className="app-border-color-black m-0">
        {userProfileContent}
      </div>
    );
  }
}

UserProfile.propTypes = {
  getCurrentUserProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
  // errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.userprofile
  // errors: state.errors
});

export default connect(
  mapStateToProps,
  { getCurrentUserProfile }
)(UserProfile);
