import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import authReducer from '../reducers/auth';
import cardsReducer from '../reducers/cards';
import collectionsReducer from '../reducers/collections';

export default () => {
  const reducer = (state = {}, action) => {
    return {
      auth: authReducer(state.auth, action),
      cards: cardsReducer(state.cards, action),
      collections: collectionsReducer(state.collections, {
        ...action,
        cards: state.cards
      })
    };
  };

  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
  return store;
};
