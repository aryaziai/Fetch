import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class SearchItems extends Component {
  constructor() {
    super();
    this.state = {
      favorite: false
    };
  }

  toggleImage = () => {
    this.setState(state => ({ favorite: !state.favorite }));
  };

  render() {
    let favorite;
    if (this.state.favorite === true) {
      favorite = "https://aryaziai.github.io/Fetch/heart.png";
    } else {
      favorite = "https://aryaziai.github.io/Fetch/unheart.png";
    }
    // let searchName = this.props.location.pathname.split("/").slice(-1)[0];
    return (
      <>
        <div className="newmain">
          <img
            src="magnifying.png"
            alt="topic_logo"
            className="feeditemslogo"
          />

          <div className="caption">
            {" "}
            <b className="CategoryTitle">
              {this.props.searchPost.source.name}{" "}
            </b>
            <p className="date">
              Published on{" "}
              {new Date(this.props.searchPost.publishedAt).toString()}
            </p>
            <br></br>
            {this.props.searchPost.title}
            <br />{" "}
            <a
              className="post_link"
              href={this.props.searchPost.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {this.props.searchPost.url}
            </a>
            <br />
            <a
              href={this.props.searchPost.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <br></br>
              <img
                src={this.props.searchPost.urlToImage}
                className="categorypostImage"
              />
            </a>
            <br />
          </div>

          <div className="bottomofCard">
            <p className="favorite">
              <img
                src={favorite}
                alt="favorite"
                name="favorite"
                className="favorite"
                onClick={this.toggleImage}
              />
              Favorite
              <a
                href={`sms:Text Someone&body=${this.props.searchPost.title}%0D%0A%0D%0A${this.props.searchPost.url}`}
              >
                <img
                  src="imessage.png"
                  alt="imessage"
                  name="imessage"
                  className="iMessage"
                />
                iMessage
              </a>
              <a
                href={`mailto:?subject=${this.props.searchPost.title}&body=Hey you!%0D%0A%0D%0ACheck out this cool article I found on Fetch:%0D%0A%0D%0A${this.props.searchPost.url}`}
              >
                <img src="mail.png" alt="email" className="email" />
                Email
              </a>
            </p>

            <p className="sourceinfo">
              Source: {this.props.searchPost.source.name}
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(SearchItems);
