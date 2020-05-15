import React, { Component } from "react";
import { Link } from "react-router-dom";
// import Slider from "react-animated-slider";
// import "react-animated-slider/build/horizontal.css";
import Testimonials from "./Testimonials";

export default class Welcome extends Component {
  render() {
    return (
      <div className="welcome">
        <div className="create_experience">
          Create your personalized
          <br />
          news experience
          <br />
          {/* Create your personalized <span class="break">news experience</span> */}
          <Link to="/Fetch/signup">
            <h1 className="goldbutton"> Join Today</h1>
          </Link>
        </div>

        <div className="notbrands">
          <p className="bigtime">
            <img
              src="https://fetchnow.org/search.png"
              width="120px"
              alt="search"
            />
            <br />
            <br />
            <b>Find Articles</b>
            <br />
            Create topics that you are interested
            <br /> in and we will do the rest.
          </p>
          <p className="bigtime">
            <img
              src="https://fetchnow.org/globe.png"
              width="120px"
              alt="globe"
            />
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
              src="https://fetchnow.org/monitor.png"
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
          <h1>Popular Sources</h1>
          <div className="brandimages">
            <img src="https://fetchnow.org/cnn.png" alt="cnn"></img>
            <br />
            <img src="https://fetchnow.org/fox.jpg" alt="fox"></img> <br />
            <img src="https://fetchnow.org/msnbc.png" alt="msnbc"></img> <br />
            <img src="https://fetchnow.org/bbc.jpeg" alt="bbc"></img> <br />
          </div>
        </div>
        <h1 className="finalh1">Testimonials</h1>
        <Testimonials />
      </div>
    );
  }
}
