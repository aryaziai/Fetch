import React, { Component } from "react";
import SearchItems from "./SearchItems";
import { withRouter } from "react-router-dom";

class Search extends Component {
  render() {
    let searchTitle = this.props.location.pathname.split("/").slice(-1)[0];
    return (
      <>
        <div className="topdog">
          {/* {notFeedPath === "category"  &&  */}
          <h3 className="mainfeedtitle">
            Search: #{searchTitle}
            <img
              src="https://aryaziai.github.io/Fetch/x.png"
              className="deletetopic"
              alt="feedicon"
              onClick={() => this.props.history.push("/Fetch/feed")}
            />
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

export default withRouter(Search);
