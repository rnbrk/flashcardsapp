import moment from 'moment';

const endOfToday = moment().endOf('day');
const rangeRandomInt = (startRange, endRange) =>
  Math.floor(startRange + Math.random() * (endRange - startRange));

const getIdsOfCardsToStudy = (cards, dailyLimit) =>
  cards
    .filter(card => card.dateNextStudy === null || moment(card.dateNextStudy).isBefore(endOfToday))
    .map(card => card.id)
    .slice(0, dailyLimit)
    .sort(() => rangeRandomInt(-1, 2));

const getCardsFromCollectionId = (cards, collectionId) =>
  cards.filter(card => card.collectionId === collectionId);

export { getIdsOfCardsToStudy, getCardsFromCollectionId };
