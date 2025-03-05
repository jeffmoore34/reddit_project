import { configureStore, combineReducers } from '@reduxjs/toolkit';
import subredditReducer from '../api/subredditSlice.js';
import redditReducer from '../api/redditSlice.js';
import userProfileImageReducer from '../api/userProfileImageSlice.js';

const store = configureStore({
  reducer: combineReducers({
    subreddits: subredditReducer,
    reddit: redditReducer,
    userProfileImages: userProfileImageReducer,
  }),
});

export default store;