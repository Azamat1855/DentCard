import React from 'react';

const MedCardDropdown = ({ medCards, onSelect }) => {
  return (
    <div className="dropdown dropdown-bottom ">
      <div tabIndex={0} role="button" className="btn m-1 bg-base-300 shadow-sm shadow-slate-400">Med Cards</div>
      <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
        {medCards.length === 0 ? (
          <li className="text-center text-gray-500 py-2">No medical cards yet</li>
        ) : (
          medCards.map((card, index) => (
            <li key={index}>
              <a onClick={() => onSelect(index)}>
                {card.name} {card.surname}
              </a>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default MedCardDropdown;
