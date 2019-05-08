import moment from 'moment';

export const filterCardsCollectionId = (cards, collectionId) =>
  cards.filter(card => card.collectionId === collectionId);

export const filterCardsDue = cards =>
  cards
    .filter(card => moment(card.dateNextStudy).isSameOrBefore(moment(), 'day'))
    .sort((a, b) => {
      if (typeof a.dateLastStudied === 'undefined') {
        return -1;
      }
      if (typeof b.dateLastStudied === 'undefined') {
        return 1;
      }
      return a.dateLastStudied - b.dateLastStudied;
    });

export const filterCardsNotDueToday = (cards, collectionId) =>
  cards.filter(
    card =>
      card.collectionId !== collectionId ||
      !moment(card.dateNextStudy).isSameOrBefore(moment(), 'day')
  );

export const getCardFromId = (cards, cardId) => cards.find(card => card.id === cardId);

export const getNumOfCardsRepeated = cards =>
  cards.reduce(
    (acc, card) =>
      card.dateLastStudied !== undefined &&
      moment(card.dateLastStudied).isSame(moment(), 'day') &&
      moment(card.dateNextStudy).isSame(moment(), 'day')
        ? acc + 1
        : acc,
    0
  );

export const getNumOfCardsStudied = cards =>
  cards.reduce(
    (acc, card) =>
      card.dateLastStudied !== undefined && moment(card.dateLastStudied).isSame(moment(), 'day')
        ? acc + 1
        : acc,
    0
  );
