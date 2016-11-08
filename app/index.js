import React from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Routers from './config/router';

//Material-ui requires muiThemeProvider wrapped around the components(inside routers)
const App = () => (
  <MuiThemeProvider>
    <Routers />
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
