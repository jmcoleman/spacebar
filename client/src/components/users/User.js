import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUser, deleteUser } from "../../actions/userActions";
import moment from "moment";

class User extends Component {
  state = {
    // showUserInfo: false,
  };

  componentDidMount() {
    this.props.getUser();
  }

  onDeleteClick = id => {
    this.props.deleteUser(id);
  };

  handleBtnClick = () => {};

  // return in utc to convert the date from the offset provided to UTC
  formatDate = date => moment.utc(date).format("MM/DD/YYYY");

  render() {
    // const { showUserInfo } = this.state;
    // const { user: auth_user } = this.props.auth;
    const { user } = this.props.user;

    return (
      <div className="card card-body mb-3">
        <h5 className="text-left">
          {user.name}

          {/* toggle the user detail */}
          <i
            className="fas fa-caret-down ml-2"
            style={{ cursor: "pointer" }}
            // onClick={() =>
            //   this.setState({
            //     showUserInfo: !this.state.showUserInfo
            //   })
            // }
          />

          {/* delete the user from the mongo store */}
          <i
            className="fas fa-times app-color-danger"
            style={{ cursor: "pointer", float: "right" }}
            onClick={this.onDeleteClick.bind(this, user.id)}
          />

          {/* link to edit the user */}
          <Link to={`api/users/edit/${user.id}`}>
            <i
              className="fa fa-pencil-alt app-color-primary"
              style={{ cursor: "pointer", float: "right", marginRight: "1rem" }}
            />
          </Link>
        </h5>

        {/* TODO style this */}
        <p>
          {user.email}
          {/* {gender}
          {birthday}
          {location}
          {photo} */}
        </p>

        {/* <small className="text-left text-muted">By {author}, {this.formatDate(date)}</small> */}

        {/* {showUserInfo ? (
          <div id="user-detail-section"> 
            <hr></hr>
            <p className="card-text">{bio}</p>
            <div className="mt-auto">
              <p className="text-left mb-1">
                Create Date 
                <span id="comment-length-{id}">{this.formatDate(date)}</span>
              </p>
            </div>
          </div>
        ) : null} */}
      </div>
    );
  }
}

User.propTypes = {
  user: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
});

export default connect(
  mapStateToProps,
  { getUser, deleteUser }
)(User);
