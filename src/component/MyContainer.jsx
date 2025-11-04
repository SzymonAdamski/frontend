import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import useData from '../hooks/useData';

function MyContainer({ element: Element, data }) {
  const items = useData();

  return (
    <Container>
      <Row className="justify-content-center">
        {items.map((item, index) => (
          <Col key={item.id || index} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center">
            <Element {...item} />
          </Col>
        ))}
      </Row>
      {items.length === 0 && (
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
