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

export const setCards = cards => ({
  type: 'SET_CARDS',
  cards
});

export const startSetCards = collectionId => {
  return dispatch => {
    return (
      database
        .ref(`users/${uid}/cards`)
        // .orderByChild('collectionId')
        // .equalTo(collectionId)
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
        })
    );
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
    console.log('gradedCard updates', updates);
    return database
      .ref(`users/${uid}/cards/${cardId}`)
      .update(updates)
      .then(() => {
        dispatch(answerCard(cardId, updates));
      });
  };
};
