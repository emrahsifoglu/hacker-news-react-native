import {NewsActionTypes} from '../Constants/ActionTypes';
import {NewsActions} from '../actions/ActionTypes';
import {UserStory, NewsState} from '../../store/Types';

const initialState: NewsState = {
  news: [] as UserStory[],
  error: undefined,
};

const NewsReducer = (state = initialState, action: NewsActions) => {
  switch (action.type) {
    case NewsActionTypes.FETCH_NEWS_SUCCESS:
      return {
        ...state,
        news: action.payload,
      };
    case NewsActionTypes.FETCH_NEWS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export {NewsReducer};
