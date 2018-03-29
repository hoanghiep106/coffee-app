import axios from 'axios';
import { baseUrl } from '../../config/api';

const OrderService = {
  postOrder(orderInfo) {
    return axios({
      method: 'POST',
      data: orderInfo
    }).then(res => res);
  },
};

export default OrderService;
