import React, { Component } from 'react';

// import Wrapper from "../../layout/Wrapper";
// import Articles from '../../articles/Articles';

import Users from '../../users/Users';

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
        <div id="userlist-section" className="">
          <Users />
        </div>
      </section>
    )
  }
}

export default Content;
