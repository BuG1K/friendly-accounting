import { makeStyles } from '@material-ui/core/styles';

import { headerHeight } from '~/theme';

const styledPage = makeStyles((theme) => ({
  content: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: headerHeight + theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      paddingTop: 0,
      paddingBottom: headerHeight,
    },
  },
}));

export default styledPage;
