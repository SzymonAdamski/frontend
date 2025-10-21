import React, { useReducer } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AppReducer from '../data/AppReducer';

function MyContainer({ element: Element, data }) {
  const [state, dispatch] = useReducer(AppReducer, data);

  return (
    <Container>
      <Row className="justify-content-center">
        {state.map((item, index) => (
          <Col key={item.id || index} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center">
            <Element {...item} dispatch={dispatch} />
          </Col>
        ))}
      </Row>
      {state.length === 0 && (
        <Row>
          <Col className="text-center py-4">
            <p className="text-muted">Brak elementów do wyświetlenia</p>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default MyContainer;
