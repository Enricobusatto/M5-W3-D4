import 'bootstrap/dist/css/bootstrap.min.css';
import './css.components/SingleBook.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useSelected } from './ContextComponents/selectedContext';



function SingleBook({ book }) {

    const { selected, setSelected } = useSelected()

    return (
        <Card
            className="card-hover shadow d-flex flex-column "
            style={{ width: '100%', height: '100%', border: '0' }}
        >
            <Card.Img onClick={() => setSelected(oldAsin=> book.asin == oldAsin ? '' : book.asin )}
                alt={book.title}
                variant="top"
                className={selected == book.asin && 'border border-5 border-danger'}
                src={book.img}
                style={{ height: '300px', objectFit: 'cover' }}
            />
            <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Text>Category : {book.category}</Card.Text>
                    <Card.Text className="text-muted">Price: {book.price} $</Card.Text>
                </div>
                <Button variant="success" className="mt-3">
                    Add To Cart
                </Button>
            </Card.Body>
        </Card>

    );
}


export default SingleBook;