import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const TopEvents = () => {
  return (
    <Container className="d-flex align-items-center justify-content-center" >
      <Row>
        <Col md={6} className="mb-4 mt-5">
          <Card className="h-100 shadow">
            <Card.Img variant="top" src="/images/topevent1.avif" />
            <Card.Body>
              <Card.Title>Event 1</Card.Title>
              <Card.Text>
                This is a short description of Event 1.
              </Card.Text>
              <Button variant="primary">Learn More</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4 mt-5">
          <Card className="h-100 shadow">
            <Card.Img variant="top" src="/images/topevent2.avif" />
            <Card.Body>
              <Card.Title>Event 2</Card.Title>
              <Card.Text>
                This is a short description of Event 2.
              </Card.Text>
              <Button variant="primary">Learn More</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4 mt-3">
          <Card className="h-100 shadow">
            <Card.Img variant="top" src="/images/topevent3.avif" />
            <Card.Body>
              <Card.Title>Event 3</Card.Title>
              <Card.Text>
                This is a short description of Event 3.
              </Card.Text>
              <Button variant="primary">Learn More</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4 mt-3">
          <Card className="h-100 shadow">
            <Card.Img variant="top" src="/images/topevent4.avif" />
            <Card.Body>
              <Card.Title>Event 4</Card.Title>
              <Card.Text>
                This is a short description of Event 4.
              </Card.Text>
              <Button variant="primary">Learn More</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TopEvents;
