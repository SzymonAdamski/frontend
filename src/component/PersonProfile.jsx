import React from 'react';
import { Card, Button, ButtonGroup, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import RatingBar from './RatingBar';
import useDispatch from '../hooks/useDispatch';
import './PersonProfile.css';

function PersonProfile({ id, name, email, phone, birthDate, className, rating = 0, isChecked = false }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/lab4/edit?id=${id}`);
  };

  return (
    <Card 
      style={{ width: '20rem' }} 
      className={`person-profile-card mb-3 p-2 ${isChecked ? 'checked' : ''} ${className || ''}`} 
      key={id}
    >
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className="text-primary mb-0">{name}</Card.Title>
          <Form.Check
            type="checkbox"
            checked={isChecked}
            onChange={() => {
              dispatch({
                type: "check",
                id: id
              });
              console.log(`Osoba ${name} ${!isChecked ? 'zaznaczona' : 'odznaczona'}`);
            }}
            title="Zaznacz osobę"
          />
        </div>
        
        {email && <Card.Text className="mb-1"><small><strong>Email:</strong> {email}</small></Card.Text>}
        {phone && <Card.Text className="mb-1"><small><strong>Telefon:</strong> {phone}</small></Card.Text>}
        {birthDate && <Card.Text className="mb-1"><small><strong>Data urodzin:</strong> {birthDate}</small></Card.Text>}
        
        <div className="mb-2">
          <Card.Text className="mb-1"><small className="text-muted">ID: {id}</small></Card.Text>
          <RatingBar rate={rating} />
        </div>

        <ButtonGroup size="sm" className="w-100 mb-2">
          <Button 
            className="profile-button-gradient"
            onClick={handleEditClick} 
            title="Edytuj"
          >
             Edit
          </Button>
          <Button 
            className="profile-button-success"
            onClick={() => {
              dispatch({
                type: "rate",
                id: id
              });
              const newRating = rating === 10 ? 0 : rating === 0 ? 1 : Math.min(rating + 1, 10);
              console.log(`Nowy ranking dla ${name}: ${newRating}`);
            }} 
            title="Zwiększ ranking"
          >
           Rate
          </Button>
        </ButtonGroup>
        
        <Button 
          className="profile-button-danger w-100"
          size="sm"
          onClick={() => {
            if (window.confirm(`Czy na pewno chcesz usunąć ${name}? `)) {
              dispatch({
                type: "delete",
                id: id
              });
              console.log(`Usuń osobę: ${name} (ID: ${id})`);
            }
          }}
          title="Usuń osobę"
        >
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}

export default PersonProfile;
