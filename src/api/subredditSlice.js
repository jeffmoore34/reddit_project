import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSubreddits, fetchSubredditDetails } from "./api";

//Creat async thunk to get list of Subreddits
export const fetchSubreddits = createAsyncThunk(
    'reddit/fetchSubreddits',
    async () => {
        const subreddits = await getSubreddits();
        return subreddits;
    }
);

//Create async thunk to get specific subreddit details
export const getSubredditDetails = createAsyncThunk(
    'reddit/getSubredditDetails',
    async (subreddits) => {
        const details = await fetchSubredditDetails(subreddits);
        return details;
    }
);

const subRedditSlice = createSlice({
    name: 'subreddit',
    initialState: {
        subreddits: [],          // Provides array of subreddits
        selectedSubreddit: null, // Name of currently selected subreddit
        subredditDetails: null,  // Gives details of selected subreddit
        status: 'idle',          // Loading State
        error: null,             // Error message if there is a action failure
    },
    reducers: {
        //Action to select subreddit
        selectSubreddit: (state, action) => {
            state.selectedSubreddit = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        //handle fetchSubreddits lifecycle
        .addCase(fetchSubreddits.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchSubreddits.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.subreddits = action.payload;
        })
        .addCase(fetchSubreddits.rejected, (state, action) => {
            state.status = 'failed';
            state.subreddits = action.error.message;
        })
        //handle getSubredditDetails lifecycle
        .addCase(getSubredditDetails.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getSubredditDetails.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.subreddits = action.payload;
        })
        .addCase(getSubredditDetails.rejected, (state, action) => {
            state.status = 'failed';
            state.subreddits = action.error.message;
        })
    }
});

export const { selectSubreddit } = subRedditSlice.actions;

export default subRedditSlice.reducer;