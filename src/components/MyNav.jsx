import 'bootstrap/dist/css/bootstrap.min.css';
import './css.components/myNav.css';
import { Navbar, Nav, Container, Form } from 'react-bootstrap';
import logo from '../assets/logo.svg';
import { useTheme } from './ContextComponents/ThemeContext';

function MyNav({ selectedCategory, setSearchTitle, setSelectedCategory, categories, searchTitle }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <Navbar expand="lg" className={`navbar  ${theme}`} variant={theme}>
      <Container>
        <Navbar.Brand href="#">
          <img
            src={logo}
            alt="logo"
            style={{ width: 70, marginRight: '10px' }}
          />
          Books React
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">About</Nav.Link>
            <Nav.Link href="#">Browser</Nav.Link>
          </Nav>

          <Form.Select
            className="selectCategory"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Form.Select>

          <Form.Control
            className="searchInput"
            type="text"
            placeholder="Search your book..."
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />

          <Form.Check
            type="switch"
            id="theme-switch"
            label={theme === 'light' ? '🌞' : '🌙'}
            onChange={toggleTheme}
            className="ms-3"
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNav;
