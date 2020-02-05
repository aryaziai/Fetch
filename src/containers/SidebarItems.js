import React, { Component } from 'react'
import {withRouter} from "react-router-dom";


class SidebarItems extends Component {
    render() {
        // console.log(this.props.history)
        return (
            <p className="sidebaritems" onClick={() => this.props.history.push(`/topic/${this.props.topic.topic_title.toLowerCase()}`) }>
               <img src={this.props.topic.logo} alt="topic_logo"/> {this.props.topic.topic_title}
            </p>
        )
    }
}


export default withRouter(SidebarItems);// so we can we use history.push