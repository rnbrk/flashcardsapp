import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
// import { login, logout } from './actions/auth';
// import { firebase } from './firebase/firebase';

import EditCollection from './components/EditCollection';
import UserStatus from './components/UserStatus';

import { startSetCards } from './actions/cards';
import { startSetCollections } from './actions/collections';

import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

store.dispatch(startSetCollections());

// const monitorActiveCollection = () => {
//   let activeCollection;
//   return (dispatch, getState) => {
//     if (activeCollection !== getState().activeCollection) {
//       activeCollection = getState().activeCollection;
//       store.dispatch(startSetCards(activeCollection));
//     }
//   };
// };

// store.subscribe(monitorActiveCollection());

ReactDOM.render(jsx, document.querySelector('#app'));

// const store = configureStore();

// const jsx = (
//   <Provider store={store}>
//     <AppRouter />
//   </Provider>
// );

// let hasRendered = false;
// const renderApp = () => {
//   if (!hasRendered) {
//     ReactDOM.render(jsx, document.querySelector('#app'));
//     hasRendered = true;
//   }
// };

// ReactDOM.render(<LoadingPage />, document.querySelector('#app'));

// firebase.auth().onAuthStateChanged(user => {
//   if (user) {
//     store.dispatch(login(user.uid));
//     renderApp();
//     if (history.location.pathname === '/') {
//       history.push('/dashboard');
//     }
//   } else {
//     store.dispatch(logout());
//     renderApp();
//     history.push('/');
//   }
// });
