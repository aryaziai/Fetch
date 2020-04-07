import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Dropdown } from "react-bootstrap";
// import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { withRouter } from "react-router-dom";

class Navbar extends Component {
  constructor() {
    super();

    this.state = {
      search: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleKeyPress = e => {
    if (e.key === " " || e.key >= 0 || e.key < 10) {
      e.preventDefault();
    }
    if (e.key === "Enter") {
      setTimeout(this.searchToEmpty, 10);
    }
  };

  searchToEmpty = () => {
    this.setState({
      search: ""
    });
  };

  loginLogic = () => {
    // if not logged in
    if (Object.keys(this.props.currentUser).length === 0) {
      return (
        <>
          <div
            className="topcoolbutton"
            onClick={() => this.props.history.push("/Fetch/login")}
          >
            <p>Sign In</p>
          </div>
          <div
            className="topcoolbuttonjaz"
            onClick={() => this.props.history.push("/Fetch/signup")}
          >
            <p>Sign Up</p>
          </div>
        </>
      );
    } else
      return (
        <div className="profile-nav">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <img src="missing_avatar.jpg" alt="avatar" />{" "}
              {this.props.currentUser.username}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <p
                className="dropdown-item"
                onClick={() => this.props.history.push("/Fetch/profile")}
              >
                Edit Profile
              </p>
              <p className="dropdown-item" onClick={this.props.handleLogout}>
                Logout
              </p>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      );
  };

  loginLogicSearch = () => {
    if (Object.keys(this.props.currentUser).length !== 0) {
      return (
        <div className="searchBarContainer">
          <form
            onSubmit={e => this.props.fetchFromSearch(e, this.state.search)}
            onKeyPress={e => this.handleKeyPress(e)}
          >
            <Form.Group controlId="formBasicSearch">
              <center>
                <Form.Control
                  type="text"
                  name="search"
                  placeholder="Search All Articles"
                  onChange={e => this.handleChange(e)}
                  value={this.state.search}
                  className="searchBar"
                />
              </center>
            </Form.Group>
          </form>
        </div>
      );
    }
  };

  render() {
    return (
      <>
        <div className="topbar">
          <Link
            to={
              Object.keys(this.props.currentUser).length === 0
                ? "/Fetch/"
                : "/Fetch/feed"
            }
          >
            <img className="logo" src="logo.png" alt="logo" />
          </Link>

          <div className="right-align-buttons">{this.loginLogic()}</div>
        </div>
        {this.props.location.pathname.split("/").slice(-1)[0] !== "profile" &&
        this.props.location.pathname.split("/").slice(-1)[0] !== "add-topic"
          ? this.loginLogicSearch()
          : null}
      </>
    );
  }
}

export default withRouter(Navbar);
