import moment from 'moment';

const filterCardsCollectionId = (cards, collectionId) =>
  cards.filter(card => card.collectionId === collectionId);

const filterCardsDueToday = (cards, collectionId) =>
  cards
    .filter(
      card =>
        card.collectionId === collectionId &&
        moment(card.dateNextStudy).isSameOrBefore(moment(), 'day')
    )
    .sort((a, b) => {
      if (typeof a.dateLastStudied === 'undefined') {
        return -1;
      }
      if (typeof b.dateLastStudied === 'undefined') {
        return 1;
      }
      return a.dateLastStudied - b.dateLastStudied;
    });

const filterCardsNotDueToday = (cards, collectionId) =>
  cards.filter(
    card =>
      card.collectionId !== collectionId ||
      !moment(card.dateNextStudy).isSameOrBefore(moment(), 'day')
  );

const filterCardsRepeatedToday = (cards, collectionId) =>
  cards.filter(
    card =>
      card.collectionId === collectionId &&
      card.dateLastStudied !== undefined &&
      moment(card.dateLastStudied).isSame(moment(), 'day') &&
      moment(card.dateNextStudy).isSame(moment(), 'day')
  );

const filterCardsStudiedToday = (cards, collectionId) =>
  cards.filter(
    card =>
      card.collectionId === collectionId &&
      card.dateLastStudied !== undefined &&
      moment(card.dateLastStudied).isSame(moment(), 'day')
  );

export {
  filterCardsCollectionId,
  filterCardsDueToday,
  filterCardsNotDueToday,
  filterCardsRepeatedToday,
  filterCardsStudiedToday
};
