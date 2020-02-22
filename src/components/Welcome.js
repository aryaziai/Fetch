import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Welcome extends Component {
  render() {
    return (
      <div className="welcome">
        <h1 className="create_experience">
          Create your personalized
          <br />
          news experience
        </h1>

        <div className="notbrands">
          <p className="bigtime">
            <img src="/Fetch-Frontend/search.png" width="120px" alt="search" />
            <br />
            <br />
            <b>Find Articles</b>
            <br />
            Create topics that you are interested
            <br /> in and we will do the rest.
          </p>
          <p className="bigtime">
            <img src="/Fetch-Frontend/globe.png" width="120px" alt="globe" />
            <br />
            <br />
            <b>Select Language</b>
            <br />
            Need your news in a different language?
            <br />
            Select from other 10 languages.
          </p>
          <p className="bigtime">
            <img
              src="/Fetch-Frontend/monitor.png"
              width="120px"
              alt="monitor"
            />
            <br />
            <br />
            <b>Customize Results</b>
            <br />
            Don't like a certain article in your feed?
            <br /> No worries! Just click the x icon.
          </p>
        </div>

        <div className="brands">
          <h1>Sources we use:</h1>
          <img src="/Fetch-Frontend/cnn.png" width="100px" alt="cnn"></img>
          <img src="/Fetch-Frontend/fox.png" width="200px" alt="fox"></img>
          <img src="/Fetch-Frontend/bbc.png" width="130px" alt="bbc"></img>&
          More...
        </div>
        <h1 className="finalh1">Join Today</h1>
        <div className="align-buttons">
          <p className="coolbutton">
            <Link to="/signup">Signup</Link>
          </p>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    );
  }
}
