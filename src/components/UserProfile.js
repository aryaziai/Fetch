import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
      first_name: "",
      last_name: "",
      username: "",
      password: "",
      password_confirmation: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    this.setState({
      currentUser: this.props.currentUser
    });
  }

  handleEditProfile = (event, SignupInfo) => {
    event.preventDefault();
    fetch("https://fetch-backend-api.herokuapp.com/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: SignupInfo,
        id: this.props.currentUser.id
      })
    })
      .then(resp => resp.json())
      .then(json => {
        if (json.error) {
          document.getElementById("login-error").innerText = json.error;
        } else {
          localStorage.setItem("token", json.jwt);
          //   console.log(json)
          this.setState({
            currentUser: {
              id: json.id,
              ...json
            }
          });
          this.props.history.push("/feed");
        }
      });
  };

  handleDeleteProfile = event => {
    event.preventDefault();
    fetch(
      `https://fetch-backend-api.herokuapp.com/users/${this.props.currentUser.id}`,
      {
        method: "delete",
        headers: { "Content-Type": "application/json" },
        Authorization: localStorage.getItem("token")
      }
    )
      .then(resp => resp.json())
      .then(json => {
        if (json.error) {
          window.alert(json.error);
        } else {
          this.props.handleLogout();
          window.alert("Successfully Deleted");
        }
      });
  };

  render() {
    return (
      <div className="logincontainer">
        <div className="editprofile">
          <h2>Edit Profile</h2>
          <div className="EditFormlife" align="center">
            <Form
              onSubmit={e => {
                this.handleEditProfile(e, this.state);
              }}
            >
              <div className="signupstuff">
                <Form.Group controlId="formBasicUpdateFirstName">
                  <Form.Control
                    type="text"
                    name="first_name"
                    placeholder={this.props.currentUser.first_name}
                    onChange={e => this.handleChange(e)}
                    value={this.state.first_name}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicUpdateLastName">
                  <Form.Control
                    type="text"
                    name="last_name"
                    placeholder={this.props.currentUser.last_name}
                    onChange={e => this.handleChange(e)}
                    value={this.state.last_name}
                  />
                </Form.Group>
              </div>

              <br></br>
              <br />

              <Form.Group controlId="formBasicUsername">
                <Form.Control
                  type="text"
                  name="username"
                  placeholder={this.props.currentUser.username}
                  onChange={e => this.handleChange(e)}
                  value={this.state.username}
                />
              </Form.Group>

              <br></br>

              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="•••••••"
                  onChange={e => this.handleChange(e)}
                  value={this.state.password}
                />
              </Form.Group>

              <br></br>

              <Form.Group controlId="formBasicPasswordConfirm">
                <Form.Control
                  type="password"
                  name="password_confirmation"
                  placeholder="•••••••"
                  onChange={e => this.handleChange(e)}
                  value={this.state.password_confirmation}
                />
              </Form.Group>

              <div className="editprofilebuttons">
                <button
                  onClick={event => this.handleDeleteProfile(event)}
                  className="submitTopic-btton-delete"
                >
                  Delete
                </button>
                <button
                  onClick={() => window.alert("Successfully Updated")}
                  className="submitTopic-btton"
                >
                  Update
                </button>
                {<p id="login-error"></p>}
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(UserProfile);
