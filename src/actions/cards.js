import database from '../firebase/firebase';
import updateStudyProgress from '../supermemo2/updateStudyProgress';

const uid = 'user1';

export const addCard = card => ({
  type: 'ADD_CARD',
  card
});

export const startAddCard = card => {
  return dispatch => {
    return database
      .ref(`users/${uid}/cards`)
      .push(card)
      .then(reference => {
        dispatch(
          addCard({
            id: reference.key,
            ...card
          })
        );
      });
  };
};

export const editCard = (id, updates) => ({
  type: 'EDIT_CARD',
  id,
  updates
});

export const startEditCard = (cardId, updates) => {
  return dispatch => {
    return database
      .ref(`users/${uid}/cards/${cardId}`)
      .update(updates)
      .then(() => {
        dispatch(editCard(cardId, updates));
      });
  };
};

export const removeCard = id => ({
  type: 'REMOVE_CARD',
  id
});

export const startRemoveCard = cardId => {
  return dispatch => {
    return database
      .ref(`users/${uid}/cards/${cardId}`)
      .remove()
      .then(() => {
        dispatch(removeCard(cardId));
      });
  };
};

export const removeAllCardsFromCollection = collectionId => ({
  type: 'REMOVE_ALL_CARDS_FROM_COLLECTION',
  collectionId
});

// TODO: startRemoveAllCardsFromCollection
export const startRemoveAllCardsFromCollection = collectionId => {
  return (dispatch, getState) => {
    const cardsToRemove = getState().cards.filter(card => card.collectionId === collectionId);
    const nodesToRemove = {};
    cardsToRemove.forEach(card => {
      nodesToRemove[card.id] = null;
    });
    return database
      .ref(`users/${uid}/cards/`)
      .update(nodesToRemove)
      .then(() => {
        dispatch(removeAllCardsFromCollection(collectionId));
      });
  };
};

export const setCards = cards => ({
  type: 'SET_CARDS',
  cards
});

export const startSetCards = collectionId => {
  return dispatch => {
    return database
      .ref(`users/${uid}/cards`)
      .orderByChild('collectionId')
      .equalTo(collectionId)
      .once('value')
      .then(snapshot => {
        const cards = [];
        snapshot.forEach(childNode => {
          cards.push({
            id: childNode.key,
            ...childNode.val()
          });
        });
        dispatch(setCards(cards));
      });
  };
};

export const answerCard = (id, updates) => ({
  type: 'ANSWER_CARD',
  id,
  updates
});

export const startAnswerCard = (card, grade) => {
  const cardId = card.id;
  const updates = updateStudyProgress(card, grade);

  return dispatch => {
    return database
      .ref(`users/${uid}/cards/${cardId}`)
      .update(updates)
      .then(() => {
        dispatch(answerCard(cardId, updates));
      });
  };
};
