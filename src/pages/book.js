import { useEffect, useState } from 'react';
import { BookingHeader } from '../components/BookingHeader';
// import RamenShackLogo from '../RamenShackLogo.png';
import logo from '../logo.jpg';
import { Image } from '../components/Image';
import { NavBar } from '../components/NavBar';
import { TypeForm } from '../components/typeForm';
import { PeopleForm } from '../components/peopleForm';
import { DateForm } from '../components/dateForm';
import { TimeForm } from '../components/timeForm';
import { Confirmation } from '../components/confirmation';
import { BookingFooter } from '../components/BookingFooter'
import { Loading } from '../components/Loading';
import { BsCheckCircle } from 'react-icons/bs'
import { redirect } from 'react-router-dom';



const createArray = (length) => {
  const arr = [];
  for(let i = 0; i < length; i++) {
      arr.push(i+1);
  }
  return arr;
}

const getAvailableTimes = (startTime, endTime) => {
  let startHour = startTime.split(':')[0];

  const endHour = endTime.split(':')[0];

  const totalHours = endHour - startHour;

  let arr = [];

  for(let i = 0; i < totalHours; i++) {
    if(startTime.includes("30")) { //If start time is something like 11:30, 12:30, 13:30 ....... 
      arr.push(`${startHour}:30`)
      startHour++

      arr.push(`${startHour}:00`)
      arr.push(`${startHour}:30`)
      startHour++

      arr.push(`${startHour}:00`)
      if(startHour === endHour ) break;
    } else {

      arr.push(`${startHour}:00`)
      arr.push(`${startHour}:30`)
      startHour++

      if(startHour === endHour) {
          arr.push(`${startHour}:00`)
          break;
      };
    }
  }
  
  return arr
}

export function Book(props) {
  const [stepCount, setStepCount] = useState(1)
  const [bookingInfo, setBookingInfo] = useState();
  const [bookingStatus, setBookingStatus] = useState();
  const [timeArr, setTimeArr] = useState();
  const [peopleArr, setPeopleArr] = useState()
  const [availableTypes, setAvailableTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [peopleAmount, setPeopleAmount] = useState(0);
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState(null)


  useEffect(() => {
    if(selectedType !== '') {
      bookingInfo.map(info => {
        if(info.booking_type === selectedType) {
          setPeopleArr(createArray(info.max_people))
          setTimeArr(getAvailableTimes(info.booking_type_start, info.booking_type_end))
        }
      })
    }
  }, [selectedType])


  if(props.companyInfo === null) {
   return <Loading setBookingInfo={setBookingInfo} setCompanyInfo={props.setCompanyInfo} setAvailableTypes={setAvailableTypes} /> 
  } else {
    return(
        <>
        <div>
        <BookingHeader companyInfo={props.companyInfo} RestaurantName="Sakanaya" setCompanyInfo={props.setCompanyInfo} />
        <img src={logo} alt='Company logo' className='imageForMobile' />
        {
          bookingStatus ? (
            <div style={{marginTop: '20%'}}>
              <BsCheckCircle style={{
                  fontSize: 50,
                  color: 'green',
                  margin: 'auto'
              }} />
              <p>Vi har tagit emot din bokning.</p>
              <p>Du kommer inom kort att få ett bekräftelsemejl.</p>
              <p>Tack så mycket</p>
              <a style={{textDecoration: 'none'}} href='https://kaisekimalmo.se/'>
                <button className='Next'>
                  Okej
                </button>
              </a>
            </div>
          )
          :
          (              
            <main style={{display: 'flex', width: '100%', height: '100%'}}>
                <Image />
              <div className='bookingForm' style={{width: '100%', textAlign: 'center'}}>
                <NavBar 
                  selectedType={selectedType}
                  peopleAmount={peopleAmount}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  setStepCount={setStepCount}
                  stepCount={stepCount}
                />
                {
                  stepCount === 1 ? <TypeForm bold={true} companyInfo={props.companyInfo} setAvailableTypes={setAvailableTypes} AvailableTypes={availableTypes} setSelectedType={setSelectedType} setStepCount={setStepCount} /> :
                  stepCount === 2 ? <PeopleForm bold={true} peopleArr={peopleArr} companyInfo={props.companyInfo} peopleAmount={peopleAmount} setPeopleAmount={setPeopleAmount} setStepCount={setStepCount} selectedType={selectedType} /> :
                  stepCount === 3 ? <DateForm bold={true} companyInfo={props.companyInfo} selectedDate={selectedDate} setSelectedDate={setSelectedDate} setStepCount={setStepCount} /> :
                  stepCount === 4 ? <TimeForm bold={true} timeArr={timeArr} companyInfo={props.companyInfo} selectedTime={selectedTime} setSelectedTime={setSelectedTime} setStepCount={setStepCount} selectedType={selectedType} /> :
                  <Confirmation 
                    selectedType={selectedType}   
                    selectedTime={selectedTime} 
                    peopleAmount={peopleAmount}
                    selectedDate={selectedDate}
                    setStepCount={setStepCount}
                    setBookingStatus={setBookingStatus}
                  />
                }
              </div>
            </main>
          )
        }
        </div>
        <BookingFooter />
      </>
    )
  }
}
