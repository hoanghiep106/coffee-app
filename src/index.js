import React, {Component} from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.min.css';

import Landing from './components/Landing';
import Container from './containers';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/app" name="Container" component={Container} />
          <Route path="/" name="Landing" component={Landing} />
        </Switch>
      </HashRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app-container'));
registerServiceWorker();
