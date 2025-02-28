import React from 'react';

function Comments({ comments }) {
  return (
    <ul className="comments">
      {comments.map(comment => (
        <li key={comment.id}>
          <p>{comment.body}</p>
          <p className="comment-author">By u/{comment.author}</p>
          {comment.replies && comment.replies.data && comment.replies.data.children && (
            <Comments comments={comment.replies.data.children.map(child => child.data)} />
          )}
        </li>
      ))}
    </ul>
  );
}

export default Comments;