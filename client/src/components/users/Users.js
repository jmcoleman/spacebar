import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import User from './User';
import { getUsers } from '../../actions/userActions';

class Users extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    const { users } = this.props;
    
    return (
      <React.Fragment>
        {users.map(user => (
          <User key={user._id} user={user} />
        ))}
      </React.Fragment>
    );
  }
}

Users.propTypes = {
  users: PropTypes.array.isRequired,
  getUsers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  users: state.user.users
});

export default connect(
  mapStateToProps,
  { getUsers }
)(Users);
