import { makeStyles } from '@material-ui/core/styles';

const styledReceiptHeader = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateRows: '1fr',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridGap: theme.spacing(),
    [theme.breakpoints.down('xs')]: {
      gridTemplateRows: '1fr 1fr 1fr',
      gridTemplateColumns: '1fr',
    },
  },
}));

export default styledReceiptHeader;
