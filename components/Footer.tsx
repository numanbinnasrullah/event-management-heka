import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light">
      <Container fluid>
        <Row className="justify-content-center align-items-center">
          <Col md={6} className="text-center text-md-left mb-3 mb-md-0">
            <p>© 2023 Numan Eventro. All Rights Reserved.</p>
          </Col>
          <Col md={6} className="text-center text-md-right">
            <ul className="list-unstyled mb-0">
              <li className="d-inline-block mx-3 mx-md-4"><a href="#">About Us</a></li>
              <li className="d-inline-block mx-3 mx-md-4"><a href="#">Contact Us</a></li>
              <li className="d-inline-block mx-3 mx-md-4"><a href="#">Privacy Policy</a></li>
              <li className="d-inline-block mx-3 mx-md-4"><a href="#">Terms of Service</a></li>
            </ul>
          </Col>
          <Col md={12} className="text-center mt-3">
            <p>Numan Eventro</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
