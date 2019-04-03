import React, { Component } from "react";
import TextInputGroup from "../layout/TextInputGroup";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getArticle, updateArticle } from "../../actions/articleActions";
import moment from "moment";

class EditArticle extends Component {
  state = {
    _id: "",
    title: "",
    author: "",
    summary: "",
    date: "",
    url: "",
    comments: [],
    errors: {}
  };

  componentWillReceiveProps(nextProps, nextState) {
    const {
      _id,
      title,
      author,
      summary,
      date,
      url,
      comments
    } = nextProps.article;
    this.setState({
      _id,
      title,
      author,
      summary,
      date,
      url,
      comments
    });
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getArticle(id);
  }

  onSubmit = e => {
    e.preventDefault();

    const { _id, title, author, summary, date, url, comments } = this.state;

    // Check For Errors
    if (_id === "") {
      this.setState({ errors: { _id: "_id is required" } });
      return;
    }

    if (title === "") {
      this.setState({ errors: { title: "Title is required" } });
      return;
    }

    if (author === "") {
      this.setState({ errors: { author: "Author is required" } });
      return;
    }

    if (summary === "") {
      this.setState({ errors: { summary: "Summary is required" } });
      return;
    }

    if (date === "") {
      this.setState({ errors: { date: "Date is required" } });
      return;
    }

    if (url === "") {
      this.setState({ errors: { url: "Url is required" } });
      return;
    }

    const { id } = this.props.match.params;

    const updArticle = {
      _id: id,
      title,
      author,
      summary,
      date,
      url,
      comments
    };

    this.props.updateArticle(updArticle);

    // Clear State
    this.setState({
      _id: "",
      title: "",
      author: "",
      summary: "",
      date: "0001-01-01T00:00:00",
      url: "",
      comments: [],
      errors: {}
    });

    // changed from / jmc
    this.props.history.push("/home");
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  // return in utc to convert the date from the offset provided to UTC
  formatDate = date => moment.utc(date).format("MM/DD/YYYY");

  render() {
    const { _id, title, author, summary, date, url, errors } = this.state;
    console.log(_id);
    console.log(date);

    return (
      <div className="card mb-3 edit-page mx-5 mb-4 mt-0">
        <div className="card-header display-4">Edit Article</div>
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
              label="Title"
              name="title"
              placeholder="Enter Title"
              value={title}
              onChange={this.onChange}
              error={errors.title}
            />
            <TextInputGroup
              label="Author"
              name="author"
              type="author"
              placeholder="Enter Author"
              value={author}
              onChange={this.onChange}
              error={errors.author}
            />
            <TextInputGroup
              label="Summary"
              name="summary"
              placeholder="Enter Summary"
              value={summary}
              onChange={this.onChange}
              error={errors.summary}
            />
            {/* <TextInputGroup
              label="Date"
              name="date"
              placeholder="Enter Date"
              value={this.formatDate(date)}
              onChange={this.onChange}
              error={errors.date}
            /> */}
            <TextInputGroup
              label="Url"
              name="url"
              placeholder="Enter Url"
              value={url}
              onChange={this.onChange}
              error={errors.url}
            />
            {/* TODO add comments component */}
            <input
              type="submit"
              value="Update Article"
              className="btn app-btn-primary app-btn-bg-white app-btn-border-primary btn-block btn-lg"
            />
          </form>
        </div>
      </div>
    );
  }
}

EditArticle.propTypes = {
  article: PropTypes.object.isRequired,
  getArticle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  article: state.article.article
});

export default connect(
  mapStateToProps,
  { getArticle, updateArticle }
)(EditArticle);
