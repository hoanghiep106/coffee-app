import React from 'react';
import ProductService from '../../services/Product';

const SIZE = {
  1: 'M',
  2: 'L'
}

class Cart extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      products: [],
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
            {/* <hr/>
            Nhập mã coupon
            <hr/>
            Thành tiền:59000 */}
          </div>
          <div style={{marginLeft: '20px'}}>{this.props.orderInfo.customer_name} - {this.props.orderInfo.customer_phone}</div>
          <div style={{marginLeft: '20px'}}>{this.props.orderInfo.customer_location.title}</div>
          </div>
      </div>
    );
  }
}

export default Cart;
