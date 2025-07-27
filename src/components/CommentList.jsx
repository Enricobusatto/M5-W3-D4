import SingleComment from './SingleComment.jsx';

function CommentList({ comments, deleteComment }) {
  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <div key={comment._id} className="mb-3">
          <SingleComment
            comment={comment}
            deleteComment={deleteComment}
          />
        </div>
      ))}
    </div>
  );
}

export default CommentList;
