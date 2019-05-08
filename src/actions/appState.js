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
      if (collectionIdExists(collectionId, collections)) {
        dispatch(setActiveCollection(collectionId));
      } else if (!collectionIdExists(collectionId, collections) && activeCollection !== null) {
        dispatch(unsetActiveCollection());
      }
    }
  };
};
