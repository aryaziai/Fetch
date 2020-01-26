import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {

  loginLogic = () => {
   if (Object.keys(this.props.currentUser).length === 0) {
    return (
      <div>
        {/* {console.log(this.props.currentUser["username"])} */}

    <p><Link to='/login'><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/1920px-User_font_awesome.svg.png" alt="login"/>Login</Link></p><br/><br/>
    <p><Link to='/signup'><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/1920px-User_font_awesome.svg.png" alt="signup" />Signup</Link></p>
    
    </div>
    )
   }
   else {
     return (
      <div>
            <p><Link to='/feed'><img src="https://i.imgur.com/jq9YZJU.png" alt="feed"/>Feed</Link></p><br/><br/>
  <p onClick={this.props.handleLogout}><Link to='/'><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/1920px-User_font_awesome.svg.png" alt="logout" />Logout</Link></p>
    </div>
     ) }
  }




  render() {
    return (
      
        <header className="App-header">
              <Link to='/'><img className="logo" src="https://i.imgur.com/o46jGmY.png" alt="logo"/></Link>
              <p><Link to='/'><img src="https://i.imgur.com/bW5PXpG.png" alt="home"/>Home</Link></p>
         {this.loginLogic()}
       </header>
    );
  }

}

export default Header;
