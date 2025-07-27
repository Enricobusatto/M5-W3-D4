import { Modal, Button, Form } from 'react-bootstrap';
import { useState } from 'react';

function AddComment({ show, handleClose, handleSubmit }) {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1);

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit({ comment, rating });
    setComment('');
    setRating(1);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Aggiungi un commento</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Commento</Form.Label>
            <Form.Control
              type="text"
              placeholder="Scrivi il tuo commento"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3 align-items-center">
            <Form.Label>Valutazione</Form.Label>
            <Form.Select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} ⭐
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annulla
          </Button>
          <Button variant="success" type="submit">
            Aggiungi
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default AddComment;
