const appStateReducer = (state = { activeCollection: null }, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_COLLECTION':
      return {
        ...state,
        activeCollection: action.collectionId
      };
    default:
      return state;
  }
};

export default appStateReducer;
