// react and redux
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
// components
import InputGroup from "../layout/InputGroup";
import TextFieldGroup from "../layout/TextFieldGroup";
import TextAreaFieldGroup from "../layout/TextAreaFieldGroup";
import SelectListGroup from "../layout/SelectListGroup";
// actions
import {
  getCurrentUserProfile,
  createUserProfile
} from "../../actions/userprofileActions";
// utils
import isEmpty from "../../validation/is-empty";
import moment from "moment";

class EditUserProfile extends Component {
  state = {
    // id: "",
    // user: {}, // name, email, password, avatar, date
    handle: "",
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    bio: "",
    gender: "",
    // birthday: "0001-01-01T00:00:00",
    githubusername: "",
    // experience: [],
    // education: [],
    // social: {},
    // date: "0001-01-01T00:00:00",
    errors: {}
  };

  ////////////////////////
  // lifecycle methods
  ////////////////////////
  componentDidMount() {
    this.props.getCurrentUserProfile();
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.userprofile.userprofile) {
      const userprofile = nextProps.userprofile.userprofile;

      // Bring skills array back to CSV
      const skillsCSV = userprofile.skills.join(",");

      // If profile field doesnt exist, make empty string
      userprofile.company = !isEmpty(userprofile.company)
        ? userprofile.company
        : "";
      userprofile.website = !isEmpty(userprofile.website)
        ? userprofile.website
        : "";
      userprofile.location = !isEmpty(userprofile.location)
        ? userprofile.location
        : "";
      userprofile.githubusername = !isEmpty(userprofile.githubusername)
        ? userprofile.githubusername
        : "";
      userprofile.bio = !isEmpty(userprofile.bio) ? userprofile.bio : "";
      userprofile.social = !isEmpty(userprofile.social)
        ? userprofile.social
        : {};
      userprofile.twitter = !isEmpty(userprofile.social.twitter)
        ? userprofile.social.twitter
        : "";
      userprofile.facebook = !isEmpty(userprofile.social.facebook)
        ? userprofile.social.facebook
        : "";
      userprofile.linkedin = !isEmpty(userprofile.social.linkedin)
        ? userprofile.social.linkedin
        : "";
      userprofile.youtube = !isEmpty(userprofile.social.youtube)
        ? userprofile.social.youtube
        : "";
      userprofile.instagram = !isEmpty(userprofile.social.instagram)
        ? userprofile.social.instagram
        : "";

      this.setState({
        // id,
        // user, // name, email, password, avatar, date
        handle: userprofile.handle,
        company: userprofile.company,
        website: userprofile.website,
        location: userprofile.location,
        status: userprofile.status,
        skills: skillsCSV,
        bio: userprofile.bio,
        gender: userprofile.gender,
        // birthday,
        githubusername: userprofile.githubusername,
        // experience,
        // education,
        // social,
        // date,
        twitter: userprofile.twitter,
        facebook: userprofile.facebook,
        linkedin: userprofile.linkedin,
        youtube: userprofile.youtube,
        instagram: userprofile.instagram
      });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const userprofileData = {
      // id,
      // user, // name, email, password, avatar, date
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      bio: this.state.bio,
      gender: this.state.gender,
      // birthday,
      githubusername: this.state.githubusername,
      // experience,
      // education,
      // social,
      // date
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    this.props.createUserProfile(userprofileData, this.props.history);
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  // return in utc to convert the date from the offset provided to UTC
  formatDate = date => moment.utc(date).format("MM/DD/YYYY");

  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />

          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />

          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />

          <InputGroup
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      );
    }

    // Select options for status
    const options = [
      { label: "* Select Professional Status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student or Learning", value: "Student or Learning" },
      { label: "Instructor or Teacher", value: "Instructor or Teacher" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Profile</h1>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname"
                />
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                  info="Give us an idea of where you are at in your career"
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Could be your own company or one you work for"
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Could be your own website or a company one"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City or city & state suggested (eg. Boston, MA)"
                />
                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP"
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info="If you want your latest repos and a Github link, include your username"
                />
                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditUserProfile.propTypes = {
  createUserProfile: PropTypes.func.isRequired,
  getCurrentUserProfile: PropTypes.func.isRequired,
  userprofile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  userprofile: state.userprofile,
  errors: PropTypes.object.isRequired
});

export default connect(
  mapStateToProps,
  { getCurrentUserProfile, createUserProfile }
)(withRouter(EditUserProfile));
