import React from "react";
import './Profile.css';
// import React, { Component } from 'react';

var user = {
  basicInfo: {
    name: "Jane Doe",
    gender: "Female",
    birthday: "April 3, 1990",
    location: "Los Angeles, CA",
    photo: "https://style.anu.edu.au/_anu/4/images/placeholders/person_8x10.png",
    bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat fugit quia pariatur est saepe necessitatibus, quibusdam reiciendis ratione voluptate atque in qui provident rem repellat soluta. Blanditiis repellat velit eligendi."
  }
}

class Avatar extends React.Component {
  render() {
    var image = this.props.image,
        style = {
          width: this.props.width || 50,
          height: this.props.height || 50
        }; 
    
    if (!image) return null;
    
    return (
      <div className="avatar" style={style}>
        <img src={this.props.image} alt="User Profile" /> 
      </div>
    );
  }
}

class MainPanel extends React.Component {
  render() {
    var info = this.props.info;

    if (!info) return null;
    
    return (
      <div className="bg-white">
        <div className="top">
            <Avatar 
               image={info.photo} 
               width={100}
               height={100}
            /> 
            <hr className="app-bg-color-black w-75" />    
        </div>
   
        <div>
          <h2>{info.name}</h2>
          <h3>{info.location}</h3>
        </div>

        <div>
            <p>{info.gender} | {info.birthday}</p>
        </div>
        
        <div className="bottom">
          <h4>Biography</h4>
          <p>{info.bio}</p>
        </div>
      </div>
    );
  }
}

class UserProfile extends React.Component {
  render() {
    return (
      <div id="user-profile" className="app-border-color-black m-0">
        <MainPanel info={user.basicInfo} />
      </div>
    )
  }
}
export default UserProfile;

