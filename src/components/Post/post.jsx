import { useDispatch, useSelector } from 'react-redux';
import { selectPost, fetchComments, fetchUserProfileImage } from '../../api/redditSlice';
import Card from '../Card/card';


const Post = () => {
  const dispatch = useDispatch();
  const { posts, userProfileImages } = useSelector((state) => state.reddit);

  const handlePostClick = (post) => {
    dispatch(selectPost(post.permalink));
    dispatch(fetchComments(post.permalink));
  };

  return (
    <Card>
    <ul>
      {posts.map((post) => (
        <li key={post.id} onClick={() => handlePostClick(post)}>
          <img
            src={userProfileImages[post.author] || 'default.png'}
            alt={post.author}
            onError={() => dispatch(fetchUserProfileImage(post.author))}
          />
          {post.title}
        </li>
      ))}
    </ul>
    </Card>
  );
};

export default Post;