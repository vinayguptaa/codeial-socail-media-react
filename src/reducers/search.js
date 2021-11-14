import {
  FETCH_SEARCH_RESULTS_START,
  FETCH_SEARCH_RESULTS_SUCCESS,
} from '../actions/actionTypes';

const initialSearchState = {
  results: [],
  searchInProgress: false,
};

export default function search(state = initialSearchState, action) {
  switch (action.type) {
    case FETCH_SEARCH_RESULTS_START:
      return {
        ...state,
        searchInProgress: true,
      };
    case FETCH_SEARCH_RESULTS_SUCCESS:
      return {
        ...state,
        results: action.users,
        searchInProgress: false,
      };
    default:
      return state;
  }
}
