import React, { Component } from "react";
import { Link } from "react-router-dom";
// import props from 'prop-types';

export default class Footer extends Component {
  loginLogic = () => {
    // if not logged in
    if (Object.keys(this.state.currentUser).length === 0) {
      return (
        <>
          <div
            className="topcoolbutton"
            onClick={() => this.props.history.push("/login")}
          >
            <p>Sign In</p>
          </div>
          <div
            className="topcoolbuttonjaz"
            onClick={() => this.props.history.push("/signup")}
          >
            <p>Sign Up</p>
          </div>
        </>
      );
    } else
      return (
        <div>
          <p
            className="dropdown-item"
            onClick={() => this.props.history.push("/profile")}
          >
            Edit Profile
          </p>
          <p className="dropdown-item" onClick={this.props.handleLogout}>
            Logout
          </p>
        </div>
      );
  };

  render() {
    return (
      <section>
        <img
          src="/images/scroll.png"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="scrollTop"
          alt="ScrollTop"
        />
        <div className="Footer">
          <div className="inner-footer">
            <div className="footer-items">
              <Link to="/">
                <img
                  className="footer_logo"
                  src="/images/logo.png"
                  alt="logo"
                />
              </Link>
            </div>
            <div className="footer-items">
              <h3>Account</h3>
              <div class="border"></div>

              {this.loginlogic}
            </div>
            <div className="footer-items">
              <h3>Resources</h3>
              <div class="border"></div>
              TBA
            </div>
            <div className="footer-items">
              <h3>Contact Us</h3>
              <div class="border"></div>
              <ul>
                <li>support@fetchnow.org</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
