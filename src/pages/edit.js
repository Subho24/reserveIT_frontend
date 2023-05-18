import { useEffect, useState } from 'react';
import { TypeForm } from '../components/typeForm';
import { DateForm } from '../components/dateForm';
import { TimeForm } from '../components/timeForm';
import { BookingFooter } from '../components/BookingFooter'
import { Loading } from '../components/Loading';
import { BsCheckCircle } from 'react-icons/bs'
import { BiError } from 'react-icons/bi'
import { useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import axios from '../axios';



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

export function Edit(props) {
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
  const [closedBookings, setClosedBookings] = useState([])
  
  const {companyId} = useParams()
  const token = sessionStorage.getItem('accessToken')



  useEffect(() => {
    if(selectedType !== '') {
      bookingInfo.map(info => {
        if(info.booking_type === selectedType) {
          setPeopleArr(createArray(info.max_people))
          setTimeArr(getAvailableTimes(info.booking_type_start, info.booking_type_end))
        }
      })
    }

    if(peopleAmount) {
      setSelectedTime(null);
    }
  }, [selectedType])

  useEffect(() => {
    if(selectedDate) {
        axios.get(`/api/booking_settings/${companyId}/?type=${selectedType}&&date=${selectedDate}`)
        .then(res => {
            setClosedBookings(res.data)
        })
    }
  }, [selectedDate, selectedType])

  const getClosedBookings = () => {
    axios.get(`/api/booking_settings/${companyId}/?type=${selectedType}&&date=${selectedDate}`)
    .then(res => {
        setClosedBookings(res.data)
    })
  }


  if(props.companyInfo === null) {
   return <Loading setBookingInfo={setBookingInfo} setCompanyInfo={props.setCompanyInfo} setAvailableTypes={setAvailableTypes} /> 
  } else {
    return(
        <>
        <Header />
        {
          bookingStatus === 'success' ? (
            <div style={{margin: '20%', textAlign: 'center'}}>
              <BsCheckCircle style={{
                  fontSize: 50,
                  color: 'green',
                  margin: 'auto'
              }} />
              <p>Tiden har gjorts obokningsbar.</p>
              <a style={{textDecoration: 'none'}} href={`/admin/edit/${props.companyInfo.company_id}`}>
                <button className='bttn'>
                  Okej
                </button>
              </a>
            </div>
          )
          : bookingStatus === 'error' ?
          (
            <div style={{marginTop: '20%', textAlign: 'center'}}>
              <BiError style={{
                  fontSize: 50,
                  color: 'red',
                  margin: 'auto'
              }} />
              <p>Något gick fel</p>
              <p>Försök igen senare.</p>
              <a style={{textDecoration: 'none'}} href={`https://reserveit.se/book/${props.companyInfo.company_id}`}>
                <button className='bttn'>
                  Okej
                </button>
              </a>
            </div>
          )
          :
          (              
            <main style={{display: 'flex', width: '100%', height: '100%'}}>
              <div className='bookingForm' style={{width: '100%', textAlign: 'center'}}>
                <h2>Edit Settings for</h2>
                <TypeForm bold={true} companyInfo={props.companyInfo} setAvailableTypes={setAvailableTypes} AvailableTypes={availableTypes} setSelectedType={setSelectedType} setStepCount={setStepCount} />
                {

                    selectedType ? <DateForm bold={true} companyInfo={props.companyInfo} selectedDate={selectedDate} setSelectedDate={setSelectedDate} edit={true} /> 
                    :
                    null
                }
                {
                    selectedDate ? <TimeForm bold={true} edit={true} token={token} getClosedBookings={getClosedBookings} timeArr={timeArr} companyInfo={props.companyInfo} selectedTime={selectedTime} setSelectedTime={setSelectedTime} selectedDate={selectedDate} selectedType={selectedType} closedBookings={closedBookings} /> 
                    :
                    null
                }
              </div>
            </main>
          )
        }
        <BookingFooter />
      </>
    )
  }
}
