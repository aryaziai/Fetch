import React, { Component } from "react";
// import { withRouter } from "react-router-dom";
import TopicItems from "../containers/TopicItems";

export default class Topic extends Component {
  render() {
    // console.log(this.props.topicsFollowed.map(topic => topic))
    let topicUrl = this.props.location.pathname.split("/").slice(-1)[0];

    let correctTopicId = this.props.topicsFollowed.find(
      x => x.topic_title.toLowerCase() === topicUrl
    );

    // console.log(correctTopicId)
    let postsOfTopic;
    if (correctTopicId) {
      postsOfTopic = this.props.allTopicPosts.filter(
        post => correctTopicId.id === post.topic_id
      ); // compare inside of iteration!
    }

    return (
      <>
        <h3 className="categoryfeedtitle">
          Topic: <span className="searchTitle">#{topicUrl}</span>
        </h3>
        {correctTopicId ? (
          <img
            src="x.png"
            className="deletetopic"
            alt="feedicon"
            onClick={this.props.deleteTopic}
            id={correctTopicId.id}
            key={correctTopicId.id}
          />
        ) : null}
        <div className="categorydrop"></div>

        {correctTopicId
          ? postsOfTopic.map(topic => (
              <TopicItems
                topicsFollowed={this.props.topicsFollowed}
                topicPost={topic}
                deletePostFromTopic={this.props.deletePostFromTopic}
              />
            ))
          : null}
      </>
    );
  }
}
