import {
  ADD_POST,
  UPDATE_POSTS,
  ADD_COMMENT,
  UPDATE_POST_LIKE,
  UPDATE_COMMENT_LIKE,
} from '../actions/actionTypes';

//root state: { posts:[], ... }
export default function posts(state = [], action) {
  switch (action.type) {
    case UPDATE_POSTS:
      return action.posts;
    case ADD_POST:
      return [action.post, ...state];
    case ADD_COMMENT:
      const newPosts = state.map((post) => {
        if (post._id === action.postId) {
          return {
            ...post,
            comments: [action.comment, ...post.comments],
          };
        }

        return post;
      });
      return newPosts;
    case UPDATE_POST_LIKE:
      const updatedPosts = state.map((post) => {
        if (post._id === action.postId) {
          return {
            ...post,
            likes: [...post.likes, action.userId],
          };
        }

        return post;
      });
      return updatedPosts;
    case UPDATE_COMMENT_LIKE:
      return state.map((post) => {
        if (post._id === action.postId) {
          const updatedComments = post.comments.map((comment) => {
            if (comment._id === action.commentId) {
              return {
                ...comment,
                likes: [...comment.likes, action.userId],
              };
            }
            return comment;
          });

          return {
            ...post,
            comments: updatedComments,
          };
        }
        return post;
      });
    default:
      return state;
  }
}
