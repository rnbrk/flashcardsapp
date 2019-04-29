import uuid from 'uuid';
import moment from 'moment';

const randomInt = () => Math.floor(Math.random() * 10);

const rangeRandomInt = (startRange, endRange) =>
  Math.floor(startRange + Math.random() * (endRange - startRange));

const updateStudyProgress = (oldCard, grade) => {
  const card = { ...oldCard };

  // Update interval and times card has repeated
  if (grade >= 3) {
    card.timesRepeated += 1;

    if (card.timesRepeated === 0) {
      card.intervalInDays = 1;
    } else if (card.timesRepeated === 1) {
      card.intervalInDays = 6 + rangeRandomInt(-1, 2);
    } else {
      card.intervalInDays =
        Math.round(card.intervalInDays * card.easinessFactor) + rangeRandomInt(-2, 3);
    }
  } else {
    card.timesRepeated = 0;
    card.intervalInDays = 1;
  }

  // Update dates
  card.dateLastStudied = moment().startOf('day');
  card.dateNextStudy = moment()
    .startOf('day')
    .add(card.intervalInDays, 'days');

  // Update card difficulty
  const newEasinessFactor = card.easinessFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
  card.easinessFactor = newEasinessFactor < 1.3 ? 1.3 : newEasinessFactor;

  return card;
};

const initialState = [
  {
    id: uuid(),
    collectionId: 'collection1',
    collectionName: 'Spanish words',
    dateAdded: moment()
      .startOf('day')
      .add(randomInt(), 'hours')
      .add(randomInt(), 'days')
      .valueOf(),
    dateModified: moment()
      .startOf('day')
      .add(randomInt(), 'hours')
      .add(randomInt(), 'days')
      .valueOf(),
    dateLastStudied: null,
    dateNextStudy: null,
    easinessFactor: 2.5,
    intervalInDays: 0,
    timesRepeated: 0,
    textBack: '¡Felicidades!',
    textFront: 'Congratulations!'
  },

  {
    id: uuid(),
    collectionId: 'collection1',
    collectionName: 'Spanish words',
    dateAdded: moment()
      .startOf('day')
      .add(randomInt(), 'hours')
      .add(randomInt(), 'days')
      .valueOf(),
    dateModified: moment()
      .startOf('day')
      .add(randomInt(), 'hours')
      .add(randomInt(), 'days')
      .valueOf(),
    dateLastStudied: null,
    dateNextStudy: null,
    easinessFactor: 2.5,
    intervalInDays: 0,
    timesRepeated: 0,
    textBack: 'Estudia.',
    textFront: 'Study.'
  },

  {
    id: uuid(),
    collectionId: 'collection1',
    collectionName: 'Spanish words',
    dateAdded: moment()
      .startOf('day')
      .add(randomInt(), 'hours')
      .add(randomInt(), 'days')
      .valueOf(),
    dateModified: moment()
      .startOf('day')
      .add(randomInt(), 'hours')
      .add(randomInt(), 'days')
      .valueOf(),
    dateLastStudied: null,
    dateNextStudy: null,
    easinessFactor: 2.5,
    intervalInDays: 0,
    timesRepeated: 0,
    textBack: 'Bienvenida.',
    textFront: 'Welcome.'
  },

  {
    id: uuid(),
    collectionId: 'collection1',
    collectionName: 'Spanish words',
    dateAdded: moment()
      .startOf('day')
      .add(randomInt(), 'hours')
      .add(randomInt(), 'days')
      .valueOf(),
    dateModified: moment()
      .startOf('day')
      .add(randomInt(), 'hours')
      .add(randomInt(), 'days')
      .valueOf(),
    dateLastStudied: null,
    dateNextStudy: null,
    easinessFactor: 2.5,
    intervalInDays: 0,
    timesRepeated: 0,
    textBack: 'Llueve.',
    textFront: 'It is raining.'
  },

  {
    id: uuid(),
    collectionId: 'collection1',
    collectionName: 'Spanish words',
    dateAdded: moment()
      .startOf('day')
      .add(randomInt(), 'hours')
      .add(randomInt(), 'days')
      .valueOf(),
    dateModified: moment()
      .startOf('day')
      .add(randomInt(), 'hours')
      .add(randomInt(), 'days')
      .valueOf(),
    dateLastStudied: null,
    dateNextStudy: null,
    easinessFactor: 2.5,
    intervalInDays: 0,
    timesRepeated: 0,
    textBack: 'Sígueme.',
    textFront: 'Follow me.'
  },

  {
    id: uuid(),
    collectionId: 'collection1',
    collectionName: 'Spanish words',
    dateAdded: moment()
      .startOf('day')
      .add(randomInt(), 'hours')
      .add(randomInt(), 'days')
      .valueOf(),
    dateModified: moment()
      .startOf('day')
      .add(randomInt(), 'hours')
      .add(randomInt(), 'days')
      .valueOf(),
    dateLastStudied: null,
    dateNextStudy: null,
    easinessFactor: 2.5,
    intervalInDays: 0,
    timesRepeated: 0,
    textBack: 'Disculpe.',
    textFront: 'Sorry.'
  }
];

const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CARD':
      return [...state, action.card];

    case 'EDIT_CARD':
      return state.map(card =>
        card.id === action.id
          ? {
              ...card,
              ...action.updates
            }
          : card
      );

    case 'REMOVE_CARD':
      return state.filter(card => card.id !== action.id);

    case 'ANSWER_CARD':
      return state.map(card =>
        card.id === action.id
          ? {
              ...updateStudyProgress(card, action.grade)
            }
          : card
      );

    default:
      return state;
  }
};

export default cardsReducer;
