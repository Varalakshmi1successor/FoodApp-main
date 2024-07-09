import axios from 'axios';

const API_URL = 'http://localhost:3000/api/products';

class ProductService {
  getProducts() {
    return axios.get(API_URL);
  }
}

const productServiceInstance = new ProductService();
export default productServiceInstance;
