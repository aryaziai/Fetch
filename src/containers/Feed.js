import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Feed extends Component {
    render() {
        return (
            <div class="newmain">
                Oops it's looks like you don't have any <Link to='/add-topic'>Topics</Link>.
            </div>
        )
    }
}
