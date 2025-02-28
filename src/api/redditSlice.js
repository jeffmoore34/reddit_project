import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
    getSubredditPosts,
    getPostComments,
    getUserProfileImage,
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

// Async thunk to fetch user profile image
export const fetchUserProfileImage = createAsyncThunk(
    'reddit/fetchUserProfileImage',
    async (username) => {
        const imageUrl = await getUserProfileImage(username);
        return { username, imageUrl };
    }
);

// Async Thunk to set search term
export const setSearchTerm = createAsyncThunk(
    'reddit/setSearchTerm',
    async (term) => {
        return term;
    }
);

const redditSlice = createSlice({
    name: 'reddit',
    initialState: {
        selectedPost: null,
        posts: [],
        comments: [],
        searchTerm: '',
        userProfileImages: {},
        status: null,
        error: null,
    },
    reducers: {
        selectPost: (state, action) => {
            state.selectedPost = action.payload;
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
        // Handle fetchUserProfileImage lifecycle
        .addCase(fetchUserProfileImage.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchUserProfileImage.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.userProfileImages = action.payload;
        })
        .addCase(fetchUserProfileImage.rejected, (state, action) => {
            state.status = 'failed';
            state.userProfileImages = action.error.message;
        })
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
export const { selectPost } = redditSlice.actions;

export default redditSlice.reducer;