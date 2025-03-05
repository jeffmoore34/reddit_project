import React from 'react';
import { fetchUserProfileImage } from '../../api/userProfileImageSlice'; 
import Skeleton from 'react-loading-skeleton';
import {
  TiArrowUpOutline,
  TiArrowUpThick,
  TiArrowDownOutline,
  TiArrowDownThick,
  TiMessage,
} from 'react-icons/ti';
import Card from '../Card/card';
import Comment from '../Comment/comment';
import shortenNumber from '../../utils/shortenNumber';

const Post = (props) => {

  const { post, onToggleComments } = props;
  const renderComments = () => {
    if (post.errorComments) {
      return (
        <div>
          <h3>Error loading comments</h3>
        </div>
      );
    }
    
    if (post.loadingComments) {
      return (
        <div>
          <Skeleton count={5} />
        </div>
      );
    }

    if (post.showingComments) {
      return (
        <div>
          {post.comments.map((comment) => {
            <Comment comment={comment} key={comment.id} />
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <article key={post.id}>
      <Card>
        <div className="post-wrapper">
          <div className="post-votes-container">
            <button type="button" className="icon-action-button up-vote">
              Up Vote
            </button>
            <p className="post-votes-value">
              Value
            </p>
            <button
              type="button" className='icone-action-button down-vote'>
              Down Vote
            </button>
          </div>
          <div className="post-container">
            <h3 className="post-title">{post.title}</h3>

            <div className="post-image-container">
              <img src={post.url} alt="" className="post-image" />
            </div>

            <div className="post-details">
              <span className="author-details">
                <img
                  className="author-icon"
                  src={fetchUserProfileImage[post.author] || '/Users/Moores/Reddit_2/src/assets/social-network.png'}
                  alt={`${post.author}'s profile`}
                />
                <span className="author-username">{post.author}</span>
              </span>
              <span className="post-comments-container">
                <button
                  type="button"
                  className={`icon-action-button ${
                    post.showingComments && 'showing-comments'
                  }`}
                  onClick={() => onToggleComments(post.permalink)}
                  aria-label="Show Comments"
                >
                  <TiMessage className="icon-action" />
                </button>
                {shortenNumber(post.num_comments, 1)}
              </span>
            </div>
            {renderComments()}
          </div>
        </div>
      </Card>
    </article>
  );
};

export default Post;