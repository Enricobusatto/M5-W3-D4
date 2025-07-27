import { useState } from 'react';
import AddComment from './AddComment.jsx';
import './css.components/SingleComment.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function SingleComment({ comment, handleSubmit, deleteComment }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="comment">
        <h4><strong>Recensioni:</strong></h4>
        <h5 className="text-center">{comment.comment}</h5>
        <p className="text-muted">Voto: {comment.rate} ⭐</p>
        <small>Autore: {comment.author}</small>
      </div>
      <div className="d-flex justify-content-around mb-3">
        <button className="btn-comment">
          <i className="bi bi-pencil-square"> Modifica</i>
        </button>
        <button id="delete" className="btn-comment" onClick={() => deleteComment(comment._id)}>
          <i className="bi bi-trash3"> Elimina</i>
        </button>
        <button className="btn-comment" onClick={() => setShowModal(true)}>
          <i className="bi bi-patch-plus"> Aggiungi</i>
        </button>
      </div>
      <AddComment
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default SingleComment;
