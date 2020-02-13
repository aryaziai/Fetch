import React, { Component } from "react";
import { Form } from "react-bootstrap";


export default class AddTopic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topic_title: "",
      page_size: 5,
      language: "en",
      plus: true,
      sort_by: "relevancy",
      logo: "/missing.png",
      user_id: props.currentUser.id,
      toggleUpload: false
    };
  }

  alertMe = () => {
    window.alert("Cool story bro");
  };

  toggleImage = () => {
    this.setState(state => ({ plus: !state.plus }));
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  avoidSpace = e => {
    if (e.key === " " || e.key >= 0 || e.key < 10) {
      console.log("spacebar:", e.key);
      e.preventDefault();
    }
  };

  
  showImage = () => {
    if (this.state.toggleUpload === true) {
      this.setState({toggleUpload:false})
    } else {
      this.setState({toggleUpload:true})
    }
  }
  render() {
    let imageLife;
    if (this.state.plus === true) {
      imageLife = "/toggleon.png";
    } else {
      imageLife = "/toggleoff.png";
    }

 


    return (
      <div>
        <h2 className="addtopictitle">Add a New Topic</h2>
        <br />
        <div className="add-topic">
          <Form
            onSubmit={e => {
              this.props.handleSubmitTopic(e, this.state);
            }}
          >
            <Form.Group controlId="formBasicTopicTitle">
              <p className="hashtag">#</p>
              <Form.Control
                type="text"
                name="topic_title"
                placeholder="TopicTitle"
                onKeyPress={e => this.avoidSpace(e)}
                onChange={e => this.handleChange(e)}
                value={this.state.topic_title}
              />
            </Form.Group>
            <br />
            <br />
            <h2 className="addtopiclogo">Add Logo</h2>
            <br />


            <img
              src={this.state.logo}
              name="logo"
              className="missing"
              // onClick={this.alertMe}
              alt="missing"
              // onKeyPress={e => this.avoidSpace(e)}
              id="on"
              // onClick={e => this.showImage(e)}
              value="/missing.png"
            />

            {this.state.toggleUpload === true ? 

            <div className="upload_image" >
              <Form.Group controlId="formBasicTopicLogo">
              <Form.Control
                type="text"
                name="logo"
                placeholder="Insert Logo URL"
                onKeyPress={e => this.avoidSpace(e)}
                onChange={e => this.handleChange(e)}
              />
            </Form.Group>

            </div>

            : null }




            <p 
            // onClick={this.alertMe} 
            onClick={e => this.showImage(e)}
            className="uploadimage">
              Upload File
            </p>
            <br /> <h2 className="addsourcehandle">Language</h2>
            <p className="handleLife">
              <select
                value={this.state.language}
                className="language"
                name="language"
                onChange={e => this.handleChange(e)}
              >
                <option value="en">English</option>
                <option value="ar">Arabic</option>
                <option value="de">German</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="it">Italian</option>
                <option value="nl">Dutch</option>
                <option value="pt">Portuguese</option>
                <option value="ru">Russian</option>
                <option value="zh">Zhōngwén</option>
              </select>
            </p>
            <br /> <br></br> <br /> <br /> <br></br> <br /> <br />










           <h2 className="addsourcehandle">Sort By</h2>
            <p className="handleLife">
              <select
                value={this.state.sort_by}
                className="sort_by"
                name="sort_by"
                onChange={e => this.handleChange(e)}
              >
                <option value="relevancy">Relevance</option>
                <option value="publishedAt">Latest</option>
                <option value="popularity">Popular</option>

              </select>
            </p>
            <br /> <br></br> <br /> <br /> <br></br> <br /> <br />






            <h2 className="addsourcehandle">Results</h2>
            <p className="handleLife">
              <select
                value={this.state.page_size}
                className="page_size"
                name="page_size"
                onChange={e => this.handleChange(e)}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </p>
            <br />
            <br></br> <br />
            <br />
            <br></br>
            <p className="handleLife">
              <img
                src={imageLife}
                alt="relatednews"
                name="plus"
                className="toggleHandle"
                onClick={this.toggleImage}
              />
              Results must include topic title 
            </p>
            <br></br>
            <div className="submitTopic">
              <button
                onClick={() => this.props.history.push("/feed")}
                className="submitTopic-btton-nevermind"
              >
                Nevermind
              </button>
              <button className="submitTopic-btton">Create Topic</button>
              <br></br>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}