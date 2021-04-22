import { makeStyles } from '@material-ui/core/styles';

const styledReceiptUser = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: theme.spacing() * -1,
    marginLeft: theme.spacing() * -1,
  },
  container: {
    marginTop: theme.spacing(),
    marginLeft: theme.spacing(),
    width: 130,
    minWidth: 130,
  },
  user: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  textField: {
    width: 20,
  },
  input: {
    paddingTop: 7,
    paddingBottom: 0,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    borderRadius: 0,
  },
}));

export default styledReceiptUser;
