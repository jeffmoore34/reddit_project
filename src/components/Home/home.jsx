import React from 'react';
import { useSelector } from 'react-redux';
import PostList from '../Post/postList';
import './home.css';

const Home = () => {
    const currentSubreddit = useSelector(state => state.reddit.currentSubreddit);
    const posts = useSelector(state => state.reddit.posts);
  
    return (
      <main>
        {currentSubreddit && (
          <div className="subreddit-header">
            {currentSubreddit.icon_img && (
              <img
                src={currentSubreddit.icon_img}
                alt={`${currentSubreddit.display_name} icon`}
                style={{ width: '30px', height: '30px', marginRight: '10px' }}
              />
            )}
            <h1>{currentSubreddit.display_name}</h1>
          </div>
        )}
        <PostList posts={posts} />
      </main>
    );
  }
  
  export default Home;