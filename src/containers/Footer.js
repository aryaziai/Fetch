import React, { Component } from "react";
import { Link } from "react-router-dom";

// import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { withRouter } from "react-router-dom";

class Footer extends Component {
  loginLogic = () => {
    // if not logged in
    if (Object.keys(this.props.currentUser).length === 0) {
      return (
        <>
          <div
            className="footer-account"
            onClick={() => this.props.history.push("/login")}
          >
            <a>Sign In</a>
          </div>
          <div
            className="footer-account"
            onClick={() => this.props.history.push("/signup")}
          >
            <a>Sign Up</a>
          </div>
        </>
      );
    } else
      return (
        <div>
          <p
            className="footer-account"
            onClick={() => this.props.history.push("/profile")}
          >
            <a>Edit Profile</a>
          </p>
          <p className="footer-account" onClick={this.props.handleLogout}>
            <a>Sign Out</a>
          </p>
        </div>
      );
  };

  render() {
    return (
      <>
        <img
          src="/images/scroll.png"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="scrollTop"
          alt="ScrollTop"
        />

        <div className="Footer">
          <div className="inner-footer">
            <br />
            <br />
            <br />
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
              <div className="border"></div>

              {this.loginLogic()}
            </div>
            <div className="footer-items">
              <h3>Resources</h3>
              <div className="border"></div>
              <a href="https://gnews.io/" target="_blank">
                GNews API
              </a>
            </div>
            <div className="footer-items">
              <h3>Contact Us</h3>
              <div className="border"></div>

              <a>Customer Service</a>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Footer);
