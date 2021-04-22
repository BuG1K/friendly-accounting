import { FunctionComponent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, BottomNavigationAction } from '@material-ui/core';

import useStyles from './styledPageHeader';

interface Props {
  navigation: {
    key: string
    path: string
    label: string
    Icon: FunctionComponent
  }[]
}

const PageHeader: FunctionComponent<Props> = ({ navigation }) => {
  const classes = useStyles();
  const { pathname } = useLocation();

  return (
    <AppBar className={classes.root} position="fixed">
      <Toolbar className={classes.toolbar}>
        {navigation.map(({
          key, path, label, Icon,
        }) => (
          <Link key={key} to={path}>
            <BottomNavigationAction
              key={key}
              value={path}
              label={label}
              showLabel={pathname === path}
              icon={<Icon />}
            />
          </Link>
        ))}
      </Toolbar>
    </AppBar>
  );
};

export default PageHeader;
