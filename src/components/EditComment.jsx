import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';

function EditComment({ show, handleClose, handleSave, initialComment }) {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1);

  useEffect(() => {
    if (initialComment) {
      setComment(initialComment.comment);
      setRating(initialComment.rate);
    }
  }, [initialComment]);

  const onSubmit = (e) => {
    e.preventDefault();
    handleSave({
      comment,
      rate: rating,
      elementId: initialComment.elementId,
    });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Modifica Commento</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Commento</Form.Label>
            <Form.Control
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Valutazione</Form.Label>
            <Form.Select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num} ⭐</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Annulla</Button>
          <Button variant="success" type="submit">Salva</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default EditComment;