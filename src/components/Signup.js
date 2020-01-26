import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";


export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
    //   password_confirm: ""
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

        <Form onSubmit={(e) => {this.props.handleSignupSubmit(e, this.state) }}>
                    <h1>Signup</h1>
        <Form.Group controlId="formBasicUsername">
          <Form.Control type='text' name="username" placeholder="Username" onChange={(e) => this.handleChange (e)} value={this.state.username}/>
        
        </Form.Group>

        <br></br>
      
        <Form.Group controlId="formBasicPassword">
          <Form.Control type='password' name="password" placeholder="Password" onChange={(e) => this.handleChange(e)} value={this.state.password}/>
        </Form.Group>
        <br></br>


        {/* <Form.Group controlId="formBasicPasswordAgain">
          <Form.Control type='text' name="confirm_password" placeholder="Confirm Password" onChange={(e) => this.handleChange(e)} value={this.state.password_confirm}/>
        </Form.Group>
        <br></br> */}




        <Button variant="primary-submit" type="submit">
          Create Account
        </Button>
      </Form>
    );
  }
}
