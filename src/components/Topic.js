import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';


class Topic extends Component {



    componentDidMount(){
        console.log(this.props.topicsFollowed)
    
    }
    




    render() {
        let topicEndpoint = this.props.location.pathname.split("/").slice(-1)[0]

        return (
            <div><br></br><br></br><br></br><br></br>
                <h1>hey {topicEndpoint}</h1>
               {/* {console.log(this.props.topicsFollowed)} */}
           {/* {this.props.topic.topic_title.toLowerCase()} */}
            </div>
        )
    }
}

export default withRouter(Topic);
