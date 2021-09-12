import {Dispatch} from 'react';
import {NewsActionTypes} from '../Constants/ActionTypes';
import {getUsersStories} from '../../api/HackerNewsAPI';
import {NewsActions} from './ActionTypes';

export const onFetchNews = () => {
  return async (dispatch: Dispatch<NewsActions>) => {
    try {
      const response = await getUsersStories();

      if (!response) {
        dispatch({
          type: NewsActionTypes.FETCH_NEWS_ERROR,
          payload: 'Fetcing issue with API',
        });
      } else {
        dispatch({
          type: NewsActionTypes.FETCH_NEWS_SUCCESS,
          payload: response,
        });
      }
    } catch (error) {
      dispatch({
        type: NewsActionTypes.FETCH_NEWS_ERROR,
        payload: error,
      });
    }
  };
};
