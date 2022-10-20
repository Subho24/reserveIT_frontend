import './App.css';
import japaneseRestaurant from './japaneseRestaurant.png';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Header } from './components/Header';
import { NavBar } from './components/NavBar';
import { TypeForm } from './components/typeForm';
import { PeopleForm } from './components/peopleForm';
import { DateForm } from './components/dateForm';
import { TimeForm } from './components/timeForm';
import { Confirmation } from './components/confirmation';
import { Footer } from './components/Footer'
import { Loading } from './components/Loading';


function App() {
  const [stepCount, setStepCount] = useState(1)
  const [availableTypes, setAvailableTypes] = useState([]);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [selectedType, setSelectedType] = useState('');
  const [peopleAmount, setPeopleAmount] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)


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
      <Routes>
        <Route path='/book/:companyId' element={companyInfo === null ? 
          <Loading setCompanyInfo={setCompanyInfo} api="http://localhost:4000/api/companies/" /> :
          <>
            <Header companyInfo={companyInfo} RestaurantName="Sakanaya" setCompanyInfo={setCompanyInfo} />
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
                  setStepCount={setStepCount}
                />
                {
                  stepCount === 1 ? <TypeForm setAvailableTypes={setAvailableTypes} AvailableTypes={availableTypes} setSelectedType={setSelectedType} setStepCount={setStepCount} /> :
                  stepCount === 2 ? <PeopleForm companyInfo={companyInfo} peopleAmount={peopleAmount} setPeopleAmount={setPeopleAmount} setStepCount={setStepCount} selectedType={selectedType} /> :
                  stepCount === 3 ? <DateForm companyInfo={companyInfo} selectedDate={selectedDate} setSelectedDate={setSelectedDate} setStepCount={setStepCount} /> :
                  stepCount === 4 ? <TimeForm companyInfo={companyInfo} selectedTime={selectedTime} setSelectedTime={setSelectedTime} setStepCount={setStepCount} selectedType={selectedType} /> :
                  <Confirmation 
                    selectedType={selectedType}   
                    selectedTime={selectedTime} 
                    peopleAmount={peopleAmount}
                    selectedDate={selectedDate}
                    setStepCount={setStepCount}
                  />
                }
              </div>
            </main>
            <Footer />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
