import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from '~/theme';
import store from '~/store';
import Page from '~/components';

const appRoot = document.createElement('div');
document.body.appendChild(appRoot);

render((
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <BrowserRouter>
        <Page />
      </BrowserRouter>
    </Provider>
  </ThemeProvider>
), appRoot);
