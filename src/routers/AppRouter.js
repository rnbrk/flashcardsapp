import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AddCard from '../components/AddCard';
import EditCollection from '../components/EditCollection';
import UserStatus from '../components/UserStatus';

// import createHistory from 'history/createBrowserHistory';
// export const history = createHistory();

const AppRouter = () => (
  <BrowserRouter>
    <UserStatus />
    <Switch>
      <Route path="/" component={EditCollection} exact />
      <Route path="/add" render={() => <AddCard collectionName="Spanish words" exact />} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
