import { FunctionComponent } from 'react';
import { Route } from 'react-router-dom';
import {
  AddCircleOutline, Camera as CameraIcon, Settings as SettingsIcon,
} from '@material-ui/icons';

import useStyles from './styledPage';
import PageHeader from './PageHeader';
import Receipt from '../Receipt';
import Camera from '../Camera';
import Settings from '../Settings';

const Page: FunctionComponent = () => {
  const classes = useStyles();

  const navigation = [
    {
      key: 'receipt',
      path: '/',
      label: 'Receipt',
      Icon: AddCircleOutline,
      Component: Receipt,
    },
    {
      key: 'camera',
      path: '/camera',
      label: 'Camera',
      Icon: CameraIcon,
      Component: Camera,
    },
    {
      key: 'settings',
      path: '/settings',
      label: 'Settings',
      Icon: SettingsIcon,
      Component: Settings,
    },
  ];

  return (
    <>
      <PageHeader navigation={navigation} />

      <div className={classes.content}>
        {navigation.map(({ key, path, Component }) => (
          <Route key={key} exact path={path} component={Component} />
        ))}
      </div>
    </>
  );
};

export default Page;
