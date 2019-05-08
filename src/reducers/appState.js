const appStateReducer = (state = { activeCollection: null }, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_COLLECTION':
      return {
        ...state,
        activeCollection: action.collectionId
      };

    case 'UNSET_ACTIVE_COLLECTION':
      return {
        ...state,
        activeCollection: null
      };
    default:
      return state;
  }
};

export default appStateReducer;
