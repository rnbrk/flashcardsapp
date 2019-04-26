import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AddCard from '../components/AddCard';
import EditCard from '../components/EditCard';
import EditCollection from '../components/EditCollection';
import NotFoundPage from '../components/NotFoundPage';
import StudySession from '../components/StudySession';
import UserStatus from '../components/UserStatus';

// import createHistory from 'history/createBrowserHistory';
// export const history = createHistory();

const AppRouter = () => (
  <BrowserRouter>
    <UserStatus />
    <Switch>
      <Route path="/" component={EditCollection} exact />
      <Route path="/add" render={() => <AddCard collectionName="Spanish words" exact />} />
      <Route path="/edit:id" component={EditCard} />
      <Route path="/study" component={StudySession} />
      <Route component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
