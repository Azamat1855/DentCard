import React from 'react';
import MedCardDropdown from './MedCardDropdown';
import { AiFillMedicineBox } from 'react-icons/ai';

const Navbar = ({ medCards, onSelect }) => {
  return (
    <div className="w-full bg-gray-100 py-[0] shadow-md shadow-slate-300">
      <div className="w-[80%] mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <AiFillMedicineBox className="text-[70px] text-red-500" />
          <h1 className="font-bold text-2xl ml-2">Medical Cards</h1>
        </div>
        <MedCardDropdown medCards={medCards} onSelect={onSelect} />
      </div>
    </div>
  );
};

export default Navbar;
