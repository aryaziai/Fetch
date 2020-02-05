import React, { Component } from "react";
import SidebarItems from "./SidebarItems";
import { withRouter } from "react-router-dom";

class Sidebar extends Component {  // MAKE FUNCTIONAL COMPONENT LATER

  componentDidMount() {
    let token = localStorage.getItem("token");
    if (token) {
      fetch(`http://localhost:3000/users/${this.props.currentUser.id}`)
        .then(res => res.json())
        .then(result => {
     this.props.updateStateOfTopicsFollowed(result.user.topics) // passing result up via this function
          });
        };
    }
  

  render() {

    return (
      <header className="App-header">

      <div className="addtopicstuff">
      <h3>Topics You Follow</h3>
  
    {this.props.topicsFollowed !== null ? this.props.topicsFollowed.map(topic => (
    <SidebarItems topic={topic} key={topic.id}/>  ))   : <><div className="lds-dual-ring"></div></> }

    {/* {this.props.topicsFollowed !== null ? this.props.topicsFollowed.map(topic => (
    <Topic topic={topic} key={topic.id}/>  ))   : <><div className="lds-dual-ring"></div></> } */}


<p className="addnewsidebaritems" onClick={() => this.props.history.push("/add-topic")}> <img src="https://i.ya-webdesign.com/images/white-plus-png-5.png" alt="Add Topic" />Add a New Topic </p>
      </div>
      </header>
    );
  }
}


export default withRouter(Sidebar);
