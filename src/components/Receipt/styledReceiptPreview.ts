import { makeStyles } from '@material-ui/core/styles';

const styledReceiptPreview = makeStyles((theme) => ({
  root: {
    border: 0,
    '&:not(:first-child)': {
      marginTop: theme.spacing(2),
    },
  },
  header: {
    display: 'flex',
  },
  cardAction: {
    paddingLeft: theme.spacing(),
  },
  line: {
    margin: '4px 0',
  },
}));

export default styledReceiptPreview;
