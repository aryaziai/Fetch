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
import {
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
      allTopicPosts: []
    };
  }

  onlyUnique = (value, index, self) => {  // https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates#14438954
    return self.indexOf(value) === index;
}


    // iterate through this.state.topicsFollowed and match topic_title with topicUrl... 
    // if successful then make fetch request localhost.com/3000/topics/{id}

  
    fetchToTopicId = () => { //wrote with emiley 2/6/20
    // console.log(this.state.topicsFollowed) // topicsFollowed IS NOT the problem with duplicates.
    //  console.log(this.state.allTopicPosts)
    //  if (this.state.allTopicPosts) {}
    this.state.topicsFollowed.forEach(topic => {
      // we console logged topicsPost and return two unique items in array
 
    fetch(`http://localhost:3000/topics/${topic.id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      }
    })
    .then(resp => resp.json())
    .then(resp => {
      let topicPosts = resp.topic.data.attributes.posts;
      let allTopicPostsIds = this.state.allTopicPosts.map(tp => tp.id)
      cleanTopicPosts = topicPosts.filter(topicpost => !allTopicPostsIds.includes(topicpost.id)) // if this topicPost's id isn't in allTopicPostsIds 
      console.log(topicPosts)
        this.setState({
          allTopicPosts: [...this.state.allTopicPosts , ...cleanTopicPosts] // object with [Posts] inside of it.
        })
    })
  //   .then(topicPosts => { 
      
  //   //   console.log(this.state.allTopicPosts.posts.map(post=>post.id))  // [16,17,18]
  //   //   console.log(resp.topic.data.attributes.posts.map(post=>post.id)) // [19,20,21]
  //   //   let allTopicIds = this.state.allTopicPosts.posts.map(post=>post.id)
  //   //   let 
  //   //   this.state.allTopicPosts.posts.map(post=>post.id).includes(resp.topic.data.attributes.posts.forEach(post=>post.id)) ? 
  //   // //   // get array of all IDs in state.allTopicPosts
  //   // //   // compare each post in resp.topic.data.attributes and see if the post's ID is present in above array
  //   // //   // if the ID is present in 'idArray', do not keep it in the array
  //   // //   // after you have a full array of uniq (not previously added) posts, add these to your state
  //   // null : this.setState(prevState => ({allTopicPosts: prevState.allTopicPosts.posts.concat(resp.topic.data.attributes.posts) }) )
  //  } )
  } )
 }
  
  
  fetchFromGoogle = () => {
    this.state.topicsFollowed.map(topic => {
      if (topic.google_news) {
        fetch(
          `https://newsapi.org/v2/everything?pageSize=3&q=${topic.topic_title}&apiKey=07af66c02837407a82106528c10d64c5`
        )
          .then(res => res.json())
          .then(result => {
            result.articles.map(article => this.postToOurApi(article, topic.id)); // thanks emiley sending each Articles into postToOurApi, good allTopicPosts! not using state!
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
        topic_id: topicId,
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
      .then(resp => {
        // console.log(resp)
        // debugger
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
              topic_id: topicId 
            }
          })
        })
      })
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
    2. Use concat to combine prevstate with new results
    3. call this function via handleSubmitTopic & pass it the addTopicForm info.
    */
    this.setState(prevState => ({
      topicsFollowed: prevState.topicsFollowed.concat(result)
    }));
  };

  handleSubmitTopic = (event, socialInput) => { // before creating posttopic make sure you run this and also make sure POSTING to POST MODEL is done.
    event.preventDefault();
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
      return data.topic.data.attributes.id // topicId
    })
    .then((topicID) => { // took out topicID
      this.fetchFromGoogle(topicID); // took out topicID
    })
    .then(() => {
      this.props.history.push("/feed") // this.props.history.push("/feed"); needs .then
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
    localStorage.clear();
    this.setState({
      currentUser: {},
      topicsFollowed: [],
      allTopicPosts: null
    });
    this.props.history.push("/");
  };

  render() {
    // console.log("allTopicPosts:", this.state.allTopicPosts)
    // console.log("TopicsFollowed:", this.state.topicsFollowed)
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

                <Route path="/topic" render={props => <Topic {...props} topicsFollowed={this.state.topicsFollowed} />} />

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
                      fetchToTopicId={this.fetchToTopicId}
                      allTopicPosts={this.state.allTopicPosts}
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