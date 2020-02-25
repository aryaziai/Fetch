import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import CategoryItems from "./CategoryItems";
// import CategorySidebar from "../containers/CategorySidebar";

class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryPosts: [],
      categoryName: ""
    };
  }

  render() {
    let topicUrl = this.props.location.pathname.split("/").slice(-1)[0];
    // let notFeedPath = this.props.location.pathname.split("/")[1]
    // console.log(notFeedPath)
    return (
      <>
        <div className="topdog">
          {/* {notFeedPath === "category"  &&  */}
          <h3 className="mainfeedtitle">
            #{topicUrl}
            <img
              src="https://aryaziai.github.io/Fetch/refresh.png"
              className="feedtitleimage"
              alt="feedicon"
              onClick={this.props.fetchFromGoogle}
            />
          </h3>

          <div className="drop"></div>

          {this.props.categoryPosts.map(post => (
            <CategoryItems
              topicPost={post}
              key={post.url}
              categoryName={this.state.categoryName}
              deletePostFromCategory={this.props.deletePostFromCategory}
            />
          ))}
        </div>

        {/* <div className="category">
            <h3>Categories</h3>
            <br />
              <p onClick={e => this.handleCategoryClick("business")}>#Business</p>
              <p onClick={e => this.handleCategoryClick("entertainment")}>
                #Entertainment
              </p>
              <p onClick={e => this.handleCategoryClick("general")}>#General</p>
              <p onClick={e => this.handleCategoryClick("health")}>#Health</p>
              <p onClick={e => this.handleCategoryClick("science")}>#Science</p>
              <p onClick={e => this.handleCategoryClick("sports")}>#Sports</p>
              <p onClick={e => this.handleCategoryClick("technology")}>#Technology
              
              </p>
    
           
          
          </div>  */}
      </>
    );
  }
}

export default withRouter(Category);
