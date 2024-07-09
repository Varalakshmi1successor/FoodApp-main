import React, { useState } from 'react';
import axios from 'axios';
import './Products.css'; // Import the CSS file

const Products = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    quantity: 0,
    price: 0,
    image: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: name === 'image' ? files[0] : name === 'quantity' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('desc', formData.desc);
      formDataToSend.append('quantity', formData.quantity.toString());
      formDataToSend.append('price', formData.price.toString());
      formDataToSend.append('image', formData.image);
      const url = "http://localhost:3000/api/products"
      const response = await axios.post(url, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Product created:', response.data);
      alert('Product added successfully!');
      setFormData({
        name: '',
        desc: '',
        quantity: 0,
        price: 0,
        image: null
      });
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error creating product:', error.response || error.message || error);
      alert('Failed to create product. Please try again.');
    }
  };

  const handleCreateProduct = () => {
    setShowCreateForm(true);
  };

  return (
    <div className="products-container">
      <h1>Products Page</h1>
      <button className="create-button" onClick={handleCreateProduct}>Create Product</button>
      {showCreateForm && (
        <div className="form-container">
          <h2>Create Product</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="desc">Description:</label>
              <textarea id="desc" name="desc" value={formData.desc} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="quantity">Quantity:</label>
              <input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price:</label>
              <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="image">Image:</label>
              <input type="file" id="image" name="image" onChange={handleChange} accept="image/*" required />
            </div>
            <button className="submit-button" type="submit">Create Product</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Products;
