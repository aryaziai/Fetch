import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      first_name: "",
      last_name: "",
      username: "",
      password: "",
      password_confirmation: ""
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
      <div className="logincontainer">
          <h3>Create your account</h3>
        <div className="Formlife" align="center">
        <Form onSubmit={(e) => {this.props.handleSignupSubmit(e, this.state) }}>


      <div className="signupstuff">
        <Form.Group controlId="formBasicFirstName">
          <Form.Control type='text' name="first_name" placeholder="First Name" onChange={(e) => this.handleChange (e)} value={this.state.first_name}/>
        
        </Form.Group>

  

        <Form.Group controlId="formBasicLastName">
          <Form.Control type='text' name="last_name" placeholder="Last Name" onChange={(e) => this.handleChange (e)} value={this.state.last_name}/>
        
        </Form.Group>

        </div>

        <br></br><br/>


        <Form.Group controlId="formBasicUsername">
          <Form.Control type='text' name="username" placeholder="Username*" onChange={(e) => this.handleChange (e)} value={this.state.username}/>
        
        </Form.Group>

        <br></br>
      
        <Form.Group controlId="formBasicPassword">
          <Form.Control type='password' name="password" placeholder="Password *" onChange={(e) => this.handleChange(e)} value={this.state.password}/>
        </Form.Group>

        <br></br>
      
      <Form.Group controlId="formBasicPassword">
        <Form.Control type='password' name="password_confirmation" placeholder="Confirm Password *" onChange={(e) => this.handleChange(e)} value={this.state.password_confirmation}/>
      </Form.Group>


        {/* <Form.Group controlId="formBasicPasswordAgain">
          <Form.Control type='text' name="confirm_password" placeholder="Confirm Password" onChange={(e) => this.handleChange(e)} value={this.state.password_confirm}/>
        </Form.Group>
        <br></br> */}




        <Button variant="primary-submit" type="submit">
          Next
        </Button>
        </Form>
      {<p id="login-error"></p>}
      </div>
      </div>
    );
  }
}
