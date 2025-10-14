import { Container, Row, Col } from 'react-bootstrap';

function FooterApp() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start">
              <div>
                <h6 className="mb-1">Wyższa Szkoła Ekonomii i Informatyki</h6>
                <small className="text-muted">w Krakowie</small>
              </div>
            </div>
          </Col>
          <Col md={6} className="text-center text-md-end mt-3 mt-md-0">
            <p className="mb-1">
              <strong>Autor aplikacji:</strong>
            </p>
            <p className="mb-0">
              <a href="mailto:szymon.adamski@microsoft.wsei.edu.pl" className="text-light">
                szymon.adamski@microsoft.wsei.edu.pl
              </a>
            </p>
          </Col>
        </Row>
        <hr className="my-3" />
        <Row>
          <Col className="text-center">
            <small className="text-muted">
              © 2025 WSEI. Wszystkie prawa zastrzeżone.
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default FooterApp;
