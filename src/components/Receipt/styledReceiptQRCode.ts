import { makeStyles } from '@material-ui/core/styles';

const styledReceiptQRCode = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridTemplateRows: '1fr 1fr 1fr',
    gridGap: theme.spacing(),
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: '1fr 1fr 1fr 1fr',
    },
  },
  button: {
    gridColumn: 3,
    [theme.breakpoints.down('xs')]: {
      gridColumn: 'span 2',
    },
  },
}));

export default styledReceiptQRCode;
