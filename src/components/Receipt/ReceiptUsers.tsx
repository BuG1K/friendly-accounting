import { FunctionComponent, useState, useContext } from 'react';
import { Controller } from 'react-hook-form';
import { IconButton, Button, TextField } from '@material-ui/core';
import { Close } from '@material-ui/icons';

import useStyles from './styledReceiptUsers';
import { useSelector, uersArraySelect } from '~/store';
import { ReceiptContext } from './Receipt';

interface PropsType {
  itemIndex: number
}

const ReceiptUsers: FunctionComponent<PropsType> = ({ itemIndex }) => {
  const classes = useStyles();
  const stateUsers = useSelector(uersArraySelect());
  const [showUsers, setShowUsers] = useState<string[]>([]);
  const { setValue, getValues, control } = useContext(ReceiptContext);

  const onHideUser = (userId: string) =>
    setShowUsers(showUsers.filter((id) => id !== userId));

  const onShowUser = (userId: string) => setShowUsers([...showUsers, userId]);

  const getName = (id: string) => `items[${itemIndex}].users[${id}]`;

  const onSetValueUser = (id: string) => {
    const name = getName(id);
    setValue(name, Number(getValues(name)) + 1);
  };

  return (
    <div className={classes.root}>
      {stateUsers.map(({ id, name }) => (
        <div className={classes.container} key={id}>
          {showUsers.includes(id) ? (
            <div className={classes.user}>
              <IconButton onClick={() => onHideUser(id)} size="small">
                <Close fontSize="inherit" />
              </IconButton>

              <Button onClick={() => onSetValueUser(id)} color="primary">
                {name}
              </Button>

              <Controller
                name={getName(id)}
                control={control}
                defaultValue="1"
                as={(
                  <TextField
                    className={classes.textField}
                    inputProps={{ className: classes.input }}
                    type="number"
                  />
                )}
              />
            </div>
          ) : (
            <Button
              className={classes.button}
              onClick={() => onShowUser(id)}
              variant="contained"
            >
              {name}
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReceiptUsers;
