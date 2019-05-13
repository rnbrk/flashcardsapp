const appStateReducer = (state = { activeCollection: null, showDrawer: true }, action) => {
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

    case 'TOGGLE_SHOW_DRAWER':
      return {
        ...state,
        showDrawer: !state.showDrawer
      };
    default:
      return state;
  }
};

export default appStateReducer;
