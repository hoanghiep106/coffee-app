import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import CategoryService from '../services/Category';
import { maxDistance } from '../config/app';
import { validateEmail } from '../utils';
import CustomerInfo from '../components/CustomerInfo';
import CustomerLocation from '../components/CustomerLocation';
import Menu from '../components/Menu';
import Cart from '../components/Cart';
import Login from '../components/Login';

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: [
        {
          nextStep: 'Pick your location',
          goNext: () => this.goNext(),
          render: (props) => <CustomerInfo {...props} />,
        },
        {
          nextStep: 'Check out the menu',
          goNext: () => this.goNext(),
          render: (props) =>
            <CustomerLocation { ...props } />,
        },
        {
          nextStep: 'See your cart',
          goNext: () => this.goNext(),
          render: (props) => <Menu { ...props } />,
        },
        {
          nextStep: 'Send your order',
          goNext: () => this.submitOrder(),
          render: (props) => <Cart { ...props } />,
        }
      ],
      currentStep: 1,
      orderInfo: {},
      categories: [],
      errors: {},
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
      if (!orderInfo.customer_location) {
        errors.customer_location = 'Location is required';
        errorCount++;
      } else if (orderInfo.distance > maxDistance) {
        errors.customer_location = 'Location is out of range';
        errorCount++;
      } else {
        errors.customer_location = '';
      }
    }
    this.setState({ errors });
    if (errorCount > 0) return false;
    return true;
  }

  goNext() {
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

  submitOrder() {
    console.log(this.state.orderInfo);
  }

  render() {
    return (
      <div className="coffee-app">
        <div className="order-form">
          <div className="flip-wizard">
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
                  <button className="btn-next" onClick={this.state.steps[this.state.currentStep - 1].goNext}>
                    {this.state.steps[this.state.currentStep - 1].nextStep}
                  </button>
              </div>
          </div>
        </div>
        <Login />
      </div>
    );
  }
}

export default Container;
