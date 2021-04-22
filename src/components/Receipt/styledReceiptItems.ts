import { makeStyles } from '@material-ui/core/styles';

const styledReceiptItems = makeStyles((theme) => ({
  root: {
    position: 'relative',
    padding: theme.spacing(),
    '&:not(:first-child)': {
      marginTop: theme.spacing(2),
    },
    '&:hover': {
      '& $close': {
        display: 'block',
      },
    },
  },
  close: {
    display: 'none',
    position: 'absolute',
    top: -10,
    left: -10,
  },
  itemGrid: {
    display: 'grid',
    gridTemplateRows: '1fr',
    gridTemplateColumns: '6fr 1fr 140px',
    gridGap: theme.spacing(),
    marginBottom: theme.spacing(),
    [theme.breakpoints.down('xs')]: {
      gridTemplateRows: '1fr 1fr',
      gridTemplateColumns: '1fr 4fr',
    },
  },
  name: {
    [theme.breakpoints.down('xs')]: {
      gridColumn: 'span 2',
    },
  },
  category: {
    marginBottom: 'auto',
  },
}));

export default styledReceiptItems;
