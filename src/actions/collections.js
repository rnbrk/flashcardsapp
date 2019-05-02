import database from '../firebase/firebase';

const uid = 'user1';

export const addCollection = (collection, collectionId) => ({
  type: 'ADD_COLLECTION',
  collection,
  collectionId
});

export const startAddCollection = collection => {
  return dispatch => {
    return database
      .ref(`users/${uid}/collections`)
      .push(collection)
      .then(reference => {
        dispatch(addCollection(collection, reference.key));
      });
  };
};

export const setCollections = collections => ({
  type: 'SET_COLLECTIONS',
  collections
});

export const startsetCollections = () => {
  return dispatch => {
    return database
      .ref(`users/${uid}/collections`)
      .once('value')
      .then(snapshot => {
        const collections = snapshot.val();
        Object.keys(collections).forEach(key => {
          collections[key].id = key;
        });
        dispatch(setCollections(collections));
      });
  };
};

export const getCardsToStudy = collectionId => ({
  type: 'GET_CARDS_TO_STUDY',
  collectionId
});

export const repeatCard = (cardId, collectionId) => ({
  type: 'REPEAT_CARD',
  collectionId,
  cardId
});

export const incrementCardsStudied = collectionId => ({
  type: 'INCREMENT_CARDS_STUDIED',
  collectionId
});

// TODO: startIncrementCardsStudied

// TODO: resetCardsStudied

export const setDailyStudyLimit = (dailyStudyLimit, collectionId) => ({
  type: 'SET_DAILY_STUDY_LIMIT',
  collectionId,
  dailyStudyLimit
});
