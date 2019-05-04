const collectionsReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_COLLECTION':
      return state.concat([
        {
          ...action.collection,
          id: action.collectionId
        }
      ]);

    case 'REMOVE_COLLECTION':
      return state.filter(collection => collection.id !== action.collectionId);

    case 'SET_COLLECTIONS':
      return [...action.collections];

    case 'REPEAT_CARD':
      return state.map(collection =>
        collection.id === action.collectionId
          ? {
              ...collection,
              cardsToStudyToday: collection.cardsToStudyToday.concat([action.cardId])
            }
          : collection
      );

    case 'INCREMENT_CARDS_STUDIED':
      return state.map(collection =>
        collection.id === action.collectionId
          ? {
              ...collection,
              indexOfCurrentCard: collection.indexOfCurrentCard + 1
            }
          : collection
      );
    default:
      return state;
  }
};

export default collectionsReducer;
