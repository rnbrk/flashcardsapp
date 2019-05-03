import { startSetCards } from './cards';
import { getCardsToStudy } from './collections';

export const setActiveCollection = collectionId => ({
  type: 'SET_ACTIVE_COLLECTION',
  collectionId
});

export const updateCardsToActiveCollecton = collectionId => {
  return (dispatch, getState) => {
    const activeCollection = getState().activeCollection;

    if (collectionId && activeCollection !== collectionId) {
      dispatch(setActiveCollection(collectionId));
      dispatch(startSetCards(collectionId));
      dispatch(getCardsToStudy(collectionId));
    }
  };
};
