import React, { Component } from "react";
import SidebarItems from "./SidebarItems";
import { withRouter } from "react-router-dom";

class Sidebar extends Component {
  // MAKE FUNCTIONAL COMPONENT LATER

  componentDidMount() {
    let token = localStorage.getItem("token");
    if (token) {
      fetch(
        `https://fetch-backend-api.herokuapp.com/users/${this.props.currentUser.id}`,
        {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((result) => {
          this.props.updateStateOfTopicsFollowed(result.user.topics); // passing result up via this function
        });
    }
  }

  render() {
    return this.props.location.pathname.split("/").slice(-1)[0] === "feed" ||
      window.innerWidth > 1034 ? (
      <>
        <h3 className="topicsphone">Topics You Follow</h3>

        <header className="App-header">
          <div className="addtopicstuff">
            <h3 className="desktoptopics">Topics You Follow</h3>

            <div className="mainSideMove">
              <p
                className="addnewsidebaritems"
                onClick={() => this.props.history.push("/add-topic")}
              >
                <img
                  src="/images/add_topic_plus.png"
                  alt="Add Topic"
                  className="addMore"
                />
                Add a New Topic
              </p>

              {this.props.topicsFollowed !== null ? (
                this.props.topicsFollowed.map((topic) => (
                  <SidebarItems topic={topic} key={topic.id} />
                ))
              ) : (
                <>
                  <div className="lds-dual-ring"></div>
                </>
              )}
            </div>
          </div>
        </header>
      </>
    ) : null;
  }
}

export default withRouter(Sidebar);
