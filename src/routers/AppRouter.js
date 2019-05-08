/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import AddCard from '../components/AddCard';
import ConnectedLoginPage from '../components/LoginPage';
import ConnectedPrivateRoute from './PrivateRoute';
import ConnectedPublicRoute from './PublicRoute';
import Dashboard from '../components/Dashboard';
import EditCard from '../components/EditCard';
import EditCollection from '../components/EditCollection';
import withNavDrawer from '../components/NavDrawer';
import NotFoundPage from '../components/NotFoundPage';
import StudySession from '../components/StudySession';

export const browserHistory = createBrowserHistory();

const AppRouter = () => (
  <Router history={browserHistory}>
    <Switch>
      <ConnectedPublicRoute path="/" component={ConnectedLoginPage} exact />
      <ConnectedPrivateRoute path="/dashboard" component={withNavDrawer(Dashboard)} exact />
      <ConnectedPrivateRoute
        path="/collection/:collectionId"
        component={withNavDrawer(EditCollection)}
        exact
      />
      <ConnectedPrivateRoute
        path="/collection/add/:collectionId"
        component={withNavDrawer(AddCard)}
      />
      <ConnectedPrivateRoute path="/card/:cardId" component={withNavDrawer(EditCard)} exact />
      <ConnectedPrivateRoute
        path="/collection/study/:collectionId"
        component={withNavDrawer(StudySession)}
        exact
      />
      <Route path="/404/" component={NotFoundPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </Router>
);

export default AppRouter;
