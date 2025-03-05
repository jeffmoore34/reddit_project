import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfileImage } from '../../api/userProfileImageSlice';

const Comment = (props) => {
  const { comment } = props;
  const dispatch = useDispatch();

  // Dispatch the thunk to fetch the user profile image
  useEffect(() => {
    if (comment.author) {
      dispatch(fetchUserProfileImage(comment.author));
    }
  }, [dispatch, comment.author]);

  // Access the user profile images from the Redux state
  const userProfileImages = useSelector((state) => state.reddit.userProfileImages);

  return (
    <div className='comment'>
      <div className='comment-data'>
        <img
          className='author-icon'
          src={userProfileImages[comment.author] || '/Users/Moores/Reddit_2/src/assets/social-network.png'}
          alt={`${comment.author}'s profile`}
        />
        <p className='comment-author'>{comment.author}</p>
        <p className='comment-body'>{comment.body}</p>
      </div>
    </div>
  );
};

export default Comment;