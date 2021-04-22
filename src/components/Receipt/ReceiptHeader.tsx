import { FunctionComponent, useContext } from 'react';
import { Controller } from 'react-hook-form';
import {
  FormControl, Select, MenuItem, TextField, InputLabel,
} from '@material-ui/core';

import useStyles from './styledReceiptHeader';
import { useSelector, uersArraySelect } from '~/store';
import { ReceiptContext } from './Receipt';

const ReceiptHeader: FunctionComponent = () => {
  const classes = useStyles();
  const users = useSelector(uersArraySelect());
  const { control, disabledForm } = useContext(ReceiptContext);

  return (
    <div className={classes.root}>
      <Controller
        name="authorId"
        control={control}
        render={(props) => (
          <FormControl>
            <InputLabel>Author name</InputLabel>

            <Select
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              disabled={disabledForm}
              {...props}
            >
              {users.map(({ id, name }) => (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />

      <Controller
        name="date"
        control={control}
        as={(
          <TextField
            label="Date"
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            disabled={disabledForm}
          />
        )}
      />

      <Controller
        name="shop"
        control={control}
        as={(
          <TextField label="Shop name" disabled={disabledForm} />
        )}
      />
    </div>
  );
};

export default ReceiptHeader;
