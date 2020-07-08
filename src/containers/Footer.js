import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
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
              <img className="footer_logo" src="/images/logo.png" alt="logo" />
            </Link>
          </div>
          <div className="footer-items">
            <h3>Account</h3>
            <div class="border"></div>
            fdsfsf
          </div>
          <div className="footer-items">
            <h3>Resources</h3>
            <div class="border"></div>
            sdfsdf
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
