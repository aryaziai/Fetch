import React, { Component } from 'react'

export default class Feed extends Component {


    componentDidUpdate() {
        if (this.props.topicsFollowed === undefined && this.props.topicsFollowed !== 0 ) { // nice trick from matt.
            // this.props.fetchFromGoogle() 
        }
    }

        // working on Getting posts from backend
    //  getPosts = () => {
    //         fetch(`http://localhost:3000/users/${this.props.currentUser.id}`)
    //           .then(res => res.json())
    //           .then(result => {
    //             console.log(result)
    //             });
    // };


    render() {
        // console.log( this.props.fetchFromGoogle);
        
        return (
            <>
            <h3 className="mainfeedtitle">Fetch Feed<img src="https://i.imgur.com/73wGrpL.png" className="feedtitleimage" alt="feedicon" onClick={this.props.fetchFromGoogle}/></h3>
            <div className="newmain" >


                {/* <p>Oops it's looks like you don't have any <Link to='/add-topic'>Topics</Link>.</p> */}
                
            </div>
            <img src="https://cdn0.iconfinder.com/data/icons/navigation-set-arrows-part-one/32/ChevronUpCircle-512.png" onClick={()=> window.scrollTo({ top: 0, behavior: 'smooth' })} className="scrollTop" alt="ScrollTop" />
            </>
        )
    }
}
