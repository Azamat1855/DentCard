export const SAVE_MED_CARD = 'SAVE_MED_CARD';
export const UPDATE_MED_CARD = 'UPDATE_MED_CARD';

export const saveMedCard = (medCard) => ({
  type: SAVE_MED_CARD,
  payload: medCard,
});

export const updateMedCard = (index, updatedData) => ({
  type: UPDATE_MED_CARD,
  payload: { index, updatedData },
});
