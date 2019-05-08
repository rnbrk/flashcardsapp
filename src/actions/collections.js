import database from '../firebase/firebase';
import { startRemoveAllCardsFromCollection } from './cards';

export const addCollection = (collection, collectionId) => ({
  type: 'ADD_COLLECTION',
  collection,
  collectionId
});

export const startAddCollection = collection => {
  return (dispatch, getState) => {
    const {
      auth: { uid }
    } = getState();

    return database
      .ref(`users/${uid}/collections`)
      .push(collection)
      .then(reference => {
        dispatch(addCollection(collection, reference.key));
      });
  };
};

export const removeCollection = collectionId => ({
  type: 'REMOVE_COLLECTION',
  collectionId
});

export const startRemoveCollection = collectionId => {
  return (dispatch, getState) => {
    const {
      auth: { uid }
    } = getState();

    return database
      .ref(`users/${uid}/collections/${collectionId}`)
      .remove()
      .then(() => {
        dispatch(removeCollection(collectionId));
        dispatch(startRemoveAllCardsFromCollection(collectionId));
      });
  };
};

export const setCollections = collections => ({
  type: 'SET_COLLECTIONS',
  collections
});

export const startSetCollections = () => {
  return (dispatch, getState) => {
    const {
      auth: { uid }
    } = getState();

    return database
      .ref(`users/${uid}/collections`)
      .once('value')
      .then(snapshot => {
        const collections = [];
        snapshot.forEach(childNode => {
          collections.push({
            id: childNode.key,
            cardsToStudyToday: [],
            ...childNode.val()
          });
        });
        dispatch(setCollections(collections));
      });
  };
};

export const repeatCard = (cardId, collectionId) => ({
  type: 'REPEAT_CARD',
  collectionId,
  cardId
});

export const incrementCardsStudied = collectionId => ({
  type: 'INCREMENT_CARDS_STUDIED',
  collectionId
});

export const setDailyStudyLimit = (dailyStudyLimit, collectionId) => ({
  type: 'SET_DAILY_STUDY_LIMIT',
  collectionId,
  dailyStudyLimit
});
