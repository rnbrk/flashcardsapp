import moment from 'moment';

const endOfToday = moment().endOf('day');
const rangeRandomInt = (startRange, endRange) =>
  Math.floor(startRange + Math.random() * (endRange - startRange));

const getCardsForStudy = (cards, dailyLimit) =>
  cards
    .filter(card => card.dateNextStudy === null || moment(card.dateNextStudy).isBefore(endOfToday))
    .slice(0, dailyLimit)
    .sort(() => rangeRandomInt(-1, 2));

export { getCardsForStudy };
