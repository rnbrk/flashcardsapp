import { getIdsOfCardsToStudy } from '../selectors/study';

const initialState = {
  id: 'collection1',
  dailyStudyLimit: 20,
  cardsToStudyToday: [],
  indexOfCurrentCard: 0,
  name: 'Spanish words',
  visibilityfilter: 'SHOW_ALL'
};

const collectionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CARDS_TO_STUDY':
      return {
        ...state,
        cardsToStudyToday: getIdsOfCardsToStudy(action.cards, state.cardsToStudyPerDay)
      };
    case 'REPEAT_CARD':
      return {
        ...state,
        cardsToStudyToday: state.cardsToStudyToday.concat([action.cardId])
      };
    case 'INCREMENT_CARDS_STUDIED':
      return {
        ...state,
        indexOfCurrentCard: state.indexOfCurrentCard + 1
      };
    case 'CHANGE_DAILY_STUDY_LIMIT':
      return {
        ...state,
        dailyStudyLimit: action.dailyStudyLimit
      };
    default:
      return state;
  }
};

export default collectionsReducer;
