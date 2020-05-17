import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import CategoryItems from "./CategoryItems";
// import CategorySidebar from "../containers/CategorySidebar";

class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryPosts: [],
      categoryName: "",
    };
  }

  render() {
    let topicUrl = this.props.location.pathname.split("/").slice(-1)[0];
    return (
      <>
        <div className="topdog">
          <h3 className="categoryfeedtitle">
            <span className="searchTitle">#{topicUrl}</span>
            <img
              src="/images/refresh.png"
              className="feedtitleimage"
              alt="feedicon"
              onClick={this.props.fetchFromGoogle}
            />
          </h3>

          <div className="categorydrop"></div>

          {this.props.categoryPosts.map((post) => (
            <CategoryItems
              topicPost={post}
              key={post.url}
              categoryName={this.state.categoryName}
              deletePostFromCategory={this.props.deletePostFromCategory}
            />
          ))}
        </div>
      </>
    );
  }
}

export default withRouter(Category);
