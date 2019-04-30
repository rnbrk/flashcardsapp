import { getIdsOfCardsToStudy } from '../selectors/study';

const initialState = {
  collection1: {
    id: 'collection1',
    dailyStudyLimit: 20,
    cardsToStudyToday: [],
    indexOfCurrentCard: 0,
    name: 'Spanish words',
    visibilityfilter: 'SHOW_ALL'
  }
};

const collectionsReducer = (state = initialState, action) => {
  switch (action.type) {
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
    case 'CHANGE_DAILY_STUDY_LIMIT':
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
