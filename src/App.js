import React, { Component } from "react";
import "./App.css";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Header from "./containers/Header";
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
      currentUser: {}
    };
  }

  handleLoginSubmit = (event, loginInfo) => {
    event.preventDefault();
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user: {
          username: loginInfo.username,
          password: loginInfo.password
        }
      })
    })
      .then(resp => resp.json())
      .then(data => {
        localStorage.setItem("token", data.jwt);
        this.setState({
          currentUser: {
            id: data.user.data.attributes.id,
            username: data.user.data.attributes.username
          }
        });
      })
      // .then(() => {
      //   this.fetchCurrentUserConvos();
      // })
      .then(() => {
        this.props.history.push("/feed");
      });
  };

  // fetchCurrentUserConvos = async() => {
  //   const response = await fetch(`http://localhost:3000/myconvos/${this.state.currentUser.id}`,{
  //     method: 'GET',
  //     headers: {
  //      'Authorization': localStorage.getItem('token'),
  //      'Content-Type': 'application/json',
  //      'Accept': 'application/json'
  //     }
  //   })
  //   const apiData = await response.json()
  //   console.log(response)
  //   this.setState({
  //     currentUserConvos: apiData
  //   })
  // }

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
      .then(resp => {
        localStorage.setItem("token", resp.jwt);
        this.setState({
          currentUser: {
            id: resp.user.data.attributes.id,
            username: resp.user.data.attributes.username,
            language: resp.user.data.attributes.language,
            nationality: resp.user.data.attributes.nationality
          }
        });
      })
      .then(() => {
        this.props.history.push("/feed");
      });
  };

  handleLogout = () => {
    localStorage.removeItem("token");
    this.props.history.push("/");
    this.setState({
      currentUser: {},
      currentUserConvos: {}
    });
  };

  render() {
    return (
      <div className="App">
        <Header currentUser={this.state.currentUser} />
        <div className="main">
          <Switch>
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
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);

//         exact
//         path="/signup"
//         render={props => (
//           <Signup
//             {...props}
//             handleSignupSubmit={this.handleSignupSubmit}
//           />
//         )}
//       />
//       {Object.keys(this.state.currentUser).length !== 0 ? (
//         <Route
//         exact
//         path="/inbox"
//         render={props => (
//           <Inbox {...props} currentUser={this.state.currentUser} currentUserConvos={this.state.currentUserConvos} />
//         )}
//       />
//       ) : (
//         <Redirect to="/login" />
//       )}
//
