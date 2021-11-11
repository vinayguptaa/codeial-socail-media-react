import React from 'react';
import { FriendsListItem } from './';

const FriendsList = (props) => {
  return (
    <div className="friends-list">
      <div className="header">Friends</div>
      {props.friends && props.friends.length === 0 && (
        <div className="no-friends">No friends found!</div>
      )}

      {props.friends &&
        props.friends.map((friend) => (
          <FriendsListItem
            friend={friend.to_user}
            key={(Math.random() + 1).toString(36).substring(7) + friend._id}
          />
        ))}
    </div>
  );
};

export default FriendsList;
