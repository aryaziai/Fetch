import React, { Component } from "react";
import { Form } from "react-bootstrap";
// import Select from "react-dropdown-select";
export default class AddTopic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topic_title: "",
      page_size: 5,
      language: "en",
      google_news: true,
      logo: "https://i.imgur.com/yVM8C5B.png",
      user_id: props.currentUser.id
    };
  }

  alertMe = () => {
    window.alert("Cool story bro");
  };

  toggleImage = () => {
    this.setState(state => ({ google_news: !state.google_news }));
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

  render() {
    let imageLife;
    if (this.state.google_news === true) {
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
              <p class="hashtag">#</p>
              <Form.Control
                type="text"
                name="topic_title"
                placeholder="TopicName"
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
              src="/missing.png"
              name="logo"
              className="missing"
              onClick={this.alertMe}
              alt="missing"
              onKeyPress={e => this.avoidSpace(e)}
              onChange={e => this.handleChange(e)}
              value="https://i.imgur.com/yVM8C5B.png"
            />
            <button onClick={this.alertMe} className="uploadimage">
              Upload File
            </button>
            <br /> <h2 className="addsourcehandle">Language</h2>
            <p className="handleLife">
              {/* <Select countries={countries} onChange={(e) => this.handleChange(e)} /> */}

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
            <br />
            <br></br> <br />
            <br />
            <br></br> <br />
            <br /> <h2 className="addsourcehandle">Results</h2>
            <p className="handleLife">
              {/* <Select countries={countries} onChange={(e) => this.handleChange(e)} /> */}

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
            <br></br> <br />
            {/* <br/><br></br>          <br/>
        <p className="handleLife"><img src="https://i.imgur.com/YZQLf2D.png" alt="twitter" width="20px" height="20px" className="twitter"></img>Twitter.com/         

        <Form.Group controlId="formBasicTopicTwitter">
          <Form.Control type='text' name="twitter" placeholder={`ie: @${this.state.topic_title}`} onKeyPress={(e) => this.avoidSpace(e)} onChange={(e) => this.handleChange (e)} value={this.state.twitter}/>
          </Form.Group>
          </p>


          <br/><br></br> <br/>
        <p className="handleLife"><img src="https://i.imgur.com/UVUR8TT.png" alt="youtube" className="youtube" width="20px" height="20px"></img>Youtube.com/         

        <Form.Group controlId="formBasicTopicYoutube">
          <Form.Control type='text' name="youtube" placeholder="ie. UC4cCjKsLD" onKeyPress={(e) => this.avoidSpace(e)} onChange={(e) => this.handleChange (e)} value={this.state.youtube}/>
          </Form.Group>
          </p> */}
            <p className="handleLife">
              <img
                src={imageLife}
                alt="relatednews"
                name="google_news"
                className="toggleHandle"
                onClick={this.toggleImage}
              />
              Related News
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
