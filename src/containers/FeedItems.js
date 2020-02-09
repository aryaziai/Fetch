import React, { Component } from 'react'

export default class FeedItems extends Component {
    render() {
        console.log(this.props)
        return (
            <div className="newmain" > 
              
                <b>{this.props.topicPost.source}</b>
               <p className="caption">{this.props.topicPost.caption}<br/> <a href={this.props.topicPost.url}  target="_blank">{this.props.topicPost.url}</a> </p>
               <a href={this.props.topicPost.url}  target="_blank"><img src={this.props.topicPost.image_url} /></a>
            </div>
        )
    }
}
