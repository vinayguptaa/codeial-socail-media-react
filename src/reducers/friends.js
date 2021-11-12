import {
  ADD_FRIEND,
  FETCH_FRIENDS_START,
  FETCH_FRIENDS_SUCCESS,
  REMOVE_FRIEND,
} from '../actions/actionTypes';

const defaultFriendsState = {
  friends: [],
  inProgress: false,
};

export default function friends(state = defaultFriendsState, action) {
  switch (action.type) {
    case FETCH_FRIENDS_START:
      return {
        ...state,
        inProgress: true,
      };
    case FETCH_FRIENDS_SUCCESS:
      return {
        ...state,
        friends: [...action.friends],
        inProgress: false,
      };
    case ADD_FRIEND:
      return {
        ...state,
        friends: state.friends.concat(action.friend),
      };
    case REMOVE_FRIEND:
      const newArr = state.friends.filter(
        (friend) => friend.to_user._id !== action.userId
      );
      return {
        ...state,
        friends: newArr,
      };
    default:
      return state;
  }
}
