import { useEffect, useState } from 'react';
import CommentList from './CommentList.jsx';
import Spinner from 'react-bootstrap/Spinner';
import AddComment from './AddComment.jsx';
import { useSelected } from './ContextComponents/selectedContext.jsx';
import EditComment from './EditComment.jsx';

const key = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODViMWFiZjk2OGRlNTAwMTU1MmEzZTgiLCJpYXQiOjE3NTMwMjU5OTQsImV4cCI6MTc1NDIzNTU5NH0.AP3341mMG33Mc5lqmhYFaDj3z01WErAWIRwmHX6alnE';

function CommentArea() {
  const { selected: asin } = useSelected()
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false); // LOADER
  const [error, setError] = useState(false);    // ERRORE
  const [showEditModal, setShowEditModal] = useState(false); //MODALE X EDIT
  const [selectedComment, setSelectedComment] = useState(null);

  const handleEditClick = (comment) => {
    setSelectedComment(comment);
    setShowEditModal(true);
  };


  // fetch GET

  const fetchComments = async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/books/${asin}/comments/`,
        {
          headers: { Authorization: key },
        }
      );

      if (!response.ok) {
        throw new Error("Errore nel recupero");
      }

      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Errore nel fetch dei commenti:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  //fetch new POST 

  const handleSubmit = async (newComment) => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: key,
          },
          body: JSON.stringify({
            comment: newComment.comment,
            rate: newComment.rating,
            elementId: asin,
          }),
        }
      );

      if (!response.ok) throw new Error('Errore nella POST');

      alert('✅ Commento aggiunto!');
      fetchComments();
    } catch (error) {
      console.error("❌ Errore nella POST:", error);
      alert('Errore durante l\'aggiunta del commento.');
    }
  };

  //fetch DELETE comment 

  const deleteComment = async (id) => {
    if (window.confirm('Sei sicuro di voler eliminare questo commento?')) {
      try {
        const response = await fetch(
          `https://striveschool-api.herokuapp.com/api/comments/${id}`,
          {
            method: 'DELETE',
            headers: { Authorization: key },
          }
        );

        if (!response.ok) throw new Error('Errore nella cancellazione');

        alert('✅ Commento eliminato con successo!');
        fetchComments();
      } catch (error) {
        console.error('❌ Errore:', error);
        alert('Errore durante l’eliminazione del commento.');
      }
    }
  };

  // fetch PUT comment

  const editComment = async (id, commentData) => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: key,
          },
          body: JSON.stringify({
            comment: commentData.comment,
            rate: commentData.rate,
            elementId: commentData.elementId,
          }),
        }
      );

      if (response.ok) {
        // Aggiorna lo stato localmente senza fetch
        setComments((prevComments) =>
          prevComments.map((c) =>
            c._id === id
              ? { ...c, comment: commentData.comment, rate: commentData.rate }
              : c
          )
        );

        alert('✅ Commento modificato con successo!');
      } else {
        console.error('Errore nella modifica del commento');
      }
    } catch (error) {
      console.error('Errore nella richiesta:', error);
    }
  };

  useEffect(() => {
    if (asin)
      fetchComments();
    else setComments([])
  }, [asin]);

  // GESTIONE DELLE 3 CASISTICHE:

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="success" />
        <p>Caricamento dei commenti...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5 text-danger">
        <p>❌ Errore nel caricamento dei commenti. Riprova più tardi.</p>
      </div>
    );
  }

  if (asin && comments.length === 0) {
    return (
      <div className="text-center mt-5 text-muted">
        <p>📭 Nessun commento disponibile per questo libro.</p>
      </div>
    );
  }

  return (
    <div>
      <AddComment asin={asin} handleSubmit={handleSubmit} />
      <CommentList
        comments={comments}
        deleteComment={deleteComment}
        editComment={handleEditClick}
      />
      {selectedComment && (
        <EditComment
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          handleSave={(updatedData) =>
            editComment(selectedComment._id, updatedData)
          }
          initialComment={selectedComment}
        />
      )}

    </div>
  );
}

export default CommentArea;
