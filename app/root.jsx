import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Routes from './routes';
import {MuiThemeProvider} from 'material-ui';


ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Routes />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
