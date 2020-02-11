import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
import TopicItems from "../containers/TopicItems";

class Topic extends Component {


//        this.props.topicsFollowed.length !== 0 ? console.log(this.props.topicsFollowed) : null 

    render() {
        // console.log(this.props.topicsFollowed.map(topic => topic))
        // console.log("alltopicposts",this.props.allTopicPosts)
        let topicUrl = this.props.location.pathname.split("/").slice(-1)[0]

        let correctTopicId = this.props.topicsFollowed.find(x=> x.topic_title === topicUrl)

        let postsOfTopic = this.props.allTopicPosts.filter(post => 
            correctTopicId.id === post.topic_id) // compare inside of iteration!

            console.log(postsOfTopic)



        return (
            <>
            <h3 className="mainfeedtitle">#{topicUrl}<img src="https://i.imgur.com/73wGrpL.png" className="feedtitleimage" alt="feedicon" onClick={this.props.fetchFromGoogle}/></h3>
            <div className="drop"></div> 

                {postsOfTopic.map(topic =>
                      <TopicItems topicsFollowed={this.props.topicsFollowed} topicPost={topic}/>
                    )}
              
            </>
        )
    }
}

export default withRouter(Topic);
