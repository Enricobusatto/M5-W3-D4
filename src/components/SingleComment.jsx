import './css.components/SingleComment.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import EditComment from './EditComment';

function SingleComment({ comment, deleteComment, editComment }) {

  return (
    <>
      <div className="comment">
        <h4><strong>Recensioni:</strong></h4>
        <h5 className="text-center">{comment.comment}</h5>
        <p className="text-muted">Voto: {comment.rate} ⭐</p>
        <small>Autore: {comment.author}</small>
      </div>
      <div className="d-flex justify-content-around mb-3">
        <button className="btn-comment" onClick={() => editComment(comment)}>
          <i className="bi bi-pencil-square"> Modifica</i>
        </button>
        <button id="delete" className="btn-comment" onClick={() => deleteComment(comment._id)}>
          <i className="bi bi-trash3"> Elimina</i>
        </button>
      </div>
    </>
  );
}

export default SingleComment;
