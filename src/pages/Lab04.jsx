import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Card } from 'react-bootstrap';
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function Lab04() {
  useEffect(() => {
    document.title = 'Laboratorium 4 - WSEI App';
  }, []);

  return (
    <Container className="py-5">
      <h1 className="mb-4">Laboratorium 04</h1>
      <p className="lead mb-4">Zarządzanie formularzami - dodawanie i edycja osób</p>
      


      <div className="d-grid gap-2">
        <Button as={Link} to="/lab4/add" variant="primary" size="lg">
          ➕ Dodaj nową osobę
        </Button>
        <Button as={Link} to="/lab3" variant="outline-primary" size="lg">
          📋 Przejdź do listy osób (Lab 3)
        </Button>
      </div>
    </Container>
  );
}

export default Lab04;
