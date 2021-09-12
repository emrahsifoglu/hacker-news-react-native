import {Action} from 'redux';
import {NewsActionTypes} from '../Constants/ActionTypes';
import {UserStory} from '../Types';

export interface FetchNews extends Action {
  readonly type: NewsActionTypes.FETCH_NEWS;
  payload: any;
}

export interface FetchNewsSuccessAction extends Action {
  readonly type: NewsActionTypes.FETCH_NEWS_SUCCESS;
  payload: UserStory[];
}

export interface FetchNewsErrorAction extends Action {
  readonly type: NewsActionTypes.FETCH_NEWS_ERROR;
  payload: any;
}

export type NewsActions =
  | FetchNews
  | FetchNewsSuccessAction
  | FetchNewsErrorAction;
