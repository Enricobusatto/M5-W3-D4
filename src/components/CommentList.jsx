import Carousel from 'react-bootstrap/Carousel';
import SingleComment from './SingleComment.jsx';

function CommentList({ comments, onSubmit, deleteComment }) {
  return (
    <Carousel slide>
      {comments.map((comment) => (
        <Carousel.Item key={comment._id}>
          <SingleComment comment={comment} handleSubmit={onSubmit} deleteComment={deleteComment}/>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CommentList;
