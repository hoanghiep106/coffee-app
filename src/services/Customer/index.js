import axios from 'axios';
import { customersUrl, customerByIdUrl } from '../../config/api';

const CustomerService = {
  createCustomer(data) {
    return axios({
      method: 'post',
      url: customersUrl,
      data
    }).then(res => res);
  },
  updateCustomer(id, data) {
    return axios({
      method: 'put',
      url: customerByIdUrl(id),
      data
    }).then(res => res);
  },
};

export default CustomerService;
