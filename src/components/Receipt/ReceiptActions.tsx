import { FunctionComponent, useContext } from 'react';
import { IconButton } from '@material-ui/core';
import { Add, Visibility, Create } from '@material-ui/icons';

import useStyles from './styledReceiptActions';
import { ReceiptContext } from './Receipt';

const ReceiptActions: FunctionComponent = () => {
  const calsses = useStyles();
  const { onAddItem, disabledForm, onToggleDisabledForm } = useContext(ReceiptContext);

  return (
    <div className={calsses.root}>
      <IconButton
        style={!disabledForm ? { display: 'none' } : undefined}
        onClick={onToggleDisabledForm}
      >
        <Create fontSize="large" />
      </IconButton>

      <IconButton
        style={disabledForm ? { display: 'none' } : undefined}
        type="submit"
      >
        <Visibility fontSize="large" />
      </IconButton>

      <IconButton onClick={onAddItem} disabled={disabledForm}>
        <Add fontSize="large" />
      </IconButton>
    </div>
  );
};

export default ReceiptActions;
