import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateMedCard } from '../redux/actions/medCardActions';

const MedCardModal = ({ medCardIndex, onClose }) => {
  const medCard = useSelector((state) =>
    medCardIndex !== null ? state.medCard.medCards[medCardIndex] : null
  );
  const dispatch = useDispatch();

  const handleUpdate = (updatedData) => {
    dispatch(updateMedCard(medCardIndex, updatedData));
  };

  if (!medCard) return null;

  return (
    <dialog id="my_modal_3" className="modal" open>
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
        </form>
        <h3 className="font-bold text-lg">{medCard.name} {medCard.surname}</h3>
        <p className="py-4"><strong>Age:</strong> {medCard.age}</p>
        <p><strong>Phone Number:</strong> {medCard.number}</p>
        {/* <p><strong>Email:</strong> {medCard.email}</p>
        <p><strong>Blood Group:</strong> {medCard.bloodGroup}</p>
        <p><strong>Address:</strong> {medCard.address}</p>   */}
      </div>
    </dialog>
  );
};

export default MedCardModal;
