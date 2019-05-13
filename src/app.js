import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import AppRouter, { browserHistory } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';
import { firebase } from './firebase/firebase';

import { startSetActiveCollection } from './actions/appState';
import { startSetCards } from './actions/cards';
import { startSetCollections } from './actions/collections';

import LoadingPage from './components/LoadingPage';

import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();

const appElement = document.querySelector('#app');

const app = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(app, appElement);
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, appElement);

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch(login(user.uid));
    store.dispatch(startSetCards());
    store.dispatch(startSetCollections()).then(() => {
      const collectionIdFromUrl = browserHistory.location.pathname.split('/').pop();
      store.dispatch(startSetActiveCollection(collectionIdFromUrl));
      renderApp();

      if (browserHistory.location.pathname === '/') {
        browserHistory.push('/dashboard');
      }
    });
  } else {
    store.dispatch(logout());
    renderApp();
    browserHistory.push('/');
  }
});

// update activeCollection when routing changes
browserHistory.listen(() => {
  const collectionIdFromUrl = browserHistory.location.pathname.split('/').pop();
  store.dispatch(startSetActiveCollection(collectionIdFromUrl));
});
