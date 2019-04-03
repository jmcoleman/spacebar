import React, { Component } from "react";

// import Wrapper from "../../layout/Wrapper";
// import Articles from '../../articles/Articles';

import User from "../../users/User";

import "./Content.css";

class Content extends Component {
  render() {
    return (
      <section className="content-section">
        CONTENT PAGE
        {/* <Wrapper>
          <Articles></Articles>
        </Wrapper> */}
        {/* Users */}
        <div id="content-div" className="">
          <User />
        </div>
      </section>
    );
  }
}

export default Content;
