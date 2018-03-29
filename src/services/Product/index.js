import axios from 'axios';
import { productsUrl } from '../../config/api';

const ProductService = {
  getProducts() {
    return axios({
      method: 'GET',
      url: productsUrl,
    }).then(res => res);
  },
};

export default ProductService;
