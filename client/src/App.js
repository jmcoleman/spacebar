///////////////////
// dependencies
///////////////////
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import jwt_decode from "jwt-decode";
import store from "./actions/store";

//components
import Navigation from "./components/layout/Navigation";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";

//other tests
import EditArticle from "./components/articles/EditArticle";
import EditUser from "./components/users/EditUser";

// pages
import Landing from "./components/pages/Landing";
import About from "./components/pages/About";
import Home from "./components/pages/Home";
import Content from "./components/pages/Content";
import NotFound from "./components/pages/NotFound";

// Manage App State
import { Provider } from "react-redux";

// stylesheets
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//////////////////////
// Check for token
//////////////////////
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // TODO: Clear current Profile

    // Redirect to login
    window.location.href = "/login";
  }
}

// store.dispatch({type:AUTH,auth:isUserAuthorized()});
// import * as serviceWorker from "./serviceWorker";
// serviceWorker.unregister();

//////////////////////////////////////////////
// App component
//////////////////////////////////////////////
class App extends Component {
  state = {
    appName: "SpaceBar",
    appSubtitle: "Discover what's out there.",
    orgName: "GT Project Team",
    year: new Date().getFullYear(),
    // TODO set the login state to the user and the nav bar will reflect the appropriate action
    isLoggedIn: false
  };

  /////////////////////////
  // render
  /////////////////////////
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App fluid-container site">
            <Navigation
              branding={this.state.appName}
              showLoginInfo={!this.state.isLoggedIn}
            />
            <Header
              title={this.state.appName}
              message="Discover what's out there."
            />

            {/* app-bg-color-white or bg_white*/}
            <div className="site-content app-bg-color-white">
              <Switch className="site-content">
                {/* TODO remove this one for landing page */}
                <Route exact path="/" component={Landing} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/api/scrape" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/logout" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/about" component={About} />
                <Route exact path="/api/users/edit/:id" component={EditUser} />
                <Route exact path="/api/users" component={Content} />
                <Route
                  exact
                  path="/api/articles/edit/:id"
                  component={EditArticle}
                />
                <Route exact path="/api/articles" component={Home} />
                <Route component={NotFound} />
              </Switch>
            </div>

            <Footer year={this.state.year} orgName={this.state.orgName} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
