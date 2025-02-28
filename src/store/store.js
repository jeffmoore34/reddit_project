import { configureStore, combineReducers } from '@reduxjs/toolkit';
import subredditReducer from '../api/subredditSlice.js';
import redditReducer from '../api/redditSlice.js';

const store = configureStore({
  reducer: combineReducers({
    subreddit: subredditReducer,
    reddit: redditReducer,
  }),
});

export default store;