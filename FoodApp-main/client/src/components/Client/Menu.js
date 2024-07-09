import React, { useState, useEffect } from 'react';
import ProductService from '../../services/ProductService';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import './Menu.css';

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    ProductService.getProducts().then((response) => {
      setProducts(response.data);
    });
  }, []);

  const addToCart = (product) => {
    const existingIndex = cart.findIndex((item) => item._id === product._id);

    if (existingIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity++;
      setCart(updatedCart);
    } else {
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      setCart(updatedCart);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);
  };

  return (
    <Container className="menu">
      <h1 className="menu-title">Restaurant Menu</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} xs={12} md={6} lg={4} className="product-col">
            <Card className="product-card">
              <Card.Img variant="top" src={product.image} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.desc}</Card.Text>
                <Card.Text>Price: ${product.price}</Card.Text>
                <Button variant="primary" onClick={() => addToCart(product)}>
                  Add to Cart
                </Button>
                {cart.find((item) => item._id === product._id) && (
                  <Button
                    variant="danger"
                    onClick={() => removeFromCart(product._id)}
                    style={{ marginLeft: '8px' }} // Adjust margin here
                  >
                    Remove
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Cart Display Section */}
      <div className="cart-section mt-4">
        <h2>Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item._id}>
                {item.name} - Quantity: {item.quantity} - Total: ${item.price * item.quantity}
                <Button
                  variant="danger"
                  onClick={() => removeFromCart(item._id)}
                  style={{ marginLeft: '8px' }} // Adjust margin here
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Container>
  );
};

export default Menu;
