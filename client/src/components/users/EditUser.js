import React, { Component } from 'react';
import TextInputGroup from '../layout/TextInputGroup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser, updateUser } from '../../actions/userActions';
import moment from 'moment';

class EditUser extends Component {
  state = {
    _id: '',
    name: '',
    gender: '',
    birthday: '',
    location: '',
    photo: '',
    bio: '',
    errors: {}
  };

  componentWillReceiveProps(nextProps, nextState) {
    const { _id, name, gender, birthday, location, photo, bio } = nextProps.user;
    this.setState({
      _id,
      name,
      gender,
      birthday,
      location,
      photo,
      bio
    });
  }

  componentDidMount() {
    if (this.props.match.params) {
      const { id } = this.props.match.params;
      this.props.getUser(id);
    } else {
      // TODO this.props.auth.email ??  no id avail

    }
  }

  onSubmit = e => {
    e.preventDefault();

    const { _id, name, gender, birthday, location, photo, bio } = this.state;
    console.log("in edituser");
    console.log(this.state);

    // Check For Errors
    if (_id === '') {
      this.setState({ errors: { _id: '_id is required' } });
      return;
    }

    if (name === '') {
      this.setState({ errors: { name: 'Name is required' } });
      return;
    }

    const { id } = this.props.match.params;

    const updUser = {
      _id: id,
      name,
      gender,
      birthday,
      location,
      photo,
      bio
    };

    this.props.updateUser(updUser);

    // Clear State
    this.setState({
      _id: '',
      name: '',
      gender: '',
      birthday: '',
      location: '0001-01-01T00:00:00',
      photo: '',
      bio: '',
      errors: {}
    });

    this.props.history.push('/');
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  // return in utc to convert the date from the offset provided to UTC
  formatDate = (date) => moment.utc(date).format('MM/DD/YYYY');

  render() {
    const { _id, name, gender, birthday, location, photo, bio, errors } = this.state;
    console.log(_id);

    return (
      <div className="card mb-3 edit-page mx-5 mb-4 mt-0">
        <div className="card-header display-4">Edit User</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
          {/* type='hidden' */}
          {/* <TextInputGroup
              label="_Id"
              name="_id"
              placeholder="Enter _Id"
              value={_id}
              onChange={this.onChange}
              error={errors._id}
            /> */}
            <TextInputGroup
              label="Name"
              name="name"
              placeholder="Enter Name"
              value={name || ''}
              onChange={this.onChange}
              error={errors.name}
            />
            <TextInputGroup
              label="Gender"
              name="gender"
              type="gender"
              placeholder="Enter Gender"
              value={gender || ''}
              onChange={this.onChange}
              error={errors.gender}
            />
            <TextInputGroup
              label="Birthday"
              name="birthday"
              placeholder="Enter Birthday"
              value={this.formatDate(birthday) || ''}
              onChange={this.onChange}
              error={errors.birthday}
            />
            <TextInputGroup
              label="Location"
              name="location"
              placeholder="Enter Location"
              value={location || ''}
              onChange={this.onChange}
              error={errors.location}
            />
            <TextInputGroup
              label="Photo"
              name="photo"
              placeholder="Enter Photo Url"
              value={photo || ''}
              onChange={this.onChange}
              error={errors.photo}
            />
            <TextInputGroup
              label="Bio"
              name="bio"
              placeholder="Enter Bio"
              value={bio || ''}
              onChange={this.onChange}
              error={errors.bio}
            />
            <input
              type="submit"
              value="Update User"
              className="btn app-btn-primary app-btn-bg-white app-btn-border-primary btn-block btn-lg"
            />
          </form>
        </div>
      </div>
    );
  }
}

EditUser.propTypes = {
  user: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user.user
});

export default connect(
  mapStateToProps,
  { getUser, updateUser }
)(EditUser);
