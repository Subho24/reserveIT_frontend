import { BsPeople } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

export const PeopleForm = (props) => {
    const handleOnClick = () => {
        const inputValue = document.getElementById('peopleAmount')
        console.log(inputValue.value)
        if(inputValue.value === '') {
            alert('Please select the number of people')
            return
        }
        props.setPeopleAmount(inputValue.value)
        props.setStepCount(3);
    }

    return (
        <div style={{textAlign: 'center', marginTop: 100}}>
            <h1>How many people?</h1>
            <div style={{display: 'inline-flex', fontSize: 30, margin: '0% 25% 0% 20%'}}>
                <BsPeople style={{margin: 5}}/>
                <input type={'number'} style={{fontSize: 25, width: 150}} min={0} max={6} id='peopleAmount' />
            </div>
            <br/>
            <input type='submit' className='Next' value={'Next'} onClick={handleOnClick} />
            <p style={{marginTop: 100, fontSize: 20, color: 'grey'}}>More than 6 people? Send a mail to <a href={'https'}>{props.companyInfo.company_email}</a> </p>
        </div>
    )
}