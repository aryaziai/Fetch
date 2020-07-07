import React from "react";
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
            <h1>one</h1>
          </div>




        </div>
      </div>
    </section>
  );
}
