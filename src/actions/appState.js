import { collectionIdExists } from '../selectors/collections';

export const setActiveCollection = collectionId => ({
  type: 'SET_ACTIVE_COLLECTION',
  collectionId
});

export const unsetActiveCollection = () => ({
  type: 'UNSET_ACTIVE_COLLECTION'
});

export const startSetActiveCollection = collectionId => {
  return (dispatch, getState) => {
    const {
      collections,
      appState: { activeCollection }
    } = getState();

    if (collectionId !== activeCollection) {
      if (collectionIdExists(collections, collectionId)) {
        dispatch(setActiveCollection(collectionId));
      } else if (!collectionIdExists(collections, collectionId) && activeCollection !== null) {
        dispatch(unsetActiveCollection());
      }
    }
  };
};

export const toggleDrawer = () => ({
  type: 'TOGGLE_SHOW_DRAWER'
});
