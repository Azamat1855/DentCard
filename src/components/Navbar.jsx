import React from 'react';
import MedCardDropdown from './MedCardDropdown';
import { AiFillMedicineBox } from 'react-icons/ai';

const Navbar = ({ medCards, onSelect }) => {
  return (
    <div className="w-full bg-gray-100 py-4 shadow-md shadow-slate-300">
      <div className="w-[80%] mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center">
          <AiFillMedicineBox className="text-[50px] md:text-[70px] text-red-500" />
          <h1 className="font-bold text-xl md:text-2xl ml-2">Medical Cards</h1>
        </div>
        <div className="mt-4 md:mt-0">
          <MedCardDropdown medCards={medCards} onSelect={onSelect} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
