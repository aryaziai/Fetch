import React, { Component } from "react";
import "./App.css";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Topic from "./components/Topic";
import AddTopic from "./components/AddTopic";
import UserProfile from "./components/UserProfile";
import Sidebar from "./containers/Sidebar";
import Category from "./containers/Category";
import Navbar from "./containers/Navbar";
import Feed from "./containers/Feed";
import { Route, withRouter, Redirect, Switch } from "react-router-dom";

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: {},
      loading: true,
      topicsFollowed: [],
      allTopicPosts: [],
      categoryPosts: []
    };
  }

  // iterate through this.state.topicsFollowed and match topic_title with topicUrl...
  // if successful then make fetch request localhost.com/3000/topics/{id}

  fetchToTopicId = () => {
    console.log(    this.state.topicsFollowed)
    //wrote with emiley 2/6/20

    this.state.topicsFollowed.forEach(topic => {
      console.log(topic)

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
          // Matt 2/8/20
          let topicId = resp.topic.data.attributes.id;
          let topicPosts = resp.topic.data.attributes.posts;
          console.log(topicPosts)
          topicPosts = topicPosts.map(postObj => {
            return { ...postObj, topic_id: topicId };
          });
          let allTopicPostsIds =
            this.state.allTopicPosts !== null
              ? this.state.allTopicPosts.map(tp => tp.id)
              : [];
          // console.log(this.state.allTopicPosts)
          let cleanTopicPosts = topicPosts.filter(
            topicpost => !allTopicPostsIds.includes(topicpost.id)
          ); // if this topicPost's id isn't in allTopicPostsIds

          this.state.allTopicPosts !== null &&
            this.setState({
              allTopicPosts: [...this.state.allTopicPosts, ...cleanTopicPosts] // object with [Posts] inside of it.
            });
        });
    });
      console.log("ended")
  };

  fetchFromGoogle = () => {
    // console.log("fetchFromGoogle has been hit")
    // eslint-disable-next-line
    this.state.topicsFollowed.map(topic => {
      let plus = topic.plus === true ? "+" : "";

      fetch(
        `https://newsapi.org/v2/everything?language=${topic.language}&pageSize=${topic.page_size}&q=${plus}${topic.topic_title}&sortBy=${topic.sort_by}&excludeDomains=slashdot.org&apiKey=07af66c02837407a82106528c10d64c5`
      )
        .then(res => res.json())
        .then(result => {
          result.articles.map(article => this.postToOurApi(article, topic.id)); // thanks emiley sending each Articles into postToOurApi, good allTopicPosts! not using state!
        });
    });
  };

  postToOurApi = (result, topicId) => {
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
        if (resp.post) {
          // console.log(resp)
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
          });
        }
      });
    // .then(this.props.history.push("/feed"))
  };

  componentDidMount() {
    // if (localStorage.getItem("token") !== null) {

    fetch("http://localhost:3000/re_auth", {
      // fetch GET would only need 1 argument. the rest need 2
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
    // }
  }

  deletePostFromCategory = event => {
    event.preventDefault();
    this.setState({
      categoryPosts: this.state.categoryPosts.filter(
        x => x.url !== event.target.id
      )
    });
  };

  deletePostFromTopic = event => {
    event.preventDefault();
    // console.log(this.state.allTopicPosts)
    // console.log(event.target.id)
    fetch(`http://localhost:3000/posts/${event.target.id}`, {
      method: "delete",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      }
    });
    // console.log(this.state.allTopicPosts.filter(x=> x.id !== parseInt(event.target.id)))
    // console.log({allTopicPosts: (this.state.allTopicPosts.filter(x=> x.id !== parseInt(event.target.id) ) ) } )
    this.setState({
      allTopicPosts: this.state.allTopicPosts.filter(
        x => x.id !== parseInt(event.target.id)
      )
    });
  };

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
          this.fetchToTopicId()
          this.props.history.push("/feed")
        }
      })


  
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

  handleSubmitTopic = (event, socialInput) => {
    // before creating posttopic make sure you run this and also make sure POSTING to POST MODEL is done.
    event.preventDefault();
    socialInput.topic_title !== ""
      ? fetch("http://localhost:3000/add-topic", {
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
            return data.topic.data.attributes.id; // topicId
          })
          .then(topicID => {
            // took out topicID
            this.fetchFromGoogle(topicID); // took out topicID
          })
          .then(() => {
            this.props.history.push("/feed"); // this.props.history.push("/feed"); needs .then
          })
      : window.alert("Topic title cannot be empty");
  };

  handleSignupSubmit = (event, SignupInfo) => { // first function called when signing up
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
          this.createTopic(); // second function called   // i think because this is not in a .then

          // this.props.history.push("/feed"); // why am I pushing to feed
        }
      });
  };

  createTopic = () => { // CREATES TRENDING TOPIC
    // before creating posttopic make sure you run this and also make sure POSTING to POST MODEL is done.
    fetch("http://localhost:3000/add-topic", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
        topic: {
          topic_title: "Trending",
          logo:
            "https://cust-images.grenadine.co/grenadine/image/upload/c_fill,f_jpg,g_face,h_1472,w_1472/v0/Kinnektor/QgOV_5613.png",
          user_id: this.state.currentUser.id,
          //  page_size: 5,
          //  plus: true,
          //  sort_by: relevancy,
          page_size: null,
          plus: null,
          sort_by: null
        }
      })
    })
      .then(res => res.json())
      .then(data => {
        // console.log("topic Id", topicId)
        this.followTrending(data.topic.data.attributes.id); // took out topicID
      })
      .then(() => {
        this.props.history.push("/feed"); // this.props.history.push("/feed"); needs .then
      });
  };


  deleteTopic = (event) => {
    event.preventDefault();
    fetch(`http://localhost:3000/topics/${event.target.id}`, {
      method: "delete",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      }
    })
    this.setState({
      topicsFollowed: this.state.topicsFollowed.filter(x=> x.id !== parseInt(event.target.id) ) 
    })
    this.props.history.push("/feed")
    } 


  followTrending = (topicId) => { 
    fetch(`http://newsapi.org/v2/top-headlines?pageSize=9&country=us&apiKey=07af66c02837407a82106528c10d64c5`)
      .then(res => res.json())
      .then(result => {
        // console.log(result) // successful
        result.articles.map(article =>
          this.postTrendingTopicToOurApi(article, topicId)
        ); // thanks emiley sending each Articles into postToOurApi, good allTopicPosts! not using state!
      });
  };



  postTrendingTopicToOurApi = (result, topicId) => {
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
      .then(data => {
        // console.log(data)
        fetch("http://localhost:3000/post_topics", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: localStorage.getItem("token")
          },
          body: JSON.stringify({
            post_topic: {
              post_id: data.post.id,
              topic_id: topicId
            }
          })
        });
      })
      .then(this.fetchToTopicId())
      // .then(this.props.history.push("/feed"));
  };

  handleLogout = () => {
    localStorage.clear();
    this.setState({
      currentUser: {},
      topicsFollowed: [],
      allTopicPosts: null,
      categoryPosts: []
    });
    this.props.history.push("/");
  };

  handleCategoryClick(categoryName) {
    // console.log("handleCategory FETCH just happened")
    fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=${categoryName}&pageSize=9&apiKey=07af66c02837407a82106528c10d64c5`
    )
      .then(resp => resp.json())
      .then(resp =>
        this.setState({
          categoryPosts: resp.articles,
          categoryName: categoryName
        })
      );
    this.props.history.push(`/category/${categoryName}`);
  }

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
                  path="/category/"
                  render={props => (
                    <Category
                      {...props}
                      currentUser={this.state.currentUser}
                      categoryPosts={this.state.categoryPosts}
                      // categoryName={this.state.categoryName}
                      deletePostFromCategory={this.deletePostFromCategory}
                    />
                  )}
                />

                <div className="category">
                  <h3>Categories</h3>
                  <br />
                  <p onClick={e => this.handleCategoryClick("business")}>
                    #Business
                  </p>
                  <p onClick={e => this.handleCategoryClick("entertainment")}>
                    #Entertainment
                  </p>
                  <p onClick={e => this.handleCategoryClick("general")}>
                    #General
                  </p>
                  <p onClick={e => this.handleCategoryClick("health")}>
                    #Health
                  </p>
                  <p onClick={e => this.handleCategoryClick("science")}>
                    #Science
                  </p>
                  <p onClick={e => this.handleCategoryClick("sports")}>
                    #Sports
                  </p>
                  <p onClick={e => this.handleCategoryClick("technology")}>
                    #Technology
                  </p>
                </div>
                {/* <Category/> */}

                <Sidebar
                  currentUser={this.state.currentUser}
                  topicsFollowed={this.state.topicsFollowed}
                  updateStateOfTopicsFollowed={this.updateStateOfTopicsFollowed}
                />

                <Route
                  path="/topic"
                  render={props => (
                    <Topic
                      {...props}
                      fetchFromGoogle={this.fetchFromGoogle}
                      topicsFollowed={this.state.topicsFollowed}
                      allTopicPosts={this.state.allTopicPosts}
                      deletePostFromTopic={this.deletePostFromTopic}
                      deleteTopic={this.deleteTopic}
                    />
                  )}
                />

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
        <img
          src="/scroll.png"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="scrollTop"
          alt="ScrollTop"
        />
      </div>
    );
  }
}

export default withRouter(App);
