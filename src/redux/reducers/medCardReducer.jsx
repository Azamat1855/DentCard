import { SAVE_MED_CARD, UPDATE_MED_CARD } from '../actions/medCardActions';

const initialState = {
  medCards: [],
};

const medCardReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_MED_CARD:
      return {
        ...state,
        medCards: [...state.medCards, action.payload],
      };
    case UPDATE_MED_CARD:
      const updatedMedCards = state.medCards.map((medCard, index) =>
        index === action.payload.index
          ? { ...medCard, ...action.payload.updatedData }
          : medCard
      );
      return {
        ...state,
        medCards: updatedMedCards,
      };
    default:
      return state;
  }
};

export default medCardReducer;
