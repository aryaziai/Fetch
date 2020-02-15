import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import TopicItems from "../containers/TopicItems";

class Topic extends Component {
  //        this.props.topicsFollowed.length !== 0 ? console.log(this.props.topicsFollowed) : null

  render() {
    // console.log(this.props.topicsFollowed.map(topic => topic))
    // console.log("alltopicposts",this.props.allTopicPosts)
    let topicUrl = this.props.location.pathname.split("/").slice(-1)[0];

    let correctTopicId = this.props.topicsFollowed.find(
      x => x.topic_title.toLowerCase() === topicUrl
    );

    // console.log(correctTopicId)
let postsOfTopic
    if (correctTopicId) { 
    postsOfTopic = this.props.allTopicPosts.filter(
      post => correctTopicId.id === post.topic_id
    ); // compare inside of iteration!
    }

    // console.log(postsOfTopic)

    return (
      <>
        <h3 className="mainfeedtitle" >
          #{topicUrl}
          {correctTopicId ?  <img src="/x.png" className="deletetopic" alt="feedicon" onClick={this.props.deleteTopic} id={correctTopicId.id} key={correctTopicId.id}/> : null}
         
          
        </h3>
        <div className="drop"></div>

        {correctTopicId ? postsOfTopic.map(topic => (
          <TopicItems
            topicsFollowed={this.props.topicsFollowed}
            topicPost={topic}
            deletePostFromTopic={this.props.deletePostFromTopic}
          />
        )) :  null }
      </>
    );
  }
}

export default withRouter(Topic);
