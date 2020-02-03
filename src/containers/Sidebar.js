import React, { Component } from "react";
import SidebarItems from "./SidebarItems";
// import { Link } from 'react-router-dom';

export default class Sidebar extends Component {
  constructor() {
    super();

    this.state = {
      topicsFollowed: null
    };
  }

  componentDidMount() {
    let token = localStorage.getItem("token");
    if (token) {
      fetch(`http://localhost:3000/users/${this.props.currentUser.id}`)
        .then(res => res.json())
        .then(result => {
          this.setState({
            topicsFollowed: result
          });
          console.log(this.state.topicsFollowed.user.topics);
        });
    }
  }

  render() {

    return (
      <header className="App-header">

      <div class="addtopicstuff">
      <h3>Topics You Follow</h3>
  
    {this.state.topicsFollowed !== null ? this.state.topicsFollowed.user.topics.map(topic => (
    <SidebarItems topic={topic} key={topic.id}/>  ))   : <><div className="lds-dual-ring"></div></> }
        
      </div>
      </header>
    );
  }
}
