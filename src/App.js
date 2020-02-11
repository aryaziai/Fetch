import React, { Component } from "react";
import "./App.css";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Topic from "./components/Topic";
import AddTopic from "./components/AddTopic";
import UserProfile from "./components/UserProfile";
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
    .then(resp => { // Matt 2/8/20
      let topicId = resp.topic.data.attributes.id
      let topicPosts = resp.topic.data.attributes.posts;
      topicPosts = topicPosts.map(postObj => { return {...postObj, topic_id: topicId}} )
      let allTopicPostsIds = this.state.allTopicPosts !== null ? this.state.allTopicPosts.map(tp => tp.id) : []
      let cleanTopicPosts = topicPosts.filter(topicpost => !allTopicPostsIds.includes(topicpost.id)) // if this topicPost's id isn't in allTopicPostsIds 
        this.setState({
          allTopicPosts: [...this.state.allTopicPosts , ...cleanTopicPosts] // object with [Posts] inside of it.
        })
    })
  } )
 }
  
  
  fetchFromGoogle = () => {
    this.state.topicsFollowed.map(topic => {
      console.log(topic)
      if (topic.google_news) {
        fetch(
          `https://newsapi.org/v2/everything?language=${topic.language}&pageSize=${topic.page_size}&q=${topic.topic_title}&apiKey=07af66c02837407a82106528c10d64c5`
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
          source: result.source.name,
          image_url: result.urlToImage,
          url: result.url,
          published_at: result.publishedAt
        }
      })
    })
      .then(resp => resp.json())
      .then(resp => {
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

    
    deletePostFromTopic = (event) => {
      event.preventDefault();
      // console.log(event.target.id)
      fetch(`http://localhost:3000/posts/${event.target.id}`, {
      method: "delete",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      },
      })
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
    return (
      <div className="App">
        <Navbar
          currentUser={this.state.currentUser}
          handleLogout={this.handleLogout}
        />

        <Switch>
          <Route exact path="/" component={Welcome} />
             {/* <Route render={() => <Redirect to="/"/>}/> */}
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

                <Route path="/topic" render={props => <Topic {...props} fetchFromGoogle={this.fetchFromGoogle} topicsFollowed={this.state.topicsFollowed} allTopicPosts={this.state.allTopicPosts} />} />

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
                      topicsFollowed={this.state.topicsFollowed}
                      fetchFromGoogle={this.fetchFromGoogle}
                      fetchToTopicId={this.fetchToTopicId}
                      allTopicPosts={this.state.allTopicPosts}
                      deletePostFromTopic={this.deletePostFromTopic}
                    />
                  )}
                />

                <Route
                  exact
                  path="/profile"
                  render={props => (
                    <UserProfile
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
        <img src="https://cdn0.iconfinder.com/data/icons/navigation-set-arrows-part-one/32/ChevronUpCircle-512.png" onClick={()=> window.scrollTo({ top: 0, behavior: 'smooth' })} className="scrollTop" alt="ScrollTop" />
      </div>
    );
  }
}

export default withRouter(App);