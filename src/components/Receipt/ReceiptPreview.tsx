import {
  FunctionComponent, useContext, useMemo,
} from 'react';
import moment from 'moment';
import copy from 'copy-to-clipboard';
import { Card, CardActionArea, Typography } from '@material-ui/core';

import useStyles from './styledReceiptPreview';
import { ReceiptContext } from './Receipt';
import {
  useSelector, miSelect, usersStateSelect, сategoriesStateSelect,
} from '~/store';

interface TransactionType {
  id: string
  name: string
  sum: number
  lines: string[]
}

const ReceiptPreview: FunctionComponent = () => {
  const classes = useStyles();
  const { getValues } = useContext(ReceiptContext);
  const { authorId, date, items } = getValues();
  const miId = useSelector(miSelect()).id;
  const usersState = useSelector(usersStateSelect());
  const categoriesState = useSelector(сategoriesStateSelect());

  const transactions = useMemo(() => {
    let usersTransactions: TransactionType[] = [];
    let categoriesTransactions: TransactionType[] = [];

    items.forEach(({
      users = {}, price, name, categoryId,
    }) => {
      const setTransactions = (
        itemsTransactions: TransactionType[],
        transactionId: string,
        transactionName: string,
        userCount: string,
      ) => {
        let result = itemsTransactions;
        const foundTransaction = itemsTransactions.some(
          (transaction) => transaction.id === transactionId,
        );
        const sumCount = Object.values(users)
          .reduce((prevState, count) => prevState + Number(count), 0);
        const sum = (Number(price) / sumCount) * Number(userCount);
        const roundSum = Math.round(sum * 100) / 100;
        const lineCount = sumCount !== 1 ? `${userCount}/${sumCount} | ` : '';
        const line = `[ ${name} | ${lineCount}${price} ]`;

        if (foundTransaction) {
          result = result.map((transaction) => {
            if (transaction.id === transactionId) {
              return {
                ...transaction,
                sum: Number((transaction.sum + roundSum).toFixed(2)),
                lines: [...transaction.lines, line],
              };
            }

            return transaction;
          });
        } else {
          result.push({
            id: transactionId,
            name: transactionName,
            sum: roundSum,
            lines: [line],
          });
        }

        return result;
      };

      if (users[miId]) {
        categoriesTransactions = setTransactions(
          categoriesTransactions,
          categoryId,
          categoriesState[categoryId].name,
          users[miId],
        );
      }

      if (authorId === miId) {
        Object.entries(users).forEach(([userId, userCount]) => {
          if (userId !== miId) {
            usersTransactions = setTransactions(
              usersTransactions,
              userId,
              usersState[userId].name,
              userCount,
            );
          }
        });
      } else if (users[miId]) {
        usersTransactions = setTransactions(
          usersTransactions,
          authorId,
          usersState[authorId].name,
          users[miId],
        );
      }
    });

    return [...usersTransactions, ...categoriesTransactions];
  }, []);

  const getTextFromLines = (lines: string[]) => [
    ...lines,
    `[${moment(date).format('HH:mm')}]`,
  ].join('\n');

  const onClick = (key: string, text: string) => {
    const element = document.querySelectorAll(`[data-key="${key}"]`)[0] as HTMLElement;

    if (element) element.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    copy(text);
  };

  return (
    <>
      {transactions.map(({
        id, name, sum, lines,
      }) => (
        <Card className={classes.root} key={id}>
          <div className={classes.header}>
            <CardActionArea
              className={classes.cardAction}
              data-key={`${id}name`}
              onClick={() => onClick(`${id}name`, name)}
            >
              <Typography variant="h5" component="h2">
                {name}
              </Typography>
            </CardActionArea>

            <CardActionArea
              className={classes.cardAction}
              data-key={`${id}sum`}
              onClick={() => onClick(`${id}sum`, String(sum))}
            >
              <Typography
                variant="h5"
                component="h2"
                color={id === authorId ? 'secondary' : undefined}
              >
                {sum}
              </Typography>
            </CardActionArea>
          </div>

          <CardActionArea
            className={classes.cardAction}
            data-key={`${id}lines`}
            onClick={() => onClick(`${id}lines`, getTextFromLines(lines))}
          >
            {lines.map((line) => (
              <Typography
                className={classes.line}
                key={line}
                variant="body2"
                color="textSecondary"
                component="p"
              >
                {line}
              </Typography>
            ))}
          </CardActionArea>
        </Card>
      ))}
    </>
  );
};

export default ReceiptPreview;
