import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {

  loginLogic = () => { // if not logged in
   if (Object.keys(this.props.currentUser).length !== 0) {
    return (
      <header className="App-header">

<div class="addtopicstuff">
<h3>Topics You Follow</h3><p class="addtext"><Link to='/add-topic'>+Add</Link></p>
</div>

<Link to='/topic/nba'>NBA</Link>
<Link to='/topic/politics'>Politics</Link>
   
    </header>
    )
   }
   else { // if logged out
     return (
      <div>
    </div>
     ) }
  }




  render() {
    return (
      
      <div>{this.loginLogic()}</div>
    );
  }

}

export default Header;
