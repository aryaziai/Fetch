import React, { Component } from "react";
import SidebarItems from "./SidebarItems";
import { withRouter } from "react-router-dom";

class Sidebar extends Component {  // MAKE FUNCTIONAL COMPONENT LATER

  componentDidMount() {
   
    let token = localStorage.getItem("token");
    if (token) {
      fetch(`http://localhost:3000/users/${this.props.currentUser.id}`,{
        method: "GET",
        headers: {
          'Authorization': localStorage.getItem('token'),
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
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

    {/* <p className="addnewsidebaritems" onClick={() => this.props.history.push("/add-topic")}> <img src="/unheart.png" alt="Add Topic" className="favorites" />Favorites</p> */}
     <p className="addnewsidebaritems" onClick={() => this.props.history.push("/add-topic")}> <img src="https://friconix.com/png/fi-xtluxx-plus-thin.png" alt="Add Topic" className="addMore" />Add a New Topic </p>
      </div>
      </header>
    );
  }
}


export default withRouter(Sidebar);
