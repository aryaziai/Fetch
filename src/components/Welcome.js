import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Welcome extends Component {
    render() {
        return (
            <div className="welcome">
                <h1 className="create_experience">Create your personalized<br/>news experience</h1>
                
                <div className="blurbs" align="center">
                    <div className="hey">
                <img src="https://i.imgur.com/MzoXkW9.png" alt="firstblurb"/> hello world forever
                </div>
                <div className="hey">
                <img src="https://i.imgur.com/MzoXkW9.png" alt="secondblurb"/> hello world forever
                </div>
                <div className="hey">
                <img src="https://i.imgur.com/MzoXkW9.png" alt="thirdblurb"/> hello world forever
                </div>
                </div>

                <div className="brands">
                <h1>Platforms we use:</h1>
                    <img src="https://i.imgur.com/8EAPyPK.png" width="80px" alt="instagram"></img>
                    <img src="https://i.imgur.com/HPG9CCq.png" width="120px" alt="twitter"></img>
                    <img src="https://i.imgur.com/UXv8wYl.png" alt="youtube"></img>
                    <img src="https://i.imgur.com/K2f5FSn.png" alt="googlenews"></img></div>
            <h1>Join Today</h1>
            <div className="align-buttons">
    <p className="coolbutton"><Link to='/signup'>Signup</Link></p><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    
            </div>
            </div>
        )
    }
}
