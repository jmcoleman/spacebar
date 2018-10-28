import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import Articles from '../../articles/Articles';
// import Wrapper from '../../layout/Wrapper';
import ChatApp from '../../ChatApp/ChatApp';
import "./Home.css";
import UserProfile from '../../Profile/Profile';

class Home extends Component {

  render() {
    return (
      <React.Fragment>
        <div id="home-page" className="mt-4 css-grid-wrapper app-bg-color-3 mx-5 mb-4">

          {/* Profile */}
          <div id="profile-section" className="box a">
            {/* <h6 className="app-display-4">User Profile</h6> */}
            <div className="d-flex justify-content-around mw-100 mh-90">
              <UserProfile />

              {/* updated */}
              <div className="ml-4">
                <ul className="list-group">
                  <li className="list-group-item border-0" style={{background: 'transparent'}}>
                    <div className="mx-4 clearfix">
                      <h5>WHAT'S TRENDING</h5>
                      <img src="https://tse3.mm.bing.net/th?id=OIP.m2mhfs_-d653oZYi0VO4vgHaEK&pid=15.1&P=0&w=200&h=100" alt="" className="img-responsive float-left mr-3"/>
                      <p className="text-left">
                        Check out the headlines and see what's trending.
                      </p>
                    </div>
                  </li>
                  <li className="list-group-item border-0" style={{background: 'transparent'}}>
                    <div className="mx-4 clearfix">
                      <h5>WHO'S ONLINE</h5>
                      <img src="https://tse4.mm.bing.net/th?id=OIP.yDVWwsoGBF4akjL9Xa-QSwHaD_&pid=15.1&P=0&w=200&h=100" alt="" className="img-responsive float-left mr-3"/>
                      <p className="text-left">
                        Chat with your friends and see who's online!
                      </p>
                    </div>
                  </li>
                  <li className="list-group-item border-0" style={{background: 'transparent'}}>
                    <div className="mx-4 clearfix">
                      <h5>WHAT'S UP NEXT</h5>
                      <img src="https://tse1.mm.bing.net/th?id=OIP.wbETZnPGF5LKfo1ZswRCwwHaHa&pid=15.1&P=0&w=200&h=100" alt="" className="img-responsive float-left mr-3"/>
                      <p className="text-left">
                        Coming Soon -- monthly feature updates!  Be on the lookout for chat typing indicators, automated clear for chat room messages, reset password notifications, add and delete article comments, enhanced blogging, site personalization and more!
                      </p>
                    </div>
                  </li>

                </ul>
              </div>

            </div>
          </div>

          {/* News Feed */}
          <div id="newsfeed-section" className="box b">
            <Articles />
          </div>

          {/* Blog */}
          <div id="blog-section" className="box d">
            <h6 className="app-display-4">Blog</h6>
            <div className="mw-100 mh-100">
              <iframe title="blog-area" src ="https://coderdevelopers.blogspot.com/" width="100%" height="800px"> </iframe>
            </div>
          </div>

          {/* Chat */}
          <div id="chat-section" className="box c">
            <h6 className="app-display-4">Chat</h6>
            <div className="mw-100 mh-100">
              <ChatApp></ChatApp>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Home;
