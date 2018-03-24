import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.min.css';

import Landing from './components/Landing';
import CustomerInfo from './components/CustomerInfo';
import CustomerLocation from './components/CustomerLocation';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

class App extends Component {
  render() {
    return (
        <div className="coffee-app">
          <div className="order-form">
            <div className="flip-wizard">
              <div className="flip-panel step-panel">
                <div className="flip-card">
                <CustomerInfo />
                </div>
              </div>
              <div className="controls">
                <button className="btn-next">Chọn vị trí giao hàng
                </button>
              </div>
            </div>
          </div>
          <div className="login-button">
            <img src="assets/img/user_avatar.png"/>
            <div className="text">Đăng nhập để tích điểm</div>
            <a className="hotline" href="tel:0909090909"><i className="fa fa-phone" aria-hidden="true"></i></a>
          </div>
        </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app-container'));
registerServiceWorker();
