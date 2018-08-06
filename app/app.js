import 'cssrecipes-defaults/lib/document-remove-margin-padding.css';
import 'cssrecipes-defaults/lib/box-sizing.css';
import 'cssrecipes-defaults/lib/hidden.css';
import 'normalize.css/normalize.css';
import './assets/styles/main.scss';
import {purple500} from 'material-ui/styles/colors';

import React from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Root from './components/Root/Root';
import { Provider } from 'react-redux';
import store from './store';

const muiTheme = getMuiTheme({
 textField: {
      focusColor: "#CBA1E1",
    },
});

render(
  <Provider store={ store }>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Root/>
    </MuiThemeProvider>
  </Provider>,
  document.querySelector('#app')
);
