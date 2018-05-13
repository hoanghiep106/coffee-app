import axios from 'axios';
import { ordersUrl, shippingFeeUrl, checkCouponUrl } from '../../config/api';

const OrderService = {
  postOrder(orderInfo) {
    return axios({
      method: 'POST',
      url: ordersUrl,
      data: orderInfo
    }).then(res => res);
  },
  getShippingFee(lat, lng) {
    return axios({
      method: 'get',
      url: shippingFeeUrl(lat, lng),
    }).then(res => res);
  },
  checkCoupon(code) {
    return axios({
      method: 'get',
      url: checkCouponUrl(code),
    }).then(res => res);
  },
};

export default OrderService;
