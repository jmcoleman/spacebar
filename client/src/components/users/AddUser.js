import React, { Component } from "react";
import TextInputGroup from "../layout/TextInputGroup";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addUser } from "../../actions/userActions";

class AddUser extends Component {
  state = {
    name: "",
    email: "",
    errors: {}
  };

  onSubmit = e => {
    e.preventDefault();

    const { name, email } = this.state;

    // Check For Errors
    if (name === "") {
      this.setState({ errors: { name: "Name is required" } });
      return;
    }

    if (email === "") {
      this.setState({ errors: { email: "Email is required" } });
      return;
    }

    // if (phone === '') {
    //   this.setState({ errors: { phone: 'Phone is required' } });
    //   return;
    // }

    const newUser = {
      name,
      email
    };

    this.props.addUser(newUser);

    // Clear State
    this.setState({
      name: "",
      email: "",
      errors: {}
    });

    // changed from / jmc
    this.props.history.push("/home");
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, errors } = this.state;

    return (
      <div className="card mb-3">
        <div className="card-header">Add User</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <TextInputGroup
              label="Name"
              name="name"
              placeholder="Enter Name"
              value={name}
              onChange={this.onChange}
              error={errors.name}
            />
            <TextInputGroup
              label="Email"
              name="email"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={this.onChange}
              error={errors.email}
            />
            <input
              type="submit"
              value="Add User"
              className="btn btn-light btn-block"
            />
          </form>
        </div>
      </div>
    );
  }
}

AddUser.propTypes = {
  addUser: PropTypes.func.isRequired
};

export default connect(
  null,
  { addUser }
)(AddUser);
