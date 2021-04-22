import { makeStyles } from '@material-ui/core/styles';

const styledReceipt = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2) * -1,
    maxWidth: 700,
    width: '100%',
  },
  card: {
    borderRadius: 0,
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
}));

export default styledReceipt;
