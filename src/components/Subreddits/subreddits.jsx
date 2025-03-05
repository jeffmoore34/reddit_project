import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubreddits, selectSubreddits } from '../../api/subredditSlice';
import { 
  selectSelectedSubreddit, 
  setSelectedSubreddit 
} from '../../api/redditSlice';
import Card from '../Card/card';
import './subreddits.css';
import defaultIcon from '../../assets/social-network.png'

const Subreddits = () => {
  const dispatch = useDispatch();
  const subreddits = useSelector(selectSubreddits) || [];
  const selectedSubreddit = useSelector(selectSelectedSubreddit);

  useEffect(() => {
    dispatch(fetchSubreddits());
  }, [dispatch]);

  return (
    <Card className="subreddit-card">
      <h2>Subreddits</h2>
        <ul className="subreddit-list">
          {subreddits.map((subreddit) => (
            <li
            key={subreddit.id}
            className={`${selectedSubreddit === subreddit.url && 'selected-subreddit'}`}
            >
              <button
                type="button"
                onClick={() => dispatch(setSelectedSubreddit(subreddit.url))}
              >
                <img 
                  src={subreddit.icon_img|| defaultIcon} 
                  alt={`${subreddit.display_name}`} 
                  className="subreddit-icon"
                  style={{ border: `3px solid ${subreddit.primary_color}` }}
                />
                {subreddit.display_name}
              </button>
            </li>
          ))}
        </ul>
    </Card>
  );
};

export default Subreddits;