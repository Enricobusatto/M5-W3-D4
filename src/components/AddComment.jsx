import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';

function AddComment({asin, handleSubmit }) {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1);

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit({ comment, rating });
    setComment('');
    setRating(1);
  };

  return (
    <Form onSubmit={onSubmit} style={{ maxWidth: '500px', margin: '0 auto', marginBottom: '30px' }}>
      <h3 className="mb-4 mt-5">Aggiungi un commento</h3>

      <Form.Group className="mb-3" controlId="comment">
        <Form.Label>Commento</Form.Label>
        <Form.Control
          type="text"
          placeholder="Scrivi il tuo commento"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="rating">
        <Form.Label>Valutazione</Form.Label>
        <Form.Select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num} ⭐
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <div className="d-flex justify-content-end">
        <Button variant="success" type="submit" onSubmit={handleSubmit}>
          Aggiungi
        </Button>
      </div>
    </Form>
  );
}

export default AddComment;
