import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Dropdown } from "react-bootstrap";
// import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { withRouter } from "react-router-dom";

class Navbar extends Component {
  constructor() {
    super();

    this.state = {
      searchItem: ""
    };
  }

  loginLogic = () => {
    // if not logged in
    if (Object.keys(this.props.currentUser).length === 0) {
      return (
        <div>
          <p
            className="topcoolbutton"
            onClick={() => this.props.history.push("/signup")}
          >
            <a>Signup</a>
          </p>
          <p
            className="topcoolbutton"
            onClick={() => this.props.history.push("/login")}
          >
            <a>Login</a>
          </p>
        </div>
      );
    } else
      return (
        <div className="profile-nav">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <img
                src="https://uwaterloo.ca/kinesiology/sites/ca.kinesiology/files/uploads/images/blank_1.jpg"
                alt="avatar"
              />{" "}
              {this.props.currentUser.username}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <p onClick={() => this.props.history.push("/profile")}>
                Edit Profile
              </p>
              <Dropdown.Item onClick={this.props.handleLogout} href="/">
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      );
  };

  loginLogicSearch = () => {
    if (Object.keys(this.props.currentUser).length !== 0) {
      return (
        <div>
          <Form.Group controlId="formBasicSearch">
            <center>
              <Form.Control
                type="text"
                name="first_name"
                placeholder="Search Topics"
                onChange={e => this.handleChange(e)}
                value={this.state.searchItem}
              />
            </center>
          </Form.Group>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="topbar">
        <Link
          to={Object.keys(this.props.currentUser).length === 0 ? "/" : "/feed"}
        >
          <img
            className="logo"
            src="https://i.imgur.com/BnZiRhH.png"
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
