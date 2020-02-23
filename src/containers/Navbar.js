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


  handleInput = (e) => {
    this.setState({
      [e.target.name]: "hey"
    });
  };

  loginLogic = () => {
    // if not logged in
    if (Object.keys(this.props.currentUser).length === 0) {
      return (
        <>
          <div
            className="topcoolbutton"
            onClick={() => this.props.history.push("/Fetch-Frontend/signup")}
          >
            <p>Signup</p>
          </div>
          <div
            className="topcoolbutton"
            onClick={() => this.props.history.push("/Fetch-Frontend/login")}
          >
            <p>Login</p>
          </div>
        </>
      );
    } else
      return (
        <div className="profile-nav">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <img
                src="https://aryaziai.github.io/Fetch-Frontend/missing_avatar.jpg"
                alt="avatar"
              />{" "}
              {this.props.currentUser.username}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <p
                className="dropdown-item"
                onClick={() =>
                  this.props.history.push("/Fetch-Frontend/profile")
                }
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
        <div>
          <form onSubmit={e => {this.props.fetchFromSearch(e, this.state.search) && this.handleInput(e)}}>
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
      <div className="topbar">
        <Link
          to={
            Object.keys(this.props.currentUser).length === 0
              ? "/Fetch-Frontend/"
              : "/Fetch-Frontend/feed"
          }
        >
          <img
            className="logo"
            src="https://aryaziai.github.io/Fetch-Frontend/logo.png"
            alt="logo"
          />
        </Link>

        {this.loginLogicSearch()}

        <div className="right-align-buttons">{this.loginLogic()}</div>
      </div>
    );
  }
}

export default withRouter(Navbar);
