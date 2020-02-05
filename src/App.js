import React, { Component } from "react";
import "./App.css";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Topic from "./components/Topic";
import AddTopic from "./components/AddTopic";
import Profile from "./components/Profile";
import Sidebar from "./containers/Sidebar";
import Navbar from "./containers/Navbar";
import Feed from "./containers/Feed";

// import Inbox from "./components/Inbox";
// import ShowConvo from "./components/ShowConvo";
// import NewConvo from "./components/NewConvo";
import {
  // BrowserRouter as Router,
  Route,
  withRouter,
  Redirect,
  Switch
} from "react-router-dom";

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: {},
      loading: true,
      topicsFollowed: [],
      fetchgoogle: [{
        "source": {
          "id": "bbc-news",
          "name": "BBC News"
        },
        "author": null,
        "title": "Lakers match called off after Bryant's death",
        "description": "Basketball chiefs call off the Los Angeles Lakers' game against local rivals the LA Clippers on Tuesday after the death of Lakers legend Kobe Bryant.",
        "url": "https://www.bbc.co.uk/sport/basketball/51275538",
        "urlToImage": "https://ichef.bbci.co.uk/onesport/cps/624/cpsprodpb/1571C/production/_110663878_bryant.jpg",
        "publishedAt": "2020-01-27T22:58:06Z",
        "content": "Media playback is not supported on this device\r\nWatch: When Bryant scored 60 points in his final LA Lakers game\r\nBasketball chiefs have called off the Los Angeles Lakers' match on Tuesday after the death of their legendary former player Kobe Bryant.\r\nThe 41-y… [+505 chars]"
      }]
    };
  }

  // fetchFromGoogle = () => {
  //   // console.log(this.state.topicsFollowed)
  //   this.state.topicsFollowed.map(topic => {
  //     if (topic.google_news) {
  //       fetch(
  //         `https://newsapi.org/v2/everything?q=${topic.topic_title}&apiKey=07af66c02837407a82106528c10d64c5`
  //       )
  //         .then(res => res.json())
  //         .then(result => {
  //           this.setState({ fetchgoogle: result.articles[0] });
  //           console.log(result)
              //  this.postToGoogle(result.articles[0])
  //         });
  //     }
  //   });
  // };

  postToGoogle = (result) => {
    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({

        post: {
          caption: this.state.fetchgoogle.title,
          source: "Google News",
          image_url: this.state.fetchgoogle.urlToImage,
          url: this.state.fetchgoogle.url,
          published_at: this.state.fetchgoogle.publishedAt
      } } )
    });
    this.props.history.push("/feed");
  };
  

  componentDidMount() {
    fetch("http://localhost:3000/re_auth", {
      // fetch GET would only need 1 argument. the rest need 2
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .catch(error => {
        if (error) {
          return window.alert("Turn on the server dumbass");
        } else {
          return window.alert("Oh my. Something has gone terribly wrong.");
        }
      })
      .then(json => {
        if (json.user !== undefined) {
          this.setState(
            {
              currentUser: {
                id: json.user.data.id,
                ...json.user.data.attributes
              }
            },
            () => {
              this.setState({ loading: false });
            }
          );
        } else {
          this.setState({ loading: false });
        }
      })
      .catch(() => {});
  }

  handleLoginSubmit = (event, loginInfo) => {
    event.preventDefault();
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        auth: {
          // id: loginInfo.id,
          username: loginInfo.username,
          password: loginInfo.password,
          first_name: loginInfo.first_name,
          last_name: loginInfo.last_name
        }
      })
    })
      .then(resp => resp.json())
      .then(json => {
        if (json.error) {
          document.getElementById("login-error").innerText = json.error;
        } else {
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
      });
  };

  updateStateOfTopicsFollowed = result => {
    /* 1. Pass down this function to Sidebar, and take in the value via fetch result
    2. Use spread operator to combine prevstate with new results
    3. call this function via handleSubmitTopic & pass it the addTopicForm info.
    */
    this.setState(prevState => ({
      topicsFollowed: [...prevState.topicsFollowed.concat(result)]
    }));
  };

  handleSubmitTopic = (event, socialInput) => {
    event.preventDefault();
    // console.log(socialInput);
    fetch("http://localhost:3000/add-topic", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
        topic: socialInput,
        user_id: this.state.currentUser.id
      })
    });
    this.updateStateOfTopicsFollowed(socialInput);
    this.props.history.push("/feed");
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
          document.getElementById("login-error").innerText = json.error;
        } else {
          localStorage.setItem("token", json.jwt);
          this.setState({
            currentUser: {
              id: json.user.data.attributes.id,
              ...json.user.data.attributes
            }
          });
          this.props.history.push("/feed");
        }
      });
  };

  handleLogout = () => {
    localStorage.removeItem("token");
    this.setState({
      currentUser: {}
    });
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="App">
        <Navbar
          currentUser={this.state.currentUser}
          handleLogout={this.handleLogout}
        />

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

          {this.state.loading === false ? (
            Object.keys(this.state.currentUser).length !== 0 ? (
              <React.Fragment>
                <Sidebar
                  currentUser={this.state.currentUser}
                  topicsFollowed={this.state.topicsFollowed}
                  updateStateOfTopicsFollowed={this.updateStateOfTopicsFollowed}
                />

                {/* <Route path="/topic" component={Topic} /> */}

                <Route path="/topic" render={props => <Topic {...props} />} />

                <Route
                  exact
                  path="/add-topic"
                  render={props => (
                    <AddTopic
                      {...props}
                      currentUser={this.state.currentUser}
                      handleSubmitTopic={this.handleSubmitTopic}
                      updateStateOfTopicsFollowed={
                        this.updateStateOfTopicsFollowed
                      }
                    />
                  )}
                />
                <Route
                  exact
                  path="/feed"
                  render={props => (
                    <Feed
                      {...props}
                      topicsFollowed={this.topicsFollowed}
                      fetchFromGoogle={this.fetchFromGoogle}
                    />
                  )}
                />

                <Route
                  exact
                  path="/profile"
                  render={props => (
                    <Profile
                      {...props}
                      currentUser={this.state.currentUser}
                      handleLogout={this.handleLogout}
                    />
                  )}
                />
              </React.Fragment>
            ) : (
              <Redirect to="/" />
            )
          ) : (
            <>
              <div className="lds-dual-ring"></div>
            </>
          )}
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);

/* PROBLEM: When I log in and refresh any of the pages, I get sent to home page. Wtf.

GUESS : initial render, this.state.currentUser is empty when we approach the 
logic on line 188 therefore we hit line 201 which is a redirect to root.

test #1: check if this.state.loading is false before line 188  

gather info: 
*/
