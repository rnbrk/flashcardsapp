import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AddCard from '../components/AddCard';
import EditCard from '../components/EditCard';
import EditCollection from '../components/EditCollection';
import NavDrawer from '../components/NavDrawer';
import NotFoundPage from '../components/NotFoundPage';
import StudySession from '../components/StudySession';
import UserStatus from '../components/UserStatus';

// import createHistory from 'history/createBrowserHistory';
// export const history = createHistory();

const emptyPage = () => <div>Flashcard app</div>;

const AppRouter = () => (
  <BrowserRouter>
    <UserStatus />
    <NavDrawer />
    <Switch>
      <Route path="/" component={emptyPage} exact />
      <Route path="/collection/:collectionId" component={EditCollection} exact />
      <Route path="/collection/:collectionId/add" component={AddCard} />
      <Route path="/card/:cardId" component={EditCard} exact />
      <Route path="/collection/:collectionId/study" component={StudySession} exact />
      <Route component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
