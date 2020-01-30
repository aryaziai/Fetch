import React, {Component} from 'react';
import api from '../services/Api';



class ProfilePage extends Component{
    constructor() {
        super()
        this.state = {
            // currentUser: {},
            currentUser: null
        }
    }

    componentDidMount() {
        console.log("Profile mounted.")

        console.log(this.state.currentUser)
        const token = localStorage.getItem('token');
        if (token) {

            api.getUser(this.props.currentUser.id).then(res => {
                console.log(res.data)
                this.setState({currentUser: res.data})
            })
        }
    }

    componentDidUpdate(){
        if (!this.state.currentUser) {
            console.log("Profile updated.")
            const token = localStorage.getItem('token');
            if (token) {
            api.getUser(this.props.currentUser.id).then(res => {
                console.log(res.data)
                this.setState({currentUser: res.data})})
        }
        }
    }

    componentWillUnmount(){
        this.setState({
            currentUser: {}
        })
    }
    
    userDelete = () => {
        api.deleteUser(this.props.currentUser.id).then(json => {console.log(json)})
    }

    render() {
    // let details
    // if(this.state.currentUser) {
    //     // if(this.props.currentUser.id.toString() === this.state.currentUser.id){
    //     details = this.state.currentUser.attributes.pictures.map(picture => <PictureProfile key = {picture.id} id = {picture.id} attribute = {picture}/>)  
    // } else {
    //     details = "Loading..."
    // }
    // // }
   
    return (
        <div className="profilePage">
            <h1>Welcome {this.props.currentUser.username}</h1>
            <button className="deleteComment"onClick ={this.userDelete}>Delete Your Account!</button>
        </div>
        ) 
    }
}

export default ProfilePage