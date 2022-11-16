import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../axios'

const getAvailableTimes = (startTime, endTime) => {
    const date = new Date();
    const formatedDate = `${date.getFullYear}-${date.getMonth() + 1}-${date.getDate()}`;

    let startHour = new Date(`${formatedDate}, ${startTime}`).getHours();

    const endHour = new Date(`${formatedDate}, ${endTime}`).getHours();

    const totalHours = endHour - startHour;

    const arr = [];

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
    return arr;
}

export const TimeForm = (props) => {
    const { companyId } = useParams()
    const [availableTimes, setAvailableTimes] = useState();
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();

    useEffect(() => {
        axios.get(`/api/booking_instructions/${companyId}`).then(response => {
            response.data.map(item => {
                if(item.booking_type === props.selectedType) {
                    setStartTime(item.booking_type_start)
                    setEndTime(item.booking_type_end)
                }
            })
        })
    }, [])

    const handleOnClick = (e) => {
        props.setSelectedTime(e.target.innerText);
        props.setStepCount(5);
    }

    const time = getAvailableTimes(startTime, endTime);

    useEffect(() => {
       const timeOutId = setTimeout(() => {
            setStartTime(startTime);
        }, 2000)

        return () => clearTimeout(timeOutId);
    })

    return (
        <div className='formContainer' >
            <h1>Which time?</h1>
            <div className='input'>
                {/* <BsClock className='clockIcon'/>
                < Select 
                    backspaceRemovesValue = {true}
                    isClearable={false}
                    isSearchable={false}
                    options={availableTimes}
                    isDisabled={false}
                    onChange={(e) => inputValue = e.value}
                /> */}
                {console.log(time)}
                {                     
                    time.map(time => <span className='floatingTabs' onClick={handleOnClick} >{time}</span>)
                }
            </div>
        </div>
    )
}

