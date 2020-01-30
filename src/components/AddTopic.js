import React, { Component } from 'react'
import { Form } from "react-bootstrap";
import Sidebar from "../containers/Sidebar";
export default class AddTopic extends Component {


    constructor() {
        super();
    
        this.state = {
           topic_title: "",
        };
      }

      alertMe = () => {
          window.alert("Cool story bro")
      }

    render() {
        return (

            <div class="add-topic">
<h2 class="addtopictitle">Add Topic</h2><br/>
        
                        <Form.Group controlId="formBasicTopicTitle">
          <Form.Control type='text' name="topic_title" placeholder="Topic Name" onChange={(e) => this.props.handleChange (e)} value={this.state.topic_title}/>
        
   
        </Form.Group><br/><br/><br></br><br/><br/><br></br>
        <h2 class="addtopiclogo">Add Logo</h2><br/>
        <img src="https://i.imgur.com/yVM8C5B.png" class="missing" onClick={this.alertMe} />
        <button onClick={this.alertMe}  className="uploadimage">Upload File</button>
        <br/> <h2 class="addsourcehandle">Add Source Handle</h2>
        <p className="handleLife"><img src="https://i.imgur.com/12tHoJG.png"></img>Instagram.com/         

        <Form.Group controlId="formBasicTopicInstagram">
          <Form.Control type='text' name="topic_title" placeholder="Profile" onChange={(e) => this.props.handleChange (e)} value={this.state.topic_title}/>
          </Form.Group>
          </p>

          <p>
          <Form.Group controlId="formBasicTopicTwitter">
          <Form.Control type='text' name="topic_title" placeholder="Profile" onChange={(e) => this.props.handleChange (e)} value={this.state.topic_title}/>
          </Form.Group>
          </p>


          <p>
<Form.Group controlId="formBasicTopicYoutube">
          <Form.Control type='text' name="topic_title" placeholder="Profile" onChange={(e) => this.props.handleChange (e)} value={this.state.topic_title}/>
          </Form.Group>
          </p>
          
          
          
          
          
          </div>
           

        )
    }
}
