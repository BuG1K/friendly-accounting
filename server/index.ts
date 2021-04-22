import express from 'express';
import cors from 'cors';
import path from 'path';

import { qrCodeRouter } from './controllers';
import { APP_PORT } from './config';

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, '.')));

app.use('/api/qr', qrCodeRouter);

app.use((_request, response) => {
  response.sendFile(path.join(__dirname, './index.html'));
});

app.listen(APP_PORT);
