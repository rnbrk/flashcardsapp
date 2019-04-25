import uuid from 'uuid';
import moment from 'moment';

const randomInt = () => Math.floor(Math.random() * 10);
console.log(randomInt());

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

    default:
      return state;
  }
};

export default cardsReducer;
