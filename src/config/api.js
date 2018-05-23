const baseUrl = 'http://localhost:3000';

export const productsUrl = `${baseUrl}/products`;
export const categoriesUrl = `${baseUrl}/categories`;
export const customersUrl = `${baseUrl}/customers`;
export const shopsUrl = `${baseUrl}/shops`;
export const customerByIdUrl = (id) => `${baseUrl}/customers/${id}`;
export const ordersUrl = `${baseUrl}/orders`;
export const shippingFeeUrl = (lat, lng) => `${baseUrl}/distance?lat=${lat}&lng=${lng}`;
export const checkCouponUrl = (code) => `${baseUrl}/coupons?code=${code}`;
