import React, { useState } from 'react';

const MedCardForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    age: '',
    number: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'number') {
      const formattedValue = formatPhoneNumber(value);
      setFormData({ ...formData, [name]: formattedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const formatPhoneNumber = (value) => {
    // Remove all non-numeric characters
    const cleaned = value.replace(/\D/g, '');

    let formatted = '+';

    if (cleaned.length > 0) {
      formatted += cleaned.slice(0, 3);
    }
    if (cleaned.length > 3) {
      formatted += `(${cleaned.slice(3, 5)})`;
    }
    if (cleaned.length > 5) {
      formatted += `${cleaned.slice(5, 8)}`;
    }
    if (cleaned.length > 8) {
      formatted += `-${cleaned.slice(8, 10)}`;
    }
    if (cleaned.length > 10) {
      formatted += `-${cleaned.slice(10, 12)}`;
    }

    return formatted;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: '',
      surname: '',
      age: '',
      number: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-5 flex flex-col items-center border rounded-xl p-4'>
      <div className='flex flex-col'>
        <label>Name:</label>
        <input className='input w-[300px] shadow-md shadow-slate-400' placeholder='Enter your name' type="text" name="name" required value={formData.name} onChange={handleChange} />
      </div>
      <div className='flex flex-col'>
        <label>Surname:</label>
        <input className='input w-[300px] shadow-md shadow-slate-400' placeholder='Enter your surname' type="text" name="surname" value={formData.surname} onChange={handleChange} />
      </div>
      <div className='flex flex-col'>
        <label>Age:</label>
        <input className='input w-[300px] shadow-md shadow-slate-400' placeholder='Enter your age' type="text" name="age" value={formData.age} onChange={handleChange} />
      </div>
      <div className='flex flex-col'>
        <label>Phone Number:</label>
        <input className='input w-[300px] shadow-md shadow-slate-400' placeholder='+___(__)___-__-__' type="text" name="number" value={formData.number} onChange={handleChange} />
      </div>
      <button type="submit" className='btn btn-primary text-white btn-error px-[50px]'>Submit</button>
    </form>
  );
};

export default MedCardForm;
