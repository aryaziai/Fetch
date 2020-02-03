import React, { Component } from 'react'


export default class SidebarItems extends Component {
    render() {
        return (
            <p class="sidebaritems">
               <img src={this.props.topic.logo}/> {this.props.topic.topic_title}
            </p>
        )
    }
}
