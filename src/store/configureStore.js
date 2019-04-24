import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import authReducer from '../reducers/auth';
import cardsReducer from '../reducers/cards';

export default () => {
  const reducer = combineReducers({
    auth: authReducer,
    cards: cardsReducer,
    cardsDuePerDay: 20,
    cardsVisibilityfilter: 'SHOW_ALL',
    collectionName: 'Spanish words',
    collections: ['Spanish words'],
    id: 'id12345'
  });

  // Use compose if DEVTOOLS extension does not exist
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  // Use composeEnhancer to combine using Redux devtools with
  // Redux thunk (for connecting Redux store with Firebase database)
  // and asynchronous actions
  const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
  return store;
};
