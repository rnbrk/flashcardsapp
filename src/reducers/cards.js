const initialState = [
  { id: '1', dateAdded: 1556024308, front: 'Hij doet het!', back: 'It is working!' },
  { id: '2', dateAdded: 1556002708, front: 'Joepie!', back: 'Yeah!' }
];

const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CARD':
      return [...state, action.card];
    default:
      return state;
  }
};

export default cardsReducer;
