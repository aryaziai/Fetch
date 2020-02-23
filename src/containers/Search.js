import React, { Component } from "react";
import SearchItems from "./SearchItems";

export default class Search extends Component {
  render() {
    let searchTitle = this.props.location.pathname.split("/").slice(-1)[0];
    return (
      <>
        <div className="topdog">
          {/* {notFeedPath === "category"  &&  */}
          <h3 className="mainfeedtitle">
            Search: #{searchTitle}
            {/* <img
                  src="refresh.png"
                  className="feedtitleimage"
                  alt="feedicon"
                  onClick={this.props.fetchFromGoogle}
                /> */}
          </h3>

          <div className="drop"></div>

          {this.props.searchPosts.map(post => (
            <SearchItems
              searchPost={post}
              key={post.url}
              //   categoryName={this.props.categoryName}
              deletePostFromCategory={this.props.deletePostFromCategory}
            />
          ))}
        </div>
      </>
    );
  }
}
