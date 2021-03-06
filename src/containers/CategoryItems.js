import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class CategoryItems extends Component {
  constructor() {
    super();
    this.state = {
      favorite: false,
    };
  }

  toggleImage = () => {
    this.setState((state) => ({ favorite: !state.favorite }));
  };

  render() {
    let favorite;
    if (this.state.favorite === true) {
      favorite = "/images/heart.png";
    } else {
      favorite = "/images/unheart.png";
    }

    let categoryName = this.props.location.pathname.split("/").slice(-1)[0];

    let categoryImage = `/images/${categoryName}.png`;
    //    console.log(this.props)

    let sourceTrim = this.props.topicPost.source.name.replace(/[^\w\s]/gi, "");
    sourceTrim = sourceTrim.split(" ").join("");
    let linktrim =  this.props.topicPost.title.replace(/[^\w\s]/gi, "");
    let newURl = `https://${sourceTrim}.com/${linktrim}`
      .split(" ")
      .join("_")
      .toLowerCase();

    return (
      <>
        <div className="card">
          <img src={categoryImage} alt="topic_logo" className="feeditemslogo" />

          <div className="caption">
            <b className="CategoryTitle">#{categoryName} </b>
            <button
              id={this.props.topicPost.url}
              onClick={(event) => this.props.deletePostFromCategory(event)}
              className="xOut"
            >
              x
            </button>
            <p className="date">
              Published on&nbsp;
              {new Date(this.props.topicPost.publishedAt).toString()}
            </p>
            <br></br>
            {this.props.topicPost.title}
            <br />
            <a
              className="post_link"
              href={this.props.topicPost.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {newURl}
            </a>
            <br />
            <a
              href={this.props.topicPost.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <br></br>
              <img
                src={this.props.topicPost.urlToImage}
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
                href={`sms:Text Someone&body=${this.props.topicPost.title}%0D%0A%0D%0A${this.props.topicPost.url}`}
              >
                <img
                  src="/images/imessage.png"
                  alt="imessage"
                  name="imessage"
                  className="iMessage"
                />
                iMessage
              </a>
              <a
                href={`mailto:?subject=${this.props.topicPost.title}&body=Hey you!%0D%0A%0D%0ACheck out this cool article I found on Fetch:%0D%0A%0D%0A${this.props.topicPost.url}`}
              >
                <img src="/images/mail.png" alt="email" className="email" />
                Email
              </a>
            </p>

            <p className="sourceinfo">
              Source: {this.props.topicPost.source.name}
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(CategoryItems);
