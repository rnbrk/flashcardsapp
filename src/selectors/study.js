import moment from 'moment';

const endOfToday = moment().endOf('day');
const rangeRandomInt = (startRange, endRange) =>
  Math.floor(startRange + Math.random() * (endRange - startRange));

const getIdsOfCardsToStudy = (cards, collectionId) =>
  cards
    .filter(
      card =>
        (card.dateNextStudy === null || moment(card.dateNextStudy).isBefore(endOfToday)) &&
        card.collectionId === collectionId
    )
    .map(card => card.id)
    .sort(() => rangeRandomInt(-1, 2));

const getCardsFromCollectionId = (cards, collectionId) =>
  cards.filter(card => card.collectionId === collectionId);

export { getIdsOfCardsToStudy, getCardsFromCollectionId };
