import { BsPeople } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

export const PeopleForm = (props) => {
    const navigate = useNavigate();
    const handleOnClick = ({target}) => {
        const inputValue = document.getElementById('peopleAmount')
        props.setPeopleAmount(inputValue.value)
        navigate('/date')
    }

    return (
        <div style={{textAlign: 'center'}}>
            <h1>How many people?</h1>
            <div style={{display: 'inline-flex', fontSize: 30, margin: '0% 25% 0% 20%'}}>
                <BsPeople style={{margin: 5}}/>
                <input type={'number'} style={{fontSize: 25, width: 150}} min={0} max={6} id='peopleAmount' />
            </div>
            <br/>
            <input type='submit' className='Next' value={'Next'} onClick={handleOnClick} />
            <p style={{marginTop: 100, fontSize: 20, color: 'grey'}}>More than 6 people? Send a mail to <a href='#'>subhojitan@gmail.com</a> </p>
        </div>
    )
}