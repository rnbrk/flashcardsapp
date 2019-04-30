export const getCardsToStudy = collectionId => ({
  type: 'GET_CARDS_TO_STUDY',
  collectionId
});

export const repeatCard = (cardId, collectionId) => ({
  type: 'REPEAT_CARD',
  collectionId,
  cardId
});

export const incrementCardsStudied = collectionId => ({
  type: 'INCREMENT_CARDS_STUDIED',
  collectionId
});

export const changeDailyStudyLimit = collectionId => ({
  type: 'CHANGE_DAILY_STUDY_LIMIT',
  collectionId
});
