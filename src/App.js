import React, { Component } from "react";
import "./App.css";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AddTopic from "./components/AddTopic";
import Profile from "./components/Profile";
import Sidebar from "./containers/Sidebar";
import Navbar from "./containers/Navbar";
import Feed from "./containers/Feed";
import { Link } from 'react-router-dom';

// import Inbox from "./components/Inbox";
// import ShowConvo from "./components/ShowConvo";
// import NewConvo from "./components/NewConvo";
import {
  BrowserRouter as Router,
  Route,
  withRouter,
  Redirect,
  Switch
} from "react-router-dom";

class App extends Component {
  constructor() {
    super();

    this.state = {
      // currentUserConvos: [],
      // users: [],
      // messages: [],
      // conversations: [],
      currentUser: {},
      loading: true
    };
  }


  componentDidMount(){
    
      fetch("http://localhost:3000/re_auth", { // fetch GET would only need 1 argument. the rest need 2
        method: "POST",
        headers: { 
          "Content-type": "application/json",
          'Accept': 'application/json',
          'Authorization': localStorage.getItem("token")
        }
      })
      .then(res => res.json())
      .catch((error) => {
        // console.log(error)
        // return error
        if (error) {
          return window.alert('Turn on the server dumbass') 
        }
        else {
        return window.alert("Oh my. Something has gone terribly wrong.")
        } 
      })
      .then(json => {
        // console.log(json);
        if (json.user !== undefined) {
          this.setState({
            currentUser: {
              id:json.user.data.id,
              ...json.user.data.attributes
          }}, () => { this.setState({ loading: false })})
        } else {
          this.setState({ loading: false })
        }
      })
      .catch(() => {
        // console.log("Cannot connect to server.")
      })
    
 }
  

  handleLoginSubmit = (event, loginInfo) => {
    // console.log(loginInfo)
    event.preventDefault();
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { 
        "Content-type": "application/json",
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: loginInfo.username,
          password: loginInfo.password,
          first_name: loginInfo.first_name,
          last_name: loginInfo.last_name
        }
      })
    })
      .then(resp => resp.json())
      .then(data => {
        // console.log(data)
        localStorage.setItem("token", data.jwt);
        this.setState(
          {
            currentUser: {
              id: data.user.data.attributes.id,
              username: data.user.data.attributes.username,
              first_name: data.user.data.attributes.first_name,
              last_name: data.user.data.attributes.last_name
            }
          },
          // () => console.log(this.state.currentUser)
        );
      })
      // .then(() => {
      //   this.fetchCurrentUserConvos();
      // })
      .then(() => {
        this.props.history.push("/feed");
      });
  };


  handleSignupSubmit = (event, SignupInfo) => {
    event.preventDefault();
    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: SignupInfo
      })
    })
      .then(resp => resp.json())
      .then(json => {
        if (json.error) {
          alert("Oops something went wrong. Try again.")
        }
        else {
          localStorage.setItem("token", json.jwt);
          this.setState({
            currentUser: {
              id: json.user.data.attributes.id,
              username: json.user.data.attributes.username,
              first_name: json.user.data.attributes.first_name,
              last_name: json.user.data.attributes.last_name
            }
          
          });
          this.props.history.push("/feed");
        
    
        }
      } )
    }

        
       
      
  
      
  

  handleLogout = () => {
    localStorage.removeItem("token");
    this.props.history.push("/");
    this.setState({
      currentUser: {},
    });
  };

  render() {
    return (
      <div className="App">
        {this.state.loading? <div class="lds-dual-ring"></div> : 
        <>
        <Navbar currentUser={this.state.currentUser} handleLogout={this.handleLogout}/>
        <Sidebar currentUser={this.state.currentUser} handleLogout={this.handleLogout} />
        
          <Switch>
          <Route
              exact
              path="/feed"
              render={props => (
                <Feed {...props}  />
              )}
            />
            
            <Route exact path="/" component={Welcome} />

            <Route
              exact
              path="/login"
              render={props => (
                <Login {...props} handleLoginSubmit={this.handleLoginSubmit} />
              )}
            />
            <Route
              exact
              path="/Signup"
              render={props => (
                <Signup {...props} handleSignupSubmit={this.handleSignupSubmit} />
              )}
            />
            <Route
              exact
              path="/add-topic"
              render={props => (
                <AddTopic {...props} currentUser={this.state.currentUser}   />
              )}
            />

             <Route
              exact
              path="/profile"
              render={props => (
                <Profile {...props} currentUser={this.state.currentUser}  />
              )}
            />
          </Switch>
          </>}
          </div>
    );
  }
}

export default withRouter(App);