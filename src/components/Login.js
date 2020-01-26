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

 

  handleChange = (e) => {
    //   console.log(e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  render() {
    return (

        <Form onSubmit={(e) => {this.props.handleLoginSubmit(e, this.state) }}>
                    <h1>Login</h1>
        <Form.Group controlId="formBasicEmail">
          <Form.Control type='text' name="username" placeholder="Username" onChange={(e) => this.handleChange (e)} value={this.state.username}/>
        
        </Form.Group>

        <br></br>
      
        <Form.Group controlId="formBasicPassword">
          <Form.Control type='password' name="password" placeholder="Password" onChange={(e) => this.handleChange(e)} value={this.state.password}/>
        </Form.Group>
        <br></br>
        <Button variant="primary-submit" type="submit">
          Login
        </Button>
      </Form>
    );
  }
}
