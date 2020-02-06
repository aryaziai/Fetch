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
      fetchgoogle: null
    };
  }

  fetchFromGoogle = (topicId) => {
    console.log("topics follow", this.state.topicsFollowed);
    this.state.topicsFollowed.map(topic => {
      if (topic.google_news) {
        fetch(
          `https://newsapi.org/v2/everything?pageSize=3&q=${topic.topic_title}&apiKey=07af66c02837407a82106528c10d64c5`
        )
          .then(res => res.json())
          .then(result => {
            result.articles.map(article => this.postToOurApi(article, topicId)); // thanks emiley sending each Articles into postToOurApi, good trick! not using state!
          });
      }
    });
  };

  postToOurApi = (result,topicId) => {
    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
        post: {
          caption: result.title,
          source: "Related News",
          image_url: result.urlToImage,
          url: result.url,
          published_at: result.publishedAt
        }
      })
    })
      .then(resp => resp.json())
      .then(resp =>
        fetch("http://localhost:3000/post_topics", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: localStorage.getItem("token") // test out without this later.
          },
          body: JSON.stringify({
            post_topic: {
              post_id: resp.post.id,
              topic_id: topicId // tried commenting out topic_id here and in strong params. no luck.
            }
          })
        })
      )
      // console.log(this.state.topicsFollowed)
      .then(this.props.history.push("/feed"))
      };


  componentDidMount() {
    // if (localStorage.getItem("token") !== null) {

    fetch("http://localhost:3000/re_auth", { // fetch GET would only need 1 argument. the rest need 2
      method: "GET",
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
            }, () => {this.setState({ loading: false })}
          );
        } else {
          this.setState({ loading: false });
        }
      })
      .catch(() => {});
    // }
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
      topicsFollowed: prevState.topicsFollowed.concat(result)
    }));
  };

  handleSubmitTopic = (event, socialInput) => { // before creating posttopic make sure you run this and also make sure POSTING to POST MODEL is done.
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
        topic: {
          ...socialInput
        }
      })
    })
    .then(res => res.json())
    .then(data => {
      this.updateStateOfTopicsFollowed([data.topic.data.attributes]);
      return data.topic.data.attributes.id
    })
    .then((topicId) => {
      this.fetchFromGoogle(topicId);
    })
    .then(() => {
      this.props.history.push("/feed")
    });
    
    // this.props.history.push("/feed"); needs .then
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
