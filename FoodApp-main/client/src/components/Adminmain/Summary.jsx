import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Summary.css'; // CSS file for styling

const Summary = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products'); // Adjust the URL to your API endpoint
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error.response || error.message || error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="summary-container">
      <h1>Product Summary</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h2>{product.name}</h2>
            <p>{product.desc}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Summary;
