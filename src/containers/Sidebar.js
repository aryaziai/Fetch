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
            Accept: "application/json"
          }
        }
      )
        .then(res => res.json())
        .then(result => {
          this.props.updateStateOfTopicsFollowed(result.user.topics); // passing result up via this function
        });
    }
  }

  render() {
    return this.props.location.pathname.split("/").slice(-1)[0] === "feed" ||
      window.innerWidth > 1034 ? (
      <header className="App-header">
        <div className="addtopicstuff">
          <h3>Topics You Follow</h3>

          <p
            className="addnewsidebaritems"
            onClick={() => this.props.history.push("/Fetch/add-topic")}
          >
            <img
              src="https://i.imgur.com/DPZuNtB.png"
              alt="Add Topic"
              className="addMore"
            />
            Add a New Topic{" "}
          </p>
          <div className="mainSideMove">
            {this.props.topicsFollowed !== null ? (
              this.props.topicsFollowed.map(topic => (
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
    ) : null;
  }
}

export default withRouter(Sidebar);
