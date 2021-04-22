import { makeStyles } from '@material-ui/core/styles';

const styledPageHeader = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      top: 'auto',
      bottom: 0,
    },
  },
  toolbar: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0 80px',
    },
  },
}));

export default styledPageHeader;
