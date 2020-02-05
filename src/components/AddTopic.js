import React, { Component } from 'react'
import { Form } from "react-bootstrap";
export default class AddTopic extends Component {


    constructor(props) {
        super(props);
    
        this.state = {
           topic_title: "",
           instagram: "",
           twitter: "",
           youtube: "",
           google_news: true,
           logo:"https://i.imgur.com/yVM8C5B.png",
           user_id: props.currentUser.id
        };
      }

      alertMe = () => {
          window.alert("Cool story bro")
      }


      toggleImage = () => {
        this.setState(state => ({ google_news: !state.google_news }))
      }

      handleChange = (e) => {
       this.setState ({
        [e.target.name]: e.target.value
       })
      }


    render() {
        let imageLife
        if (this.state.google_news === true) {
            imageLife='https://i.imgur.com/TS5cNxp.png'
        }
        else {
        imageLife='https://i.imgur.com/IwQ9Fa2.png'
        }


        return (
            <div>
            <h2 className="addtopictitle">Add a New Topic</h2><br/>
            <div className="add-topic">

<Form onSubmit={(e) => {this.props.handleSubmitTopic(e, this.state) }}>

                        <Form.Group controlId="formBasicTopicTitle">
          <Form.Control type='text' name="topic_title" placeholder="Create Topic Name" onChange={(e) => this.handleChange(e)} value={this.state.topic_title}/>
        
   
        </Form.Group><br/><br/>
        <h2 className="addtopiclogo">Add Logo</h2><br/>
        <img src="https://i.imgur.com/yVM8C5B.png"  name="logo" className="missing" onClick={this.alertMe} alt="missing" onChange={(e) => this.handleChange(e)} value="https://i.imgur.com/yVM8C5B.png"/>
        <button onClick={this.alertMe}  className="uploadimage">Upload File</button>
        <br/> <h2 className="addsourcehandle">Add Source Handle</h2>

        <p className="handleLife"><img src="https://i.imgur.com/12tHoJG.png" width="20px" height="20px" alt="instagram"></img>Instagram.com/         

        <Form.Group controlId="formBasicTopicInstagram">
          <Form.Control type='text' name="instagram" placeholder="Profile" alt="instagram" onChange={(e) => this.handleChange (e)} value={this.state.instagram}/>
          </Form.Group>
          </p>

          <br/><br></br>          <br/>
        <p className="handleLife"><img src="https://i.imgur.com/YZQLf2D.png" alt="twitter" width="20px" height="20px" className="twitter"></img>Twitter.com/         

        <Form.Group controlId="formBasicTopicTwitter">
          <Form.Control type='text' name="twitter" placeholder="Profile" onChange={(e) => this.handleChange (e)} value={this.state.twitter}/>
          </Form.Group>
          </p>


          <br/><br></br> <br/>
        <p className="handleLife"><img src="https://i.imgur.com/UVUR8TT.png" alt="youtube" className="youtube" width="20px" height="20px"></img>Youtube.com/         

        <Form.Group controlId="formBasicTopicYoutube">
          <Form.Control type='text' name="youtube" placeholder="Channel id, e.g. UC4cCjKsLJiYTZFnhROl7Ihg" onChange={(e) => this.handleChange (e)} value={this.state.youtube}/>
          </Form.Group>
          </p>
          
          <br/><br></br>          <br/>
          
          <p className="handleLife"><img src={imageLife} alt="relatednews" name="google_news" className="toggleHandle" onClick={this.toggleImage}/>Related News</p>
          
          <br></br>
          <div className="submitTopic">
          <button onClick={() => this.props.history.push("/feed")} className="submitTopic-btton-nevermind">Nevermind</button>
          <button className="submitTopic-btton">Create Topic</button><br></br>
          </div>
          </Form>
        </div>
           </div>

        )
    }
}
