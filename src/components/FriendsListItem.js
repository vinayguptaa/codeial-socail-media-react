import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/images/avatar.png';

function FriendsListItem(props) {
  return (
    <div>
      <Link className="friends-item" to={`user/${props.friend._id}`}>
        <div className="friends-img">
          <img src={avatar} alt="user-pic" />
        </div>
        <div className="friends-name">{props.friend.email}</div>
      </Link>
    </div>
  );
}

export default FriendsListItem;
