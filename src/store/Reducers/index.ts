import {combineReducers} from 'redux';
import {NewsReducer} from './NewsReducer';

const rootReducer = combineReducers({
  newsReducer: NewsReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export {rootReducer};
