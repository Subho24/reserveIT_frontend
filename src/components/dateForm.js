export const DateForm = (props) => {

    const handleOnClick = () => {
        const inputValue = document.getElementById('date').value;

        if(inputValue === '') {
            alert('Välj ett datum')
            return
        }
        props.setSelectedDate(inputValue);
        props.setStepCount(4);
    }

    const handleChange = (target) => {
        const today = new Date();
        const selectedDate = new Date(target.value)

        if(selectedDate.getDate() < today.getDate() && selectedDate.getMonth() <= today.getMonth()) {
            alert('Välj ett giltigt datum');
            return
        }
        
        props.setSelectedDate(target.value)
    }

    const date = new Date()
    const today = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`

    return (
        <div className='formContainer' style={{fontWeight: 'bold'}}>
            <label className="TimeLabel">
                Välj datum
            </label>
            <br />
            <input type={'date'} id='date' min={today} value={props.selectedDate} onChange={(e) => handleChange(e.target)} />
            <br />
            <input type={'submit'} value={'bttn'} className='bttn' onClick={handleOnClick} />
        </div>
    )
}