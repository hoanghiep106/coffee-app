import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Landing from './pages/Landing';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

class App extends Component {
  render() {
    return (
      <Landing />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
