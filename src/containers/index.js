import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import CategoryService from '../services/Category';
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
          nextStep: 'Chọn ví trí giao hàng',
          goNext: () => this.goNext(),
          render: (props) => <CustomerInfo {...props} />,
        },
        {
          nextStep: 'Chọn món',
          goNext: () => this.goNext(),
          render: (props) =>
            <CustomerLocation { ...props } />,
        },
        {
          nextStep: 'Xem giỏ hàng',
          goNext: () => this.goNext(),
          render: (props) => <Menu { ...props } />,
        },
        {
          nextStep: 'Gửi đơn hàng',
          goNext: () => this.submitOrder(),
          render: (props) => <Cart { ...props } />,
        }
      ],
      currentStep: 1,
      orderInfo: {},
      categories: [],
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

  goNext() {
    if (this.state.currentStep < 4) {
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
