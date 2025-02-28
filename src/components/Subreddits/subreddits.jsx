import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubreddits, selectSubreddit, getSubredditDetails } from '../../api/subredditSlice';  
import { fetchPosts } from '../../api/redditSlice';
import Card from '../Card/card';
import './subreddits.css';

const SubredditList = () => {
  const dispatch = useDispatch();
  const { subreddits, status } = useSelector((state) => state.subreddit);

  useEffect(() => {
    dispatch(fetchSubreddits());
  }, [dispatch]);

  const handleSelect = (subreddit) => {
    dispatch(selectSubreddit(subreddit));
    dispatch(getSubredditDetails(subreddit));
    dispatch(fetchPosts());
  };

  if (status === 'loading') return <div>Loading...</div>;

  return (
    <Card className='subreddit-card'>
        <h2>Subreddits</h2>
        <ul className='subreddit-list'>
            {subreddits.map((sub) => (
            <li 
                key={sub.id} 
                onClick={() => handleSelect(sub.display_name)}
                className={`${selectSubreddit === sub.url}` && 'selected-subreddit}'}
            >
            {sub.display_name}
            <button 
                type='button'
                onClick={() => handleSelect(sub.url)}
            >
            <img 
                src={sub.icon_img} 
                alt={`${sub.display_name}`}
                style={{ border: `3px solid ${sub.primary_color}`}}
                className='subreddit-icon'
            />
            </button>
        </li>
      ))}
    </ul>
    </Card>
  );
};

export default SubredditList;