import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Spinner } from 'react-bootstrap';
import useFetch from '../hooks/useFetch';
import './UserDetail.css';

function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [users] = useFetch("https://jsonplaceholder.typicode.com/users");
  
  const user = users.find(u => u.id === parseInt(id));

  useEffect(() => {
    if (user) {
      document.title = `${user.name} - Szczegóły użytkownika`;
    } else {
      document.title = 'Szczegóły użytkownika';
    }
  }, [user]);

  if (users.length === 0) {
    return (
      <div className="user-detail-container">
        <Container className="loading-detail">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Ładowanie danych użytkownika...</p>
        </Container>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="user-detail-container">
        <Container className="py-5">
          <div className="alert alert-danger">
            <h4>❌ Nie znaleziono użytkownika</h4>
            <p>Użytkownik o ID {id} nie istnieje.</p>
            <Button variant="primary" onClick={() => navigate('/lab5')} className="back-button">
              ← Powrót do listy
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="user-detail-container">
      <Container className="py-4">
        <h1 className="mb-4" style={{ color: '#667eea', fontWeight: '800' }}>
          👤 Szczegóły użytkownika
        </h1>
        
        <Card className="user-detail-card">
          <Card.Header className="user-detail-header">{user.name}</Card.Header>
          <Card.Body className="user-detail-body">
            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="user-detail-section">
                  <h5>ℹ️ Informacje podstawowe</h5>
                  <p><strong>Username:</strong> {user.username}</p>
                  <p><strong>Email:</strong> <a href={`mailto:${user.email}`}>{user.email}</a></p>
                  <p><strong>Telefon:</strong> {user.phone}</p>
                  <p><strong>Strona:</strong> <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a></p>
                </div>
              </div>
              
              <div className="col-md-6 mb-3">
                <div className="user-detail-section">
                  <h5>📍 Adres</h5>
                  <p><strong>Ulica:</strong> {user.address?.street}</p>
                  <p><strong>Apartament:</strong> {user.address?.suite}</p>
                  <p><strong>Miasto:</strong> {user.address?.city}</p>
                  <p><strong>Kod pocztowy:</strong> {user.address?.zipcode}</p>
                  <p><strong>Współrzędne:</strong> Lat: {user.address?.geo?.lat}, Lng: {user.address?.geo?.lng}</p>
                </div>
              </div>
            </div>
            
            <div className="row">
              <div className="col-12">
                <div className="user-detail-section">
                  <h5>🏢 Firma</h5>
                  <p><strong>Nazwa:</strong> {user.company?.name}</p>
                  <p><strong>Slogan:</strong> {user.company?.catchPhrase}</p>
                  <p><strong>Działalność:</strong> {user.company?.bs}</p>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
        
        <Button className="back-button" onClick={() => navigate('/lab5')}>
          ← Powrót do listy postów
        </Button>
      </Container>
    </div>
  );
}

export default UserDetail;
