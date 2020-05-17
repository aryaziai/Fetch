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
          <h3 className="categoryfeedtitle">
            Search: <span className="searchTitle">#{searchTitle}</span>
          </h3>
          <img
            src="/images/refresh.png"
            className="deletetopic"
            alt="feedicon"
            onClick={() => this.props.history.push("/feed")}
          />
          <div className="categorydrop"></div>

          {this.props.searchPosts.map((post) => (
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
