import { getIdsOfCardsToStudy } from '../selectors/study';

const initialState = {
  collection1: {
    id: 'collection1',
    dailyStudyLimit: 20,
    cardsToStudyToday: [],
    indexOfCurrentCard: 0,
    name: 'Spanish words',
    visibilityfilter: 'SHOW_ALL'
  },

  collection2: {
    id: 'collection2',
    dailyStudyLimit: 20,
    cardsToStudyToday: [],
    indexOfCurrentCard: 0,
    name: 'US presidents',
    visibilityfilter: 'SHOW_ALL'
  },

  collection3: {
    id: 'collection3',
    dailyStudyLimit: 20,
    cardsToStudyToday: [],
    indexOfCurrentCard: 0,
    name: 'JavaScript questions',
    visibilityfilter: 'SHOW_ALL'
  }
};

const collectionsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_COLLECTION':
      return {
        ...state,
        [action.collectionId]: {
          ...action.collection,
          id: action.collectionId
        }
      };

    case 'SET_COLLECTIONS':
      return { ...action.collections };

    case 'GET_CARDS_TO_STUDY':
      return {
        ...state,
        [action.collectionId]: {
          ...state[action.collectionId],
          cardsToStudyToday: getIdsOfCardsToStudy(
            action.cards,
            state[action.collectionId].cardsToStudyPerDay
          )
        }
      };
    case 'REPEAT_CARD':
      return {
        ...state,
        [action.collectionId]: {
          ...state[action.collectionId],
          cardsToStudyToday: state[action.collectionId].cardsToStudyToday.concat([action.cardId])
        }
      };
    case 'INCREMENT_CARDS_STUDIED':
      return {
        ...state,
        [action.collectionId]: {
          ...state[action.collectionId],
          indexOfCurrentCard: state[action.collectionId].indexOfCurrentCard + 1
        }
      };
    case 'SET_DAILY_STUDY_LIMIT':
      return {
        ...state,
        [action.collectionId]: {
          ...state[action.collectionId],
          dailyStudyLimit: action.dailyStudyLimit
        }
      };
    default:
      return state;
  }
};

export default collectionsReducer;
