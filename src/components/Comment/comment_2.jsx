import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfileImage } from '../../api/redditSlice';
import { createSelector } from 'reselect';

const Comment = (props) => {
  const { comment } = props;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Dispatch the thunk to fetch the user profile image
  useEffect(() => {
    if (comment.author) {
      setLoading(true);
      dispatch(fetchUserProfileImage(comment.author))
        .finally(() => setLoading(false));
    }
  }, [dispatch, comment.author]);

  // Memoized selector for user profile images
  const selectUserProfileImages = useCallback(createSelector(
    (state) => state.reddit.userProfileImages,
    (userProfileImages) => userProfileImages
  ), []);

  const userProfileImages = useSelector(selectUserProfileImages);

  const handleImageError = () => {
    setError(true);
  };

  return (
    <div className='comment'>
      <div className='comment-data'>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <img
            className='author-icon'
            src={error ? 'default.png' : userProfileImages[comment.author] || 'default.png'}
            alt={`${comment.author}'s profile`}
            onError={handleImageError}
          />
        )}
        <p className='comment-author'>{comment.author}</p>
        <p className='comment-body'>{comment.body}</p>
      </div>
    </div>
  );
};

export default Comment;