import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';


class Topic extends Component {



    componentDidMount(){


    // this.props.topicsFollowed !== null ? this.props.topicsFollowed.map(topic => 
    //     topic.topic_title)  : <><div className="lds-dual-ring"></div></> 
    //     console.log(currentTopic)
    
    }



    




    render() {

        
        let topicUrl = this.props.location.pathname.split("/").slice(-1)[0]

        return (
            <>
            <h3 className="mainfeedtitle">Topic: {topicUrl}<img src="https://i.imgur.com/73wGrpL.png" className="feedtitleimage" alt="feedicon" onClick={this.props.fetchFromGoogle}/></h3>
            <div className="newmain" >
                {/* {console.log(this.props.topicsFollowed)} */}
               {/* {console.log(this.props.topicsFollowed)} */}
           {/* {this.props.topic.topic_title.toLowerCase()} */}
            </div>
            </>
        )
    }
}

export default withRouter(Topic);
