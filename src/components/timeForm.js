import Select from 'react-select';
import { BsClock } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

export const TimeForm = (props) => {
    const navigate = useNavigate();
    const openedHours = (props.closingTime - props.openingTime);
    const bookableTimes = getBookableTimes(props.openingTime, openedHours);
    let inputValue = null;
    const handleOnClick = () => {
        inputValue === null ? props.setSelectedTime(null) : props.setSelectedTime(inputValue);
        navigate('/confirm')
    }

    return (
        <div>
            <h1>Which time?</h1>
            <div style={{display: 'flex',width: 150, margin: 'auto', marginTop: 50}}>
                <BsClock style={{fontSize: 30, marginRight: 5}}/>
                < Select 
                    backspaceRemovesValue = {true}
                    isClearable={false}
                    isSearchable={false}
                    options={bookableTimes}
                    isDisabled={false}
                    onChange={(e) => inputValue = e.value}
                />
            </div>
            <input type={'submit'} value={'Next'} className='Next' onClick={handleOnClick} />
        </div>
    )
}

const getBookableTimes = (openingTime, hours) => {
    let startTime = openingTime
    const bookableHours = [];
    for (let i = 0; i < hours; i++) {
      bookableHours.push({value: `${startTime}:00`, label:`${startTime}:00` })
      bookableHours.push({value: `${startTime}:30`, label:`${startTime}:30` })
      startTime++
    }

    return bookableHours;
  } 

