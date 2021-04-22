import {
  Dispatch, FunctionComponent, useState, ChangeEvent, useContext,
} from 'react';
import { TextField, Button } from '@material-ui/core';

import useStyles from './styledReceiptQRCode';
import { ReceiptContext } from './Receipt';

interface PropsType {
  onSetQrCode: Dispatch<string>
}

const ReceiptQRCode: FunctionComponent<PropsType> = ({ onSetQrCode }) => {
  const classes = useStyles();
  const [params, setParams] = useState({
    t: '', s: '', fn: '', i: '', fp: '', n: '',
  });
  const { disabledForm } = useContext(ReceiptContext);

  const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => setParams({
    ...params,
    [target.name]: target.value,
  });

  const onClick = () => {
    let qr = '';

    Object.entries(params).forEach(([name, value]) => {
      qr += `&${name}=${value}`;
    });
    onSetQrCode(qr.slice(1));
  };

  return (
    <div className={classes.root}>
      {Object.entries(params).map(([name, value]) => (
        <TextField
          key={name}
          name={name}
          label={name}
          value={value}
          onChange={onChange}
          disabled={disabledForm}
        />
      ))}

      <Button
        className={classes.button}
        variant="contained"
        onClick={onClick}
        disabled={disabledForm}
      >
        FETCH
      </Button>
    </div>
  );
};

export default ReceiptQRCode;
