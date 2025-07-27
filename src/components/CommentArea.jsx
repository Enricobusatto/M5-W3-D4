import { useEffect, useState } from 'react';
import CommentList from './CommentList.jsx';
import Spinner from 'react-bootstrap/Spinner';

const key = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODViMWFiZjk2OGRlNTAwMTU1MmEzZTgiLCJpYXQiOjE3NTMwMjU5OTQsImV4cCI6MTc1NDIzNTU5NH0.AP3341mMG33Mc5lqmhYFaDj3z01WErAWIRwmHX6alnE';

function CommentArea({ asin }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true); // LOADER
  const [error, setError] = useState(false);    // ERRORE

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

  useEffect(() => {
    fetchComments();
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

  if (comments.length === 0) {
    return (
      <div className="text-center mt-5 text-muted">
        <p>📭 Nessun commento disponibile per questo libro.</p>
      </div>
    );
  }

  return (
    <CommentList
      comments={comments}
      onSubmit={handleSubmit}
      deleteComment={deleteComment}
    />
  );
}

export default CommentArea;
