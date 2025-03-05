import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { 
    getSubredditPosts,
    getPostComments,
} from './api';

// Async thunk to fetch posts for the selected subreddit
export const fetchPosts = createAsyncThunk(
    'reddit/fetchPosts',
    async (_, { getState }) => {
        const state = getState();
        const subreddit = state.reddit.selectedSubreddit;
        if (!subreddit) throw new Error('No subreddit selected');
        const posts = await getSubredditPosts(subreddit);
        return posts;
    }
);

// Async thunk to fetch comments for the selected post
export const fetchComments = createAsyncThunk(
    'reddit/fetchComments',
    async (permalink) => {
        const comments = await getPostComments(permalink);
        return comments;
    }
);

// Async Thunk to set search term
export const setSearchTerm = createAsyncThunk(
    'reddit/setSearchTerm',
    async (term) => {
        return term;
    }
);

export const selectPosts = (state) => state.reddit.posts;
export const selectSearchTerm = (state) => state.reddit.searchTerm;
export const selectSelectedSubreddit = (state) =>
    state.reddit.selectedSubreddit;

export const selectFilteredPosts = createSelector(
    [selectPosts, selectSearchTerm],
    (posts, searchTerm) => {
        if (searchTerm !== '') {
            return posts.filter((post) => 
            post.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return posts;
    }
);

const redditSlice = createSlice({
    name: 'reddit',
    initialState: {
        selectedPost: null,
        posts: [],
        comments: [],
        searchTerm: '',
        status: null,
        error: null,
        selectedSubreddit: '/r/pics',
    },
    reducers: {
        selectPost: (state, action) => {
            state.selectedPost = action.payload;
        },
        setSelectedSubreddit: (state, action) => {
            state.selectedSubreddit = action.payload;
            state.searchTerm = '';
        },
        
    },
    extraReducers: (builder) => {
        builder
        // handle fetchPosts lifecycle
        .addCase(fetchPosts.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.posts = action.payload;
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed';
            state.posts = action.error.message;
        })
        // Handle fetchComments lifecycle
        .addCase(fetchComments.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchComments.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            // Filter posts by searchTerm
            const filteredPosts = action.payload.filter(post =>
                post.title.toLowerCase().includes(state.searchTerm.toLowerCase())
            );
            state.posts = filteredPosts;
        })
        .addCase(fetchComments.rejected, (state, action) => {
            state.status = 'failed';
            state.comments = action.error.message;
        })
        // Handle setSearchTerm lifecycle
        .addCase(setSearchTerm.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(setSearchTerm.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.searchTerm = action.payload;
        })
        .addCase(setSearchTerm.rejected, (state, action) => {
            state.status = 'failed';
            state.searchTerm = action.error.message;
        })
    }
});

// Export action creator for selecting a post
export const { selectPost, setSelectedSubreddit } = redditSlice.actions;

export default redditSlice.reducer;