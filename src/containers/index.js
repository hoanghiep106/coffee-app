import React, {Component} from 'react';
//Services
import CategoryService from '../services/Category';
import CustomerService from '../services/Customer';
import OrderService from '../services/Order';
// Config
import { maxShippingFee } from '../config/app';
// Utility functions
import { validateEmail } from '../utils';
// Step frames
import CustomerInfo from '../components/CustomerInfo';
import CustomerLocation from '../components/CustomerLocation';
import Menu from '../components/Menu';
import Cart from '../components/Cart';
// Login modal
import Login from '../components/Login';

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: [
        {
          nextStep: 'Pick your location',
          goNext: this.createCustomer.bind(this),
          render: (props) => <CustomerInfo {...props} />,
        },
        {
          nextStep: 'Check out the menu',
          goNext: this.updateCustomerLocation.bind(this),
          render: (props) =>
            <CustomerLocation { ...props } />,
        },
        {
          nextStep: 'See your cart',
          goNext: this.goNext.bind(this),
          render: (props) => <Menu { ...props } />,
        },
        {
          nextStep: 'Send your order',
          goNext: this.submitOrder.bind(this),
          render: (props) => <Cart { ...props } />,
        }
      ],
      currentStep: 1,
      orderInfo: {},
      categories: [],
      errors: {},
      customerCreated: false,
    };
    this.fetchProducts = this.fetchProducts.bind(this);
    this.goNext = this.goNext.bind(this);
    this.goBack = this.goBack.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts() {
    CategoryService.getCategories().then(res => {
      if(res.data) {
        this.setState({ categories: res.data.categories });
      }
    });
  }

  isDataValid() {
    const { orderInfo, errors } = this.state;
    let errorCount = 0;
    if (this.state.currentStep === 1) {
      if (!orderInfo.customer_name) {
        errors.customer_name = 'Name is required';
        errorCount++;
      } else if (orderInfo.customer_name.length > 50) {
        errors.customer_name = 'Too long name';
        errorCount++;
      } else {
        errors.customer_name = '';
      }
      if (!orderInfo.customer_phone) {
        errors.customer_phone = 'Phone number is required';
        errorCount++;
      } else if (orderInfo.customer_phone.length > 13 || orderInfo.customer_phone.length < 9) {
        errors.customer_phone = 'Phone number is not valid';
        errorCount++;
      } else {
        errors.customer_phone = '';
      }
      if (orderInfo.customer_email && !validateEmail(orderInfo.customer_email)) {
        errors.customer_email = 'Email not valid';
        errorCount++;
      } else {
        errors.customer_email = '';
      }
    } else if (this.state.currentStep === 2) {
      if (!orderInfo.customer_location || !orderInfo.customer_location.title) {
        errors.customer_location = 'Location is required';
        errorCount++;
      } else if (orderInfo.customer_location.fee > maxShippingFee) {
        errors.customer_location = 'Location is out of range';
        errorCount++;
      } else {
        errors.customer_location = '';
      }
    } else if (this.state.currentStep === 3) {
      if (!orderInfo.order_items || orderInfo.order_items.length === 0) {
        errors.customer_location = 'Empty cart';
        errorCount++;
      } else {
        errors.customer_location = '';
      }
    }
    this.setState({ errors });
    if (errorCount > 0) return false;
    return true;
  }

  createCustomer(e) {
    e.preventDefault();
    if (this.isDataValid()) {
      const { orderInfo } = this.state;
      const data = {
        name: orderInfo.customer_name,
        phone_number: orderInfo.customer_phone,
        email: orderInfo.customer_email,
      }
      if (this.state.customerCreated && this.state.orderInfo.customer_id) {
        CustomerService.updateCustomer(this.state.orderInfo.customer_id, data).then(() => {
          this.setState({ currentStep: 2 });
        });
      } else {
        CustomerService.createCustomer(data).then(res => {
          if(res.data) {
            orderInfo.customer_id = res.data.id;
            this.setState({ currentStep: 2, orderInfo, customerCreated: true });
          }
        });
      }
    }
  }

  updateCustomerLocation(e) {
    e.preventDefault();
    if (this.isDataValid()) {
      const { orderInfo } = this.state;
      const id = orderInfo.customer_id;
      const data = {
        location: orderInfo.customer_location.title,
        lat: orderInfo.customer_location.lat,
        lng: orderInfo.customer_location.lng,
      };
      CustomerService.updateCustomer(id, data).then(res => {
        this.setState({ currentStep: 3 });
      });
    }
  }

  goNext(e) {
    e.preventDefault();
    if (this.state.currentStep < 4 && this.isDataValid()) {
      this.setState({
        currentStep: this.state.currentStep + 1
      });
    }
  }

  goBack() {
    if (this.state.currentStep > 0) {
      this.setState({
        currentStep: this.state.currentStep - 1
      });
    }
  }

  handleChange(name, value) {
    if (name) {
      const orderInfo = { ...this.state.orderInfo };
      orderInfo[name] = value;
      this.setState({ orderInfo });
    }
  }

  submitOrder(e) {
    e.preventDefault();
    const { orderInfo } = this.state;
    const data = {
      customer_id: orderInfo.customer_id,
      shop_id: orderInfo.customer_location.shop_id,
      shipping_fee: orderInfo.customer_location.fee,
      order_items: orderInfo.order_items,
      status: 1,
    }
    OrderService.postOrder(data).then(res => {
      if (res.status === 200) {
        alert('Đơn hàng của bạn đang được xử lý. Chúng tôi sẽ liên hệ bạn trong thời gian ngắn nhất để xác nhận. Xin cám ơn!')
      }
    });
  }

  render() {
    return (
      <div className="coffee-app">
        <div className="order-form">
          <div className="flip-wizard">
            <form onSubmit={this.state.steps[this.state.currentStep - 1].goNext}>
              <div className="flip-panel step-panel">
                <div className="flip-card">
                  {this.state.steps[this.state.currentStep - 1].render({
                    goBack: this.goBack,
                    currentStep: this.state.currentStep,
                    handleChange: this.handleChange,
                    categories: this.state.currentStep === 3 && this.state.categories,
                    errors: this.state.errors,
                    orderInfo: this.state.orderInfo,
                  })}
                </div>
              </div>
              <div className="controls">
                <button className="btn-next" type="submit">
                  {this.state.steps[this.state.currentStep - 1].nextStep}
                </button>
              </div>
            </form>
          </div>
        </div>
        <Login />
      </div>
    );
  }
}

export default Container;
