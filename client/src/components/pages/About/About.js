import React from "react";
import "./About.css";

export default () => {
  return (
    <div id="about-page" className="container">
      <div className="row">
        <div className="col" />
        <div className="col-12">
          <h1 className="display-4 mt-5 mb-3">About SpaceBar</h1>
          <p className="lead">The Social Media Site to Connect</p>
          <p>
            SpaceBar Connector Hub is a networking tool for any group to
            connect, exchange ideas, and stay current on interests and trends.
            Connector Hub allows teams to access timely and relevent content and
            provide interactive experiences.
          </p>
        </div>
        <div className="col" />
      </div>
      <div className="row mt-3">
        <div className="col" />
        <div className="col-4 text-center mt-2">
          <h4>Features</h4>
          <ul
            id="feature-list"
            className="text-left fa-ul list-group list-group-flush"
          >
            <li className="list-group-item app-bg-color-white">
              <i className="fa-li fa fa-check app-color-success " />
              User Authentication
            </li>
            <li className="list-group-item app-bg-color-white">
              <i className="fa-li fa fa-check app-color-success" />
              Customizable Profiles
            </li>
            <li className="list-group-item app-bg-color-white">
              <i className="fa-li fa fa-check app-color-success" />
              Latest News
            </li>
            <li className="list-group-item app-bg-color-white">
              <i className="fa-li fa fa-check app-color-success" />
              Blogging
            </li>
            <li className="list-group-item app-bg-color-white">
              <i className="fa-li fa fa-check app-color-success" />
              Chat
            </li>
            <li className="list-group-item app-bg-color-white">
              <i className="fa-li fa fa-check app-color-success" />
              Responsive Design
            </li>
          </ul>
        </div>
        <div className="col" />
      </div>
    </div>
  );
};
