import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserProfileImage } from './api';

// Async thunk to fetch user profile image
export const fetchUserProfileImage = createAsyncThunk(
    'userProfileImages/fetchUserProfileImage',
    async (username) => {
        const imageUrl = await getUserProfileImage(username);
        return { username, imageUrl };
    }
);

const userProfileImagesSlice = createSlice({
    name: 'userProfileImages',
    initialState: {
        images: {},
        status: null,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfileImage.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserProfileImage.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.images[action.payload.username] = action.payload.imageUrl;
            })
            .addCase(fetchUserProfileImage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default userProfileImagesSlice.reducer;