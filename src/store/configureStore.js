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

// const dataStructure = {
//   auth: authReducer,
//   cards: {
//     collectionId: {
//       collection: [{}, {}, {}],
//       studySession: {
//         cardQueue: ['id1', 'id2', 'id3'],
//         currentCardToStudy: 2,
//         collection: 'collection1'
//       }
//     }
//   }
// };

const dataStructure2 = {
  auth: authReducer,
  cards: [{ collection: 'collection1' }, { collection: 'collection2' }],
  collections: [
    {
      id: 'collection1',
      cardsToStudyPerDay: 20,
      cardsToStudyToday: 15,
      cardsStudiedToday: 5,
      indexOfCardToStudy: 2,
      name: 'Spanish words',
      studyQueue: ['id1', 'id2', 'id3']
    }
  ]
};
