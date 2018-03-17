import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Landing from './components/Landing';
import CustomerInfo from './components/CustomerInfo';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

class App extends Component {
  render() {
    return (
      <CustomerInfo />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
