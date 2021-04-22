import { makeStyles } from '@material-ui/core/styles';

const styledSettings = makeStyles((theme) => ({
  root: {
    maxWidth: 700,
    width: '100%',
  },
  card: {
    borderRadius: 0,
    padding: theme.spacing(2),
    '&:not(:first-child)': {
      marginTop: theme.spacing(2),
    },
  },
  items: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: theme.spacing() * -1,
    marginLeft: theme.spacing() * -1,
  },
  item: {
    marginTop: theme.spacing(),
    marginLeft: theme.spacing(),
  },
  form: {
    '& input': {
      width: 110,
    },
  },
}));

export default styledSettings;
