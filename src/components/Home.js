import React, { Component } from 'react';
import { PostsList, FriendsList } from '.';

class Home extends Component {
  render() {
    const { posts, friends, isLoggedIn,fetchInProgress } = this.props;
    return (
      <div className="home">
        <PostsList posts={posts} />
        {isLoggedIn && <FriendsList friends={friends} fetchInProgress={fetchInProgress} />}
      </div>
    );
  }
}

export default Home;
