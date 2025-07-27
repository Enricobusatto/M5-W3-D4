import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import SingleBook from './SingleBook.jsx';
import './css.components/AllTheBooks.css'
import Pages from './Pages.jsx';



function AllTheBooks({ filteredBooks, searchTitle, selectedCategory}) {

  const xpage = 20;
  const pagesNumber = Math.ceil(filteredBooks.length / xpage);
  const [active, setActive] = useState(new URLSearchParams(window.location.search).get('page') || 1);
  const [booksForPage, setBooksForPage] = useState([]);

  useEffect(() => {
    setBooksForPage(filteredBooks.slice((active - 1) * xpage, active * xpage))
  }, [filteredBooks, active]);


  return (

    <Container>
      {/* layout griglia */}
      <Row>
        {booksForPage.map((book) => (
          <Col key={book.asin} xs={12} sm={6} md={6} lg={4} className="mb-4 mt-5">
            <SingleBook book={book} />
          </Col>
        ))}
      </Row>

      {booksForPage.length === 0 && (
        <div className="text-center text-muted mt-4">
          Nessun libro trovato
          {selectedCategory && ` nella categoria "${selectedCategory}"`}
          {searchTitle && ` con il titolo che contiene "${searchTitle}"`}
        </div>
      )}
      <Pages pages={pagesNumber} active={active} setActive={setActive} />
    </Container>
  );
}

export default AllTheBooks;


// console.log ("Tutti i libri:", allBooks);

//*********CODICE PER VERIFICARE DUPLICATI*****************

// const asinCount = {};
// allBooks.forEach((book) => {
//   asinCount[book.asin] = (asinCount[book.asin] || 0) + 1;
// });

// const duplicatedAsins = Object.entries(asinCount).filter(([_, count]) => count > 1);

// if (duplicatedAsins.length > 0) {
//   console.warn("❗ Duplicati trovati negli ASIN:", duplicatedAsins);
// } else {
//   console.log("✅ Nessun ASIN duplicato trovato.");
// }
//CHIEDERE AL PROF COME FARE VISTO IL NUM ELEVATO DI LIBRI,  VEDERE SOLO 20 PER PAGINA E POI CLICCARE SU "NEXT" O "PREVIOUS" PER VEDERE GLI ALTRI.