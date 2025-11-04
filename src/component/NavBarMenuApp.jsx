import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './NavBarMenuApp.css';

function NavBarMenuApp() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-0 navbar">
      <Container>
        <Navbar.Brand as={NavLink} to="/home">
          <strong>WSEI App</strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/home">Strona główna</Nav.Link>
            <Nav.Link as={NavLink} to="/lab01">Laboratorium 1</Nav.Link>
            <Nav.Link as={NavLink} to="/lab02">Laboratorium 2</Nav.Link>
            <Nav.Link as={NavLink} to="/lab3">Laboratorium 3</Nav.Link>
            <Nav.Link as={NavLink} to="/lab4">Laboratorium 4</Nav.Link>
            <Nav.Link as={NavLink} to="/lab5">Laboratorium 5</Nav.Link>
            <Nav.Link as={NavLink} to="/lab4/add">Dodaj osobę</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarMenuApp;
