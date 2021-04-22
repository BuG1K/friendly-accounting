import { FunctionComponent, FormEvent } from 'react';
import {
  Paper, Typography, Chip, TextField, IconButton,
} from '@material-ui/core';
import { HighlightOff, ArrowForward } from '@material-ui/icons';

import useStyles from './styledSettings';
import {
  useSelector, uersArraySelect, сategoriesArraySelect,
  useDispatch, setMiUserAction, deleteUserAction,
  addUserAction, miSelect, defaultCategorySelect,
  setDefaultCategoryAction, deleteСategoryAction,
  addСategoryAction,
} from '~/store';

const Settings: FunctionComponent = () => {
  const classes = useStyles();
  const users = useSelector(uersArraySelect());
  const сategories = useSelector(сategoriesArraySelect());
  const miUser = useSelector(miSelect());
  const defaultCategory = useSelector(defaultCategorySelect());
  const dispatch = useDispatch();

  const cards = [
    {
      key: 'users',
      title: `My user: ${miUser.name}`,
      items: users,
      onClick: (itemId: string) => dispatch(setMiUserAction(itemId)),
      onDelete: (itemId: string) =>
        itemId !== miUser.id && dispatch(deleteUserAction(itemId)),
      onAddItem: (name: string) => dispatch(addUserAction(name)),
      placeholder: 'Username',
    },
    {
      key: 'сategories',
      title: `Default category: ${defaultCategory.name}`,
      items: сategories,
      onClick: (itemId: string) => dispatch(setDefaultCategoryAction(itemId)),
      onDelete: (itemId: string) =>
        itemId !== defaultCategory.id && dispatch(deleteСategoryAction(itemId)),
      onAddItem: (name: string) => dispatch(addСategoryAction(name)),
      placeholder: 'Сategoryname',
    },
  ];

  const onSubmit = (event: FormEvent, action: (name: string) => void) => {
    event.preventDefault();
    const name = event.target?.name.value as string;

    if (name && name.length !== 0) {
      event.target.name.value = '';
      action(name);
    }
  };

  return (
    <div className={classes.root}>
      {cards.map(({
        key, title, items, onClick, onDelete, onAddItem, placeholder,
      }) => (
        <Paper className={classes.card} key={key}>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>

          <div className={classes.items}>
            {items.map(({ id, name }) => (
              <Chip
                className={classes.item}
                key={id}
                label={name}
                onClick={() => onClick(id)}
                onDelete={() => onDelete(id)}
                deleteIcon={<HighlightOff />}
              />
            ))}

            <form
              className={`${classes.form} ${classes.item}`}
              onSubmit={(event) => onSubmit(event, onAddItem)}
            >
              <TextField name="name" placeholder={placeholder} />

              <IconButton type="submit" size="small">
                <ArrowForward />
              </IconButton>
            </form>
          </div>
        </Paper>
      ))}
    </div>
  );
};

export default Settings;
