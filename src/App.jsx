import MyNav from './components/MyNav.jsx'
import Welcome from './components/Welcome.jsx'
import AllTheBooks from './components/AllTheBooks.jsx'
import MyFooter from './components/MyFooter.jsx'

import fantasy from './assets/fantasy.json';
import history from './assets/history.json';
import horror from './assets/horror.json';
import romance from './assets/romance.json';
import scifi from './assets/scifi.json';
import { useState } from 'react';
import { ThemeProvider } from './components/ContextComponents/ThemeContext.jsx';
import './components/css.components/App.css';
import { Col, Container, Row } from 'react-bootstrap';
import CommentArea from './components/CommentArea.jsx';
import { SelectedProvider } from './components/ContextComponents/selectedContext.jsx';


// Unione di tutti i libri in un unico array
const allBooksRaw = [...fantasy, ...history, ...horror, ...romance, ...scifi];
const allBooks = Array.from(new Map(allBooksRaw.map(book => [book.asin, book])).values());
// constante che contiene le categorie uniche
const categories = [...new Set(allBooks.map(book => book.category))];

function App() {
    // console.log ("Tutti i libri:", allBooks);
    const [searchTitle, setSearchTitle] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');


    // Filtro  per titolo e categoria
    const filteredBooks = allBooks.filter(book => {
        const categoryMatch = selectedCategory ? book.category === selectedCategory : true;
        const titleMatch = searchTitle
            ? book.title.toLowerCase().includes(searchTitle.toLowerCase())
            : true;
        return categoryMatch && titleMatch;
    });
    return (
        // <StrictMode>
        <ThemeProvider>
            <MyNav setSearchTitle={setSearchTitle} setSelectedCategory={setSelectedCategory} categories={categories} searchTitle={searchTitle} selectedCategory={selectedCategory} />
            <Welcome />
            <SelectedProvider>
                <Container>
                    <Row>
                        <Col md={7} lg={8}>
                            <AllTheBooks filteredBooks={filteredBooks} searchTitle={searchTitle} selectedCategory={selectedCategory} />
                        </Col>
                        <Col md={5} lg={4}>
                            <CommentArea />
                        </Col>
                    </Row>
                </Container>
            </SelectedProvider>
            <MyFooter />
        </ThemeProvider>

        // </StrictMode>,
    )
}
export default App;

