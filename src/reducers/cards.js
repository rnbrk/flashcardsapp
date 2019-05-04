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

    case 'REMOVE_ALL_CARDS_FROM_COLLECTION':
      return state.filter(card => card.collectionId !== action.collectionId);

    case 'ANSWER_CARD':
      return state.map(card =>
        card.id === action.id
          ? {
              ...card,
              ...action.updates
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
