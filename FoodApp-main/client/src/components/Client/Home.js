import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import './Home.css';

const Home = () => {
  return (
    <div className="home-jumbotron">
      <Container>
        <Row className="justify-content">
          <Col xs={12} md={8}>
            <h1 className="home-title">Spice Craft</h1>
            <p className="home-subtitle">
              Discover our delicious menu and explore our dishes.
            </p>
            <Link to="/menu">
              <Button variant="primary" size="lg" className="home-button">View Menu</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
