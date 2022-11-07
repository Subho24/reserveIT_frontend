import { useState } from 'react';
import { BookingHeader } from '../components/BookingHeader';
import { Image } from '../components/Image';
import { NavBar } from '../components/NavBar';
import { TypeForm } from '../components/typeForm';
import { PeopleForm } from '../components/peopleForm';
import { DateForm } from '../components/dateForm';
import { TimeForm } from '../components/timeForm';
import { Confirmation } from '../components/confirmation';
import { BookingFooter } from '../components/BookingFooter'
import { Loading } from '../components/Loading';


export function Book(props) {
  const [stepCount, setStepCount] = useState(1)
  const [availableTypes, setAvailableTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [peopleAmount, setPeopleAmount] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)

  if(props.companyInfo === null) {
   return <Loading setCompanyInfo={props.setCompanyInfo} /> 
  } else {
    return(
        <>
        <div>
        <BookingHeader companyInfo={props.companyInfo} RestaurantName="Sakanaya" setCompanyInfo={props.setCompanyInfo} />
        <main style={{display: 'flex', width: '100%', height: '100%'}}>
            <Image />
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
              stepCount === 2 ? <PeopleForm companyInfo={props.companyInfo} peopleAmount={peopleAmount} setPeopleAmount={setPeopleAmount} setStepCount={setStepCount} selectedType={selectedType} /> :
              stepCount === 3 ? <DateForm companyInfo={props.companyInfo} selectedDate={selectedDate} setSelectedDate={setSelectedDate} setStepCount={setStepCount} /> :
              stepCount === 4 ? <TimeForm companyInfo={props.companyInfo} selectedTime={selectedTime} setSelectedTime={setSelectedTime} setStepCount={setStepCount} selectedType={selectedType} /> :
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
        </div>
        <BookingFooter />
      </>
    )
  }
}
