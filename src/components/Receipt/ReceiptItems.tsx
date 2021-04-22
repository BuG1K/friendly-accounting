import { FunctionComponent, useContext } from 'react';
import { Controller } from 'react-hook-form';
import {
  Paper, TextField, Select, MenuItem, IconButton,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

import useStyles from './styledReceiptItems';
import { ReceiptContext } from './Receipt';
import { useSelector, сategoriesArraySelect } from '~/store';
import ReceiptUsers from './ReceiptUsers';

const ReceiptItems: FunctionComponent = () => {
  const classes = useStyles();
  const { items, onDeleteItem, control } = useContext(ReceiptContext);
  const сategoriesArray = useSelector(сategoriesArraySelect());

  return (
    <>
      {items.map(({
        id, name, price, categoryId,
      }, index) => (
        <Paper className={classes.root} key={id} elevation={3}>
          <IconButton
            className={classes.close}
            onClick={() => onDeleteItem(index)}
            size="small"
          >
            <Close />
          </IconButton>

          <div className={classes.itemGrid}>
            <Controller
              name={`items[${index}].name`}
              control={control}
              defaultValue={name}
              as={<TextField className={classes.name} placeholder="name" />}
            />

            <Controller
              name={`items[${index}].price`}
              control={control}
              defaultValue={price}
              as={<TextField type="number" placeholder="price" />}
            />

            <Controller
              name={`items[${index}].categoryId`}
              control={control}
              defaultValue={categoryId}
              as={(
                <Select className={classes.category} displayEmpty>
                  {сategoriesArray.map((сategory) => (
                    <MenuItem key={сategory.id} value={сategory.id}>
                      {сategory.name}
                    </MenuItem>
                  ))}
                </Select>
            )}
            />
          </div>

          <ReceiptUsers itemIndex={index} />
        </Paper>
      ))}
    </>
  );
};

export default ReceiptItems;
