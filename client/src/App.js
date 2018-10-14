///////////////////
// dependencies
///////////////////
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//components
import Navigation from './components/Navigation';
import Header from './components/Header';
import Footer from './components/Footer';
// pages
import Home from './components/Home';
import NewsFeed from './components/NewsFeed';
import NotFound from './components/NotFound';
import About from './components/About';

// Manage App State -- Context UI
import { Provider } from './context';

// stylesheets
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {

  state = {
    // articles: ''
    appName: "SpaceBar",
    orgName: "GT Project Team",
    year: new Date().getFullYear()
  };

  //////////////////////////////////////////////
  // when component mounts
  //////////////////////////////////////////////
  async componentDidMount() {
      // let res = await axios.get('/api/scrape');
  
      // console.log(res.data);
      // this.setState({ articles: res.data });
  }

  /////////////////////////
  // app render
  /////////////////////////
  render() {
    return (
      <Provider>
        <Router>
          <div className="App fluid-container">
            <Navigation 
              branding={this.state.appName}
            />
            <Header
              title={this.state.appName}
              message="Discover what's out there."
            ></Header>

            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path="/about" component={About} />
              <Route path='/api/articles' component={NewsFeed} />
              <Route component={NotFound} />
            </Switch>

            <Footer
              year={this.state.year}
              orgName={this.state.orgName}
              >
            </Footer>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
