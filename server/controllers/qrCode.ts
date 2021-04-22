import { Router } from 'express';
import fetch from 'node-fetch';

import { INN, PASSWORD, CLIENT_SECRET } from '../config';

const HOST = 'irkkt-mobile.nalog.ru:8888';
const URL = `https://${HOST}/v2`;
const DEVICE_OS = 'iOS';
const CLIENT_VERSION = '2.9.0';
const DEVICE_ID = '7C82010F-16CC-446B-8F66-FC4080C66521';
const ACCEPT = '*/*';
const USER_AGENT = 'billchecker/2.9.0 (iPhone; iOS 13.6; Scale/2.00)';
const ACCEPT_LANGUAGE = 'ru-RU;q=1, en-US;q=0.9';
const router = Router();

router.get('/:qr', async (request, response) => {
  const onFetch = ({
    url, method, getKeyData, options = {}, body,
  }: {
    url: string
    method: 'POST' | 'GET'
    getKeyData?: string
    options?: { [key: string]: string }
    body?: { [key: string]: string }
  }) => {
    const headers = {
      Host: HOST,
      Accept: ACCEPT,
      'Device-OS': DEVICE_OS,
      'Device-Id': DEVICE_ID,
      clientVersion: CLIENT_VERSION,
      'Accept-Language': ACCEPT_LANGUAGE,
      'User-Agent': USER_AGENT,
      'Content-Type': 'application/json',
      mode: 'no-cors',
      ...options,
    };
    const init = {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    };

    return fetch(`${URL}/${url}`, init)
      .then((res) => res.json())
      .then((data: any) => (getKeyData ? data[getKeyData] : data))
      .catch(() => response.sendStatus(500));
  };

  const sessionId = await onFetch({
    url: 'mobile/users/lkfl/auth',
    method: 'POST',
    getKeyData: 'sessionId',
    body: {
      inn: INN,
      client_secret: CLIENT_SECRET,
      password: PASSWORD,
    },
  });

  const receiptId = await onFetch({
    url: 'ticket',
    method: 'POST',
    getKeyData: 'id',
    options: { sessionId },
    body: { qr: request.params.qr },
  });

  const receipt = await onFetch({
    url: `tickets/${receiptId}`,
    method: 'GET',
    options: { sessionId },
  });

  response.json({
    date: receipt.query.date,
    shop: receipt.seller.name,
    items: receipt.ticket.document.receipt.items.map(({ name, sum }: {
      name: string
      sum: number
    }) => ({ price: sum / 100, name })),
  });
});

export default router;
