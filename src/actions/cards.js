import database from '../firebase/firebase';

export const addCard = card => ({
  type: 'ADD_CARD',
  card
});

// export const startAddCard = card => ({

// })

export const editCard = (id, updates) => ({
  type: 'EDIT_CARD',
  id,
  updates
});

export const removeCard = id => ({
  type: 'REMOVE_CARD',
  id
});

export const answerCard = (id, grade) => ({
  type: 'ANSWER_CARD',
  id,
  grade
});
