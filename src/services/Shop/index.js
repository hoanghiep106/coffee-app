import axios from 'axios';
import { shopsUrl } from '../../config/api';

const ShopService = {
  getShops() {
    return axios({
      method: 'GET',
      url: shopsUrl,
    }).then(res => res);
  },
};

export default ShopService;
