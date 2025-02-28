import axios from "axios";

const API_ROOT = 'https://www.reddit.com';

// Fetches Top Posts
export const getSubredditPosts = async (subreddit) => {
    try {
        const response = await axios.get(`${API_ROOT}/r/${subreddit}/top.json`);
        return response.data.data.children.map((post) => post.data);
    } catch (error) {
        console.log('Error fetching Subreddit Posts:', error);
        throw error;
    }
};

// Fetches List of Subreddits
export const getSubreddits = async () => {
    try {
        const response = await axios.get(`${API_ROOT}/subreddits.json`);
        return response.data.data.children.map((subreddit) => subreddit.data);
    } catch (error) {
        console.log('Error fetching Subreddits:', error);
        throw error;
    }
};

// Fetches Detailed info on Subreddit
export const fetchSubredditDetails = async (subreddit) => {
    try {
        const response = await axios.get(`${API_ROOT}/r/${subreddit}/about.json`);
        return response.data.data;
    } catch (error) {
        console.log('Error fetching Subreddit Details:', error);
        throw error;
    }
};

// Fetches Comments for a Specific Post
export const getPostComments = async (permalink) => {
    try {
        const response = await axios.get(`${API_ROOT}${permalink}.json`);
        return response.data.data.children.map((comment) => comment.data);
    } catch (error) {
        console.log('Error fetching comments:', error);
        throw error;
    }
};

// Fetches User Profile Image
export const getUserProfileImage = async (username) => {
    try {
      const response = await api.get(`/user/${username}/about.json`, {
        params: { raw_json: 1 }
      });
      return response.data.data.icon_img;
    } catch (error) {
      console.error('Error fetching user profile image:', error);
      throw error;
    }
  };