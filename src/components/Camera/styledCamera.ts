import { makeStyles } from '@material-ui/core/styles';

import { headerHeight } from '~/theme';

const cameraStyled = makeStyles((theme) => ({
  root: {
    width: 'calc(100% - 20px)',
    height: 'auto',
    maxWidth: 720,
    [theme.breakpoints.down('xs')]: {
      width: 'auto',
      height: `calc(100vh - ${headerHeight}px)`,
    },
  },
}));

export default cameraStyled;
