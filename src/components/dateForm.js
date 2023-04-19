export const DateForm = (props) => {
    const handleOnClick = () => {
        const inputValue = document.getElementById('date').value;
        const today = new Date();
        const selectedDate = new Date(inputValue)
        if(today.getTime() >= selectedDate.getTime()) {
            alert('Please select a valid date')
            return
        }

        if(inputValue === '') {
            alert('Please select a date')
            return
        }
        props.setSelectedDate(inputValue);
        props.setStepCount(4);
    }

    const handleChange = (target) => {
        props.setSelectedDate(target.value)
    }

    const date = new Date()
    const today = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`

    return (
        <div className='formContainer' style={{fontWeight: 'bold'}}>
            <label className="TimeLabel">
                Valj datum
            </label>
            <br />
            <input type={'date'} id='date' min={today} value={props.selectedDate} onChange={(e) => handleChange(e.target)} />
            <br />
            <input type={'submit'} value={'Next'} className='Next' onClick={handleOnClick} />
        </div>
    )
}