import React, { Component } from 'react'
import FeedItems from './FeedItems'

export default class Feed extends Component {


    componentDidMount() {
       
    }

    // <FeedItems topicPost={fuckingtopic} key={fuckingtopic.id} />

    render() {
        console.log("hey alltopicposts", this.props.allTopicPosts)
        return (
            <>
            <h3 className="mainfeedtitle">Fetch Feed<img src="https://i.imgur.com/73wGrpL.png" className="feedtitleimage" 
            alt="feedicon" onClick={this.props.fetchToTopicId}/></h3>

            <div className="drop"></div>
            {this.props.allTopicPosts.length !== 0 ? this.props.allTopicPosts.posts.map(topicPost => console.log(topicPost) )
            // topicPost.map(fuckingTopic => 
            //     <FeedItems topicPost={fuckingTopic} key={fuckingTopic.id} />)) 
            : <><div className="lds-dual-ring"></div></> 
            }
            
            <img src="https://cdn0.iconfinder.com/data/icons/navigation-set-arrows-part-one/32/ChevronUpCircle-512.png" onClick={()=> window.scrollTo({ top: 0, behavior: 'smooth' })} className="scrollTop" alt="ScrollTop" />
            </>
        )
    }
}
