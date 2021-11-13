import React from 'react';
import { connect } from 'react-redux';
import { addLike } from '../actions/posts';

class Comment extends React.Component {
  handleCommentLike = () => {
    const { comment, postId, auth } = this.props;
    this.props.dispatch(addLike(postId, 'Comment', auth.user._id, comment._id));
  };

  render() {
    const { comment, auth } = this.props;
    const isCommentLikedByUser = comment.likes.includes(auth.user._id);
    return (
      <div className="post-comment-item">
        <div className="post-comment-header">
          <span className="post-comment-author">{comment.user.name}</span>
          <span className="post-comment-time">a minute ago</span>
          <span className="post-comment-likes">
            {comment.likes.length} likes
          </span>
        </div>

        <div className="post-comment-content">{comment.content}</div>
        <div className="comment-like" onClick={this.handleCommentLike}>
          {isCommentLikedByUser ? (
            <img
              src="https://cdn-icons-png.flaticon.com/512/833/833472.png"
              alt="likes-icon"
            />
          ) : (
            <img
              src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png"
              alt="likes-icon"
            />
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    auth,
  };
}

export default connect(mapStateToProps)(Comment);
