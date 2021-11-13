import React, { Component } from 'react';
import { PostsList, FriendsList, Chat } from '.';

class Home extends Component {
  render() {
    const { posts, friends, isLoggedIn, fetchInProgress } = this.props;
    return (
      <div className="home">
        <PostsList posts={posts} />
        {isLoggedIn && (
          <FriendsList friends={friends} fetchInProgress={fetchInProgress} />
        )}
        {isLoggedIn && <Chat />}
      </div>
    );
  }
}

export default Home;
