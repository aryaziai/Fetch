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
        <h4>Footer Section</h4>
      </div>
    </section>
  );
}
