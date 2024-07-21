import React, { useState } from 'react';
import { format, eachDayOfInterval, startOfMonth, endOfMonth, isSameDay, isBefore, startOfWeek } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import MedCardForm from './components/MedCardForm';
import MedCardModal from './components/MedCardModal';
import { saveMedCard } from './redux/actions/medCardActions';
import Navbar from './components/Navbar';

const Calendar = ({ selectedDate, onSelectDate, bookedTimes }) => {
  const currentMonth = new Date();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startOfMonthDate = startOfMonth(currentMonth);
  const endOfMonthDate = endOfMonth(currentMonth);
  const startOfWeekDate = startOfWeek(startOfMonthDate, { weekStartsOn: 1 });

  const daysInMonth = eachDayOfInterval({
    start: startOfWeekDate,
    end: endOfMonthDate,
  });

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const isDayFullyBooked = (day) => {
    const dateStr = format(day, 'yyyy-MM-dd');
    return bookedTimes[dateStr] && bookedTimes[dateStr].length === 14;
  };

  return (
    <div className="bg-white p-4 shadow-lg rounded-lg w-full">
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-semibold">{format(currentMonth, 'MMMM yyyy')}</span>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center font-semibold bg-gray-200 p-2 rounded-lg">
            {day}
          </div>
        ))}
        {daysInMonth.map((day) => (
          <button
            key={day}
            onClick={() => !isBefore(day, today) && !isDayFullyBooked(day) && onSelectDate(day)}
            className={`p-2 rounded-lg ${
              isSameDay(day, selectedDate)
                ? 'bg-blue-500 text-white'
                : isBefore(day, today) || isDayFullyBooked(day)
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-100 hover:bg-gray-200'
            } focus:outline-none`}
            disabled={isBefore(day, today) || isDayFullyBooked(day)}
          >
            {format(day, 'd')}
          </button>
        ))}
      </div>
    </div>
  );
};

const TimeSelector = ({ selectedTime, onSelectTime, bookedTimes, selectedDate }) => {
  const times = Array.from({ length: 14 }, (_, i) => `${i + 8}:00`);

  const isTimeBooked = (time) => {
    if (!selectedDate) return false;
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    return bookedTimes[dateStr] && bookedTimes[dateStr].includes(time);
  };

  return (
    <div className="bg-white p-4 shadow-lg rounded-lg mt-4 w-full">
      {times.map((time) => (
        <button
          key={time}
          onClick={() => !isTimeBooked(time) && onSelectTime(time)}
          className={`p-2 m-1 rounded-lg ${
            selectedTime === time ? 'bg-blue-500 text-white' : isTimeBooked(time) ? 'bg-gray-400 text-white' : 'bg-gray-100 hover:bg-gray-200'
          } focus:outline-none`}
          disabled={isTimeBooked(time)}
        >
          {time}
        </button>
      ))}
    </div>
  );
};

const App = () => {
  const TOKEN = '7243832827:AAHvYkYDFj6mtO7qg5ORLjdxHwPA9c3CWeE';
  const CHAT_ID = '797379797';

  const [selectedMedCardIndex, setSelectedMedCardIndex] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookedTimes, setBookedTimes] = useState({});
  const [showTimeSelector, setShowTimeSelector] = useState(false);

  const medCards = useSelector((state) => state.medCard.medCards);
  const dispatch = useDispatch();

  const handleFormSubmit = async (formData) => {
    dispatch(saveMedCard(formData));

    const message = `
      New Med Card Submission:
      Name: ${formData.name}
      Surname: ${formData.surname}
      Age: ${formData.age}
      Phone Number: ${formData.number}
      Date: ${selectedDate ? format(selectedDate, 'yyyy-MM-dd') : 'Not selected'}
      Time: ${selectedTime || 'Not selected'}
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

    if (selectedDate && selectedTime) {
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      setBookedTimes((prev) => ({
        ...prev,
        [dateStr]: prev[dateStr] ? [...prev[dateStr], selectedTime] : [selectedTime]
      }));
    }
  };

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setShowTimeSelector(true);
  };

  const handleSelectTime = (time) => {
    setSelectedTime(time);
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
    <div>
      <Navbar medCards={medCards} onSelect={handleSelectMedCard} />
      <div className="flex flex-col items-start justify-start py-4 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <MedCardForm onSubmit={handleFormSubmit} />
        {selectedMedCardIndex !== null && (
          <MedCardModal medCardIndex={selectedMedCardIndex} onClose={handleCloseModal} />
        )}
        <Calendar selectedDate={selectedDate} onSelectDate={handleSelectDate} bookedTimes={bookedTimes} />
        {showTimeSelector && (
          <TimeSelector selectedTime={selectedTime} onSelectTime={handleSelectTime} bookedTimes={bookedTimes} selectedDate={selectedDate} />
        )}
      </div>
    </div>
  );
};

export default App;
