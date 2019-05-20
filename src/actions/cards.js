import database from '../firebase/firebase';
import updateStudyProgress from '../reducers/updateStudyProgress';

export const addCard = card => ({
  type: 'ADD_CARD',
  card
});

export const startAddCard = card => {
  return (dispatch, getState) => {
    const {
      auth: { uid }
    } = getState();

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
  return (dispatch, getState) => {
    const {
      auth: { uid }
    } = getState();

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
  return (dispatch, getState) => {
    const {
      auth: { uid }
    } = getState();

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

export const startRemoveAllCardsFromCollection = collectionId => {
  return (dispatch, getState) => {
    const {
      auth: { uid }
    } = getState();

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

export const startSetCards = () => {
  return (dispatch, getState) => {
    const {
      auth: { uid }
    } = getState();

    return database
      .ref(`users/${uid}/cards`)
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
  if (grade > 5 || grade < 1 || !Number.isInteger(Number(grade))) {
    throw Error('Expected grade to be between 5 and 1.');
  }

  const cardId = card.id;
  const updates = updateStudyProgress(card, grade);

  return (dispatch, getState) => {
    const {
      auth: { uid }
    } = getState();

    return database
      .ref(`users/${uid}/cards/${cardId}`)
      .update(updates)
      .then(() => {
        dispatch(answerCard(cardId, updates));
      });
  };
};
