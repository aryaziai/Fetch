import React, { Component } from 'react'
import FeedItems from './FeedItems'

export default class Feed extends Component {


    render() {
        // console.log(this.props.allTopicPosts)
        return (
            <>
            <h3 className="mainfeedtitle">Fetch Feed<img src="https://i.imgur.com/73wGrpL.png" className="feedtitleimage" 
            alt="feedicon" onClick={this.props.fetchToTopicId}/></h3>

            <div className="drop"></div>
           {this.props.allTopicPosts !== null && this.props.allTopicPosts.length !== 0 ? this.props.allTopicPosts.map(topicPost => <FeedItems deletePostFromTopic={this.props.deletePostFromTopic} topicsFollowed={this.props.topicsFollowed} topicPost={topicPost} key={topicPost.id} />) 
            : <div className="lds-dual-ring"></div>
            }
            
           
            </>
        )
    }
}
