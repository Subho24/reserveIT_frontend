import { useNavigate } from 'react-router-dom';

export const DateForm = (props) => {
    const navigate = useNavigate();
    const handleOnClick = () => {
        const inputValue = document.getElementById('date').value;
        props.setSelectedDate(inputValue);
        console.log(inputValue)
        navigate('/time')
    }

    const date = new Date()
    const today = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    console.log(today)

    return (
        <div style={{textAlign: 'center', fontSize: 30, fontWeight: 'bold', marginTop: 50}}>
            <label for='date'>
                    When would you like to visit us?
            </label>
            <br />
            <input type={'date'} id='date' style={{width: 200, height: 50, marginTop: 20, fontSize: 20}} min={today} />
            <br />
            <input type={'submit'} value={'Next'} className='Next' onClick={handleOnClick} />
        </div>
    )
}