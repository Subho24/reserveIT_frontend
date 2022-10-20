import Select from 'react-select';
import { BsClock } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios'

export const TimeForm = (props) => {
    const { companyId } = useParams()
    const [availableTimes, setAvailableTimes] = useState([]);
    let inputValue = null;

    useEffect(() => {
        axios.get(`http://localhost:4000/api/booking_instructions/${companyId}/`).then(response => {
            response.data.map(item => {
                if(item.booking_type === props.selectedType) { setAvailableTimes(getAvailableTimes(item.booking_type_start, item.booking_type_end )) }
            })
        })
    }, [])

    const handleOnClick = () => {
        inputValue === null ? props.setSelectedTime(null) : props.setSelectedTime(inputValue);
        props.setStepCount(5);
    }

    return (
        <div style={{marginTop: 100}} >
            <h1>Which time?</h1>
            <div style={{display: 'flex',width: 150, margin: 'auto', marginTop: 50}}>
                <BsClock style={{fontSize: 30, marginRight: 5}}/>
                < Select 
                    backspaceRemovesValue = {true}
                    isClearable={false}
                    isSearchable={false}
                    options={availableTimes}
                    isDisabled={false}
                    onChange={(e) => inputValue = e.value}
                />
            </div>
            <input type={'submit'} value={'Next'} className='Next' onClick={handleOnClick} />
        </div>
    )
}

const getAvailableTimes = (startTime, endTime) => {
    const date = new Date();
    const formatedDate = `${date.getFullYear}-${date.getMonth() + 1}-${date.getDate()}`;
    let startHour = new Date(`${formatedDate}, ${startTime}`).getHours();
    const endHour = new Date(`${formatedDate}, ${endTime}`).getHours();
    const totalHours = endHour - startHour;
    const arr = [];
    for(let i = 0; i < totalHours; i++) {
      if(startTime.includes("30")) {
        arr.push({value: `${startHour}:30`, label: `${startHour}:30`})
        startHour++
        arr.push({value: `${startHour}:00`, label: `${startHour}:00`})
        arr.push({value: `${startHour}:30`, label: `${startHour}:30`})
        startHour++
        arr.push({value: `${startHour}:00`, label: `${startHour}:00`})
        if(`${startHour}:30` === endTime || `${startHour}:00` === endTime ) break;
      } else {
        arr.push({value: `${startHour}:00`, label: `${startHour}:00`})
        arr.push({value: `${startHour}:30`, label: `${startHour}:30`})
        startHour++
        if(`${startHour}:30` === endTime || `${startHour}:00` === endTime ) break;
      }
    }
    return arr;
}

