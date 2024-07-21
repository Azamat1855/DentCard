import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MedCardForm from './components/MedCardForm';
import MedCardModal from './components/MedCardModal';
import { saveMedCard } from './redux/actions/medCardActions';
import Navbar from './components/Navbar';

const App = () => {
  const TOKEN = '7243832827:AAHvYkYDFj6mtO7qg5ORLjdxHwPA9c3CWeE';
  const CHAT_ID = '797379797';

  const [selectedMedCardIndex, setSelectedMedCardIndex] = useState(null);
  const medCards = useSelector((state) => state.medCard.medCards);
  const dispatch = useDispatch();

  const handleFormSubmit = async (formData) => {
    dispatch(saveMedCard(formData));
    
    // Send the form data to the Telegram bot
    const message = `
      New Med Card Submission:
      Name: ${formData.name}
      Surname: ${formData.surname}
      Age: ${formData.age}
      Phone Number: ${formData.number}

    `;
    
    const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message
      })
    });

    if (!response.ok) {
      console.error('Failed to send message to Telegram bot');
    }
  };

  const handleSelectMedCard = (index) => {
    setSelectedMedCardIndex(index);
    document.getElementById('my_modal_3').showModal();
  };

  const handleCloseModal = () => {
    setSelectedMedCardIndex(null);
    document.getElementById('my_modal_3').close();
  };

  return (
    <div className="">
      <Navbar medCards={medCards} onSelect={handleSelectMedCard} />
      <div className="App flex items-start justify-start flex-col py-[10px] w-full max-w-[80%] mx-auto">
        <MedCardForm onSubmit={handleFormSubmit} />
        {selectedMedCardIndex !== null && (
          <MedCardModal medCardIndex={selectedMedCardIndex} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
};

export default App;
