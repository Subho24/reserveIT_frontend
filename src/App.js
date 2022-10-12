import './App.css';
import japaneseRestaurant from './japaneseRestaurant.png';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Header } from './components/Header';
import { NavBar } from './components/NavBar';
import { TypeForm } from './components/typeForm';
import { PeopleForm } from './components/peopleForm';
import { DateForm } from './components/dateForm';
import { TimeForm } from './components/timeForm';


function App() {
  const [selectedType, setSelectedType] = useState('');
  const [peopleAmount, setPeopleAmount] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null)
  const availableTypes = [
    'Breakfast',
    'Lunch',
    'Dinner'
  ]

  return (
    <Router>
      <Header RestaurantName="Sakanaya" />
      <main style={{display: 'flex', width: '100%', height: '100%'}}>
        <div className='restaurantImage' style={{width:'40%', height: '100%', padding: '20px 0px 20px 20px'}}>
          <img src={japaneseRestaurant} width={500} height={600} />
        </div>
        <div className='bookingForm' style={{width: '100%'}}>
          <NavBar 
            selectedType={selectedType}
            peopleAmount={peopleAmount}
            selectedDate={selectedDate}
          />
          <Routes>
            <Route path='/book' element={<TypeForm AvailableTypes={availableTypes} setSelectedType={setSelectedType} />} />
            <Route path='/people' element={<PeopleForm peopleAmount={peopleAmount} setPeopleAmount={setPeopleAmount} />} />
            <Route path='/date' element={<DateForm selectedDate={selectedDate} setSelectedDate={setSelectedDate} />} />
            <Route path='/time' element={<TimeForm openingTime={11} closingTime={20} />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
}

export default App;
