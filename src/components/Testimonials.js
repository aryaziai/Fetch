import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default class Testimonials extends Component {
  render() {
    return (
      <Carousel
        showArrows={true}
        infiniteLoop={true}
        // onChange={onChange}
        // onClickItem={onClickItem}
        // onClickThumb={onClickThumb}
      >
        <div>
          {/* <img src="assets/1.jpeg" /> */}
          <p className="legend">Legend 1</p>
        </div>
        <div>
          {/* <img src="assets/2.jpeg" /> */}
          <p className="legend">Legend 2</p>
        </div>
        <div>
          {/* <img src="assets/3.jpeg" /> */}
          <p className="legend">Legend 3</p>
        </div>
        <div>
          {/* <img src="assets/4.jpeg" /> */}
          <p className="legend">Legend 4</p>
        </div>
        <div>
          {/* <img src="assets/5.jpeg" /> */}
          <p className="legend">Legend 5</p>
        </div>
        <div>
          {/* <img src="assets/6.jpeg" /> */}
          <p className="legend">Legend 6</p>
        </div>
      </Carousel>
    );
  }
}

// Don't forget to include the css in your page
// <link rel="stylesheet" href="carousel.css"/>
// Begin DemoSliderControls
