import uuid from 'uuid';
import moment from 'moment';

const randomInt = () => Math.floor(Math.random() * 10);

const updateStudyProgress = (oldCard, grade) => {
  const card = { ...oldCard };

  // Update interval and times card has repeated
  if (grade >= 3) {
    card.timesRepeated += 1;

    if (card.timesRepeated === 0) {
      card.intervalInDays = 1;
    } else if (card.timesRepeated === 1) {
      card.intervalInDays = 6;
    } else {
      card.intervalInDays = Math.round(card.intervalInDays * card.easinessFactor);
    }
  } else {
    card.timesRepeated = 0;
    card.intervalInDays = 1;
  }

  // Update dates
  card.dateLastStudied = moment();
  card.dateNextStudy = moment().add(card.intervalInDays, 'days');

  // Update card difficulty
  const newEasinessFactor = card.easinessFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
  card.easinessFactor = newEasinessFactor < 1.3 ? 1.3 : newEasinessFactor;

  return card;
};

// const updateEasinessFactor = (easinessFactor, grade) =>
//   easinessFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));

// const updateStudyProgress = (oldCard, grade) => {
//   const card = { ...oldCard };

//   if (grade >= 3) {
//     if (card.timesRepeated === 0) {
//       card.intervalInDays = 1;
//     } else if (card.timesRepeated === 1) {
//       card.intervalInDays = 6;
//     } else {
//       card.intervalInDays = Math.round(card.intervalInDays * card.easinessFactor);
//     }
//   }
//   card.timesRepeated += 1;

//   const newEasinessFactor = updateEasinessFactor(card.easinessFactor, grade);
//   card.easinessFactor = newEasinessFactor < 1.3 ? 1.3 : newEasinessFactor;

//   return card;
// };

// const cardWithData = {
//   id: uuid(),
//   dateAdded: moment().utc(),
//   dateModified: moment().utc(),
//   dateLastStudied: undefined,
//   dateNextStudy: undefined,
//   easinessFactor: 2.5,
//   intervalInDays: 0,
//   timesRepeated: 0,
//   textBack: 'Congratulations!',
//   textFront: '¡Felicidades!'
// };

const initialState = [
  {
    id: uuid(),
    dateAdded: moment()
      .utc()
      .add(randomInt(), 'hours')
      .add(randomInt(), 'days')
      .valueOf(),
    dateModified: moment()
      .utc()
      .add(randomInt(), 'hours')
      .add(randomInt(), 'days')
      .valueOf(),
    dateLastStudied: undefined,
    dateNextStudy: undefined,
    easinessFactor: 2.5,
    intervalInDays: 0,
    timesRepeated: 0,
    textBack: '¡Felicidades!',
    textFront: 'Congratulations!'
  },

  {
    id: uuid(),
    dateAdded: moment()
      .utc()
      .add(randomInt(), 'hours')
      .add(randomInt(), 'days')
      .valueOf(),
    dateModified: moment()
      .utc()
      .add(randomInt(), 'hours')
      .add(randomInt(), 'days')
      .valueOf(),
    dateLastStudied: undefined,
    dateNextStudy: undefined,
    easinessFactor: 2.5,
    intervalInDays: 0,
    timesRepeated: 0,
    textBack: 'Estudia.',
    textFront: 'Study.'
  },

  {
    id: uuid(),
    dateAdded: moment()
      .utc()
      .add(randomInt(), 'hours')
      .add(randomInt(), 'days')
      .valueOf(),
    dateModified: moment()
      .utc()
      .add(randomInt(), 'hours')
      .add(randomInt(), 'days')
      .valueOf(),
    dateLastStudied: undefined,
    dateNextStudy: undefined,
    easinessFactor: 2.5,
    intervalInDays: 0,
    timesRepeated: 0,
    textBack: 'Bienvenida.',
    textFront: 'Welcome.'
  },

  {
    id: uuid(),
    dateAdded: moment()
      .utc()
      .add(randomInt(), 'hours')
      .add(randomInt(), 'days')
      .valueOf(),
    dateModified: moment()
      .utc()
      .add(randomInt(), 'hours')
      .add(randomInt(), 'days')
      .valueOf(),
    dateLastStudied: undefined,
    dateNextStudy: undefined,
    easinessFactor: 2.5,
    intervalInDays: 0,
    timesRepeated: 0,
    textBack: 'Llueve.',
    textFront: 'It is raining.'
  },

  {
    id: uuid(),
    dateAdded: moment()
      .utc()
      .add(randomInt(), 'hours')
      .add(randomInt(), 'days')
      .valueOf(),
    dateModified: moment()
      .utc()
      .add(randomInt(), 'hours')
      .add(randomInt(), 'days')
      .valueOf(),
    dateLastStudied: undefined,
    dateNextStudy: undefined,
    easinessFactor: 2.5,
    intervalInDays: 0,
    timesRepeated: 0,
    textBack: 'Sígueme.',
    textFront: 'Follow me.'
  },

  {
    id: uuid(),
    dateAdded: moment()
      .utc()
      .add(randomInt(), 'hours')
      .add(randomInt(), 'days')
      .valueOf(),
    dateModified: moment()
      .utc()
      .add(randomInt(), 'hours')
      .add(randomInt(), 'days')
      .valueOf(),
    dateLastStudied: undefined,
    dateNextStudy: undefined,
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
