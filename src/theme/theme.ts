import { createMuiTheme } from '@material-ui/core/styles';

import globalStyles from './globalStyles';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: '#2196f3' },
    secondary: { main: '#16b823' },
  },
  overrides: {
    MuiCssBaseline: { '@global': globalStyles },
  },
});

export default theme;
