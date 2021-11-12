import React from 'react';
import Loader from 'react-loader-spinner';
import { FriendsListItem } from './';

const FriendsList = (props) => {
  console.log(props, '.......');
  return (
    <div className="friends-list">
      <div className="header">Friends</div>
      {props.fetchInProgress && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Loader
            type="ThreeDots"
            color="#ef7917"
            timeout={3000} //2 secs
          />
        </div>
      )}
      {props.friends &&
        props.fetchInProgress === false &&
        props.friends.length === 0 && (
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
