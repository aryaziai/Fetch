import React, { Component } from "react";
import FeedItems from "./FeedItems";
// import CategorySidebar from "../containers/CategorySidebar";

export default class Feed extends Component {
  render() {
    return (
      <>
        <h3 className="mainfeedtitle">
          Fetch Feed
          <img
            src="https://fetchnow.org/refresh.png"
            className="feedtitleimage"
            alt="feedicon"
            onLoad={this.props.delayFetch}
            onClick={this.props.fetchToTopicId}
          />
        </h3>

        <div className="drop"></div>
        {this.props.allTopicPosts !== null &&
        this.props.allTopicPosts.length !== 0 ? (
          this.props.allTopicPosts.map((topicPost) => (
            <FeedItems
              deletePostFromTopic={this.props.deletePostFromTopic}
              topicsFollowed={this.props.topicsFollowed}
              topicPost={topicPost}
              key={topicPost.id}
            />
          ))
        ) : (
          <div className="lds-dual-ring"></div>
        )}
      </>
    );
  }
}
