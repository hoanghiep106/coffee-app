import axios from 'axios';
import { categoriesUrl } from '../../config/api';

const CategoryService = {
  getCategories() {
    return axios({
      method: 'GET',
      url: categoriesUrl,
    }).then(res => res);
  },
};

export default CategoryService;
