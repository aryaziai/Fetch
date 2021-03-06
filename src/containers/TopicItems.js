import React, { Component } from "react";

export default class TopicItems extends Component {
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

    let correctOne = this.props.topicsFollowed.find(
      (x) => x.id === this.props.topicPost.topic_id
    );

    let sourceTrim = this.props.topicPost.source.split(" ").join("");
    let linktrim = this.props.topicPost.caption.replace(/[^\w\s]/gi, "");
    let newURl = `https://${sourceTrim}.com/${linktrim}`
      .split(" ")
      .join("_")
      .toLowerCase();

    return (
      <div className="card">
        {/* {console.log(this.props.topicPost)} */}

        <img src={correctOne.logo} alt="topic_logo" className="feeditemslogo" />

        <div className="caption">
          <b>#{correctOne.topic_title}</b>
          <button
            id={this.props.topicPost.id}
            onClick={(event) => this.props.deletePostFromTopic(event)}
            className="xOut"
          >
            x
          </button>
          <p className="date">
            Published on&nbsp;
            {new Date(this.props.topicPost.published_at).toString()}
          </p>
          <br></br>
          {this.props.topicPost.caption}
          <br />
          <a
            className="post_link"
            href={this.props.topicPost.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {newURl}
          </a>
        </div>

        <a
          href={this.props.topicPost.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={this.props.topicPost.image_url} className="feedpostImage" />
        </a>
        <br />

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
              href={`sms:Text Someone&body=${this.props.topicPost.caption}%0D%0A%0D%0A${this.props.topicPost.url}`}
            >
              <img
                src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/speech_bubble-512.png"
                alt="imessage"
                name="imessage"
                className="iMessage"
              />
              iMessage
            </a>
            <a
              href={`mailto:?subject=${this.props.topicPost.caption}&body=Hey you!%0D%0A%0D%0ACheck out this cool article I found on Fetch:%0D%0A%0D%0A${this.props.topicPost.url}`}
            >
              <img src="/images/mail.png" alt="email" className="email" />
              Email
            </a>
          </p>

          <p className="sourceinfo">Source: {this.props.topicPost.source}</p>
        </div>
      </div>
    );
  }
}
