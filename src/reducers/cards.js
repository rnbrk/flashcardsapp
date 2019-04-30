import updateStudyProgress from '../supermemo2/updateStudyProgress';

const cardsReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_CARD':
      return [...state, action.card];

    case 'EDIT_CARD':
      return state.map(card =>
        card.id === action.id
          ? {
              ...card,
              ...action.updates
            }
          : card
      );

    case 'REMOVE_CARD':
      return state.filter(card => card.id !== action.id);

    case 'ANSWER_CARD':
      return state.map(card =>
        card.id === action.id
          ? {
              ...updateStudyProgress(card, action.grade)
            }
          : card
      );

    case 'SET_CARDS':
      return [...action.cards];

    default:
      return state;
  }
};

export default cardsReducer;
