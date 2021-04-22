import {
  createContext, FunctionComponent, useState, useEffect,
} from 'react';
import { useLocation } from 'react-router-dom';
import { Paper } from '@material-ui/core';

import useStyles from './styledReceipt';
import useReceiptForm from './useReceiptForm';
import ReceiptQRCode from './ReceiptQRCode';
import ReceiptHeader from './ReceiptHeader';
import ReceiptPreview from './ReceiptPreview';
import ReceiptItems from './ReceiptItems';
import ReceiptActions from './ReceiptActions';

type LocationStateType = { qr: string } | undefined

export const ReceiptContext = createContext<
  ReturnType<typeof useReceiptForm>
>({} as any);

const Receipt: FunctionComponent = () => {
  const classes = useStyles();
  const location = useLocation<LocationStateType>();
  const methods = useReceiptForm();
  const { onFetchForm, onSubmit, disabledForm } = methods;
  const [qrCode, setQrCode] = useState<string | null>(null);

  const onSetQrCode = (qr: string) =>
    fetch(`http://localhost:3000/api/qr/${qr}`)
      .then((response) => response.json())
      .then((data) => {
        setQrCode(qr);
        onFetchForm(data);
      });

  useEffect(() => {
    const qr = location.state?.qr;
    if (location.state?.qr) onSetQrCode(qr);
  }, []);

  return (
    <div className={classes.root}>
      <ReceiptContext.Provider value={methods}>
        {!qrCode && (
          <Paper className={classes.card}>
            <ReceiptQRCode onSetQrCode={onSetQrCode} />
          </Paper>
        )}

        <form onSubmit={onSubmit()}>
          <Paper className={classes.card}>
            <ReceiptHeader />
          </Paper>

          <Paper
            className={classes.card}
            style={disabledForm ? { display: 'none' } : undefined}
          >
            <ReceiptItems />
          </Paper>

          {disabledForm && (
            <Paper className={classes.card}>
              <ReceiptPreview />
            </Paper>
          )}

          <Paper className={classes.card}>
            <ReceiptActions />
          </Paper>
        </form>
      </ReceiptContext.Provider>
    </div>
  );
};

export default Receipt;
