import './App.css';
import japaneseRestaurant from './japaneseRestaurant.png';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import { Header } from './components/Header';
import { NavBar } from './components/NavBar';
import { TypeForm } from './components/typeForm';
import { PeopleForm } from './components/peopleForm';
import { DateForm } from './components/dateForm';
import { TimeForm } from './components/timeForm';
import { Confirmation } from './components/confirmation';


function App() {
  const [selectedType, setSelectedType] = useState('');
  const [peopleAmount, setPeopleAmount] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const availableTypes = [
    'Breakfast',
    'Lunch',
    'Dinner'
  ]


  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };
  
    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  return (
    <Router>
      <Header RestaurantName="Sakanaya" />
      <main style={{display: 'flex', width: '100%', height: '100%'}}>
        <div className='restaurantImage' style={{ padding: '50px 0px 50px 80px'}}>
          <img src={japaneseRestaurant} width={450} height={600} alt='Restaurant' />
        </div>
        <div className='bookingForm' style={{width: '100%', textAlign: 'center'}}>
          <NavBar 
            selectedType={selectedType}
            peopleAmount={peopleAmount}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
          />
          <Routes>
            <Route path='/book' element={<TypeForm AvailableTypes={availableTypes} setSelectedType={setSelectedType} />} />
            <Route path='/people' element={<PeopleForm peopleAmount={peopleAmount} setPeopleAmount={setPeopleAmount} />} />
            <Route path='/date' element={<DateForm selectedDate={selectedDate} setSelectedDate={setSelectedDate} />} />
            <Route path='/time' element={<TimeForm openingTime={11} closingTime={20} selectedTime={selectedTime} setSelectedTime={setSelectedTime} />} />
            <Route path='/confirm' element={<Confirmation 
              selectedType={selectedType}   
              selectedTime={selectedTime} 
              peopleAmount={peopleAmount}
              selectedDate={selectedDate}
              />}
            />
          </Routes>
        </div>
      </main>
    </Router>
  );
}

export default App;
