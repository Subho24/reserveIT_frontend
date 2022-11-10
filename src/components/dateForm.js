import { useNavigate } from 'react-router-dom';

export const DateForm = (props) => {
    const handleOnClick = () => {
        const inputValue = document.getElementById('date').value;
        if(inputValue === '') {
            alert('Please select a date')
            return
        }
        props.setSelectedDate(inputValue);
        props.setStepCount(4);
    }

    const date = new Date()
    const today = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`

    return (
        <div style={{textAlign: 'center', fontSize: 30, fontWeight: 'bold', marginTop: 100}}>
            <label for='date'>
                    When would you like to visit us?
            </label>
            <br />
            <input type={'date'} id='date' style={{width: 200, height: 50, marginTop: 20, fontSize: 20}} min={today} value={props.selectedDate} />
            <br />
            <input type={'submit'} value={'Next'} className='Next' onClick={handleOnClick} />
        </div>
    )
}