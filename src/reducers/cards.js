import uuid from 'uuid';
import moment from 'moment';

const randomInt = () => Math.floor(Math.random() * 10);
console.log(randomInt());

const cardWithData = {
  id: uuid(),
  dateAdded: moment(),
  dateModified: moment(),
  dateLastStudied: moment(),
  easinessFactor: 2.5,
  intervalInDays: 5,
  timesRepeated: 1,
  textBack: 'Congratulations!',
  textFront: '¡Felicidades!'
};

const updateEasinessFactor = (easinessFactor, grade) =>
  easinessFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));

const updateStudyProgress = (oldCard, grade) => {
  const card = { ...oldCard };
  if (grade >= 3) {
    if (card.timesRepeated === 0) {
      card.intervalInDays = 1;
    } else if (card.timesRepeated === 1) {
      card.intervalInDays = 6;
    } else {
      card.intervalInDays = Math.round(card.intervalInDays * card.easinessFactor);
    }
  }
  card.timesRepeated += 1;

  const newEasinessFactor = updateEasinessFactor(card.easinessFactor, grade);
  card.easinessFactor = newEasinessFactor < 1.3 ? 1.3 : newEasinessFactor;

  return card;
};

const initialState = [
  {
    id: uuid(),
    dateAdded: moment()
      .add(randomInt(), 'hours')
      .add(randomInt(), 'days')
      .valueOf(),

    front: '¡Felicidades!',
    back: 'Congratulations!'
  },

  {
    id: uuid(),
    dateAdded: moment()
      .add(randomInt(), 'hours')
      .add(randomInt(), 'days')
      .valueOf(),

    front: 'Estudia.',
    back: 'Study.'
  },

  {
    id: uuid(),
    dateAdded: moment()
      .add(randomInt(), 'hours')
      .add(randomInt(), 'days')
      .valueOf(),

    front: 'Bienvenida.',
    back: 'Welcome.'
  },

  {
    id: uuid(),
    dateAdded: moment()
      .add(randomInt(), 'hours')
      .add(randomInt(), 'days')
      .valueOf(),

    front: 'Llueve.',
    back: 'It is raining.'
  },

  {
    id: uuid(),
    dateAdded: moment()
      .add(randomInt(), 'hours')
      .add(randomInt(), 'days')
      .valueOf(),

    front: 'Sígueme.',
    back: 'Follow me.'
  },

  {
    id: uuid(),
    dateAdded: moment()
      .add(randomInt(), 'hours')
      .add(randomInt(), 'days')
      .valueOf(),

    front: 'Disculpe.',
    back: 'Sorry.'
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
