import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: ""
    };
  }

  handleChange = e => {
    //   console.log(e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className="logincontainer">
        <h2>Sign In</h2>
        <div className="loginFormlife" align="center">
          <Form
            onSubmit={e => {
              this.props.handleLoginSubmit(e, this.state);
            }}
          >
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="text"
                name="username"
                placeholder="Username"
                onChange={e => this.handleChange(e)}
                value={this.state.username}
              />
            </Form.Group>

            <br></br>

            <Form.Group controlId="formBasicLoginPassword">
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                onChange={e => this.handleChange(e)}
                value={this.state.password}
              />
            </Form.Group>

            <Button variant="primary-submit" type="submit">
              Sign In
            </Button>
          </Form>
          {<p id="login-error"></p>}
        </div>
      </div>
    );
  }
}
