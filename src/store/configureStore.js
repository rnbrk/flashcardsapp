import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import authReducer from '../reducers/auth';
import cardsReducer from '../reducers/cards';
import collectionsReducer from '../reducers/collections';
import { getCardsFromCollectionId } from '../selectors/study';

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

  // Use compose if DEVTOOLS extension does not exist
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  // Use composeEnhancer to combine using Redux devtools with
  // Redux thunk (for connecting Redux store with Firebase database)
  // and asynchronous actions
  const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
  return store;
};

const dataStructure = {
  auth: authReducer,
  cards: [{ collection: 'collection1' }, { collection: 'collection2' }],
  collections: [
    {
      id: 'collection1',
      cardsToStudyPerDay: 20,
      cardsToStudyToday: undefined,
      cardsStudiedToday: undefined,
      indexOfCardToStudy: undefined,
      name: 'Spanish words',
      studyQueue: undefined,
      visibilityfilter: 'SHOW_ALL'
    }
  ]
};
