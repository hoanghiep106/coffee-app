import React from 'react';
import ProductService from '../../services/Product';
import OrderService from '../../services/Order';

const SIZE = {
  1: 'M',
  2: 'L'
}

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      products: [],
      discountPercentage: 0,
      showError: false,
      showSuccess: false,
    }
  }

  componentDidMount() {
    ProductService.getProducts().then(res => this.setState({ products: res.data.products }));
  }

  getProductDetail(orderItem) {
    const product = this.state.products.filter(product => product.id === orderItem.product_id)[0];
    const productDetail = product.product_details.filter(productDetail => productDetail.id === orderItem.product_detail_id)[0];
    return (
      <div className="bill-item">
        <div className="product-name">{product.name}</div>
        <div className="sizes">
          <div className="size">
          <div className="name-price">{SIZE[productDetail.size]} ({productDetail.price})</div>
          <div className="qty">
            {/* <i className="fa fa-minus-square icon-minus-order"></i> */}
            <div className="center">x {orderItem.quantity}</div>
            {/* <i className="fa fa-plus-square icon-plus-order"></i> */}
          </div>
          <div className="total">{productDetail.price * orderItem.quantity}</div>
          </div>
        </div>
      </div>
    );
  }

  getPrice = (orderItem) => {
    const product = this.state.products.filter(product => product.id === orderItem.product_id)[0];
    const productDetail = product.product_details.filter(productDetail => productDetail.id === orderItem.product_detail_id)[0];
    const totalPrice = productDetail.price * orderItem.quantity;
    return totalPrice - totalPrice * this.state.discountPercentage;
  }

  handleCouponCheck = () => {
    OrderService.checkCoupon(this.state.code).then(res => {
      if (res.data.coupons && res.data.coupons.length > 0 && res.data.coupons[0].status === 1) {
        this.setState({ 
          discountPercentage: res.data.coupons[0].percentage / 100,
          showError: false,
          showSuccess: true,
        });
      } else {
        this.setState({ 
          showError: true,
          discountPercentage: 0,
          showSuccess: false,
        })
      }
    });
  }

  render() {
    if (this.state.products.length === 0) return null;
    return (
      <div className="fixed-header-panel summary-step">
          <div className="header">
            <span className="title">Only These? Really?</span>
            <span className="small">(Step 4/4)</span>
            <i className="fa fa-angle-left pointer" onClick={() => this.props.goBack()}></i>
          </div>
          <div className="content">
          <div className="header-separator"></div>
          <div className="bill-items">
            {this.props.orderInfo.order_items.map(orderItem => this.getProductDetail(orderItem))}
            <hr/>
            <h5 className="coupon-input">Nhập mã coupon</h5>
            <input name="coupon" value={this.state.coupon} onChange={(e) => this.setState({ code: e.target.value })} />
            <button onClick={this.handleCouponCheck} type="button">Add coupon</button>
            {this.state.showError && <span><p style={{ color: 'red' }}>Mã giảm giá sai hoặc đã hết hạn</p></span>}
            {this.state.showSuccess && <span><p style={{ color: 'green' }}>Áp dụng mã giảm giá thành công!</p></span>}
            <hr/>
            <h3 className="total-price">
              Thành tiền: {this.props.orderInfo.order_items.reduce((acc, orderItem) => acc + this.getPrice(orderItem), 0)}
            </h3>
          </div>
          <div className="customer-name"><b>{this.props.orderInfo.customer_name}</b></div>
          <div className="customer-info">{this.props.orderInfo.customer_location.title} - {this.props.orderInfo.customer_phone}</div>
          </div>
      </div>
    );
  }
}

export default Cart;
