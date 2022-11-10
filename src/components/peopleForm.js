import { useState, useEffect } from 'react';
import { BsPeople } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const PeopleForm = (props) => {
    const { companyId } = useParams();
    const [maxPeople, setMaxPeople] = useState(0);
    
    const handleOnClick = () => {
        const inputValue = document.getElementById('peopleAmount')
        if(inputValue.value === '') {
            alert('Please select the number of people')
            return
        } else if(inputValue.value === '0') {
            alert('The booking should be atleast for 1 person')
            return
        }
        props.setPeopleAmount(inputValue.value)
        props.setStepCount(3);
    }

    const handleOnChange = ({target}) => {
        props.setPeopleAmount(target.value)
    }

    useEffect(() => {
        axios.get(`http://localhost:4000/api/booking_instructions/${companyId}/`).then(response => {
            response.data.map(item => {
                if(item.booking_type === props.selectedType) { setMaxPeople(item.max_people) }
            })
        })
    }, [])

    return (
        <div style={{textAlign: 'center', marginTop: 100}}>
            <h1>How many people?</h1>
            <div style={{display: 'inline-flex', fontSize: 30, margin: '0% 25% 0% 20%'}}>
                <BsPeople style={{margin: 5}}/>
                <input type={'number'} style={{fontSize: 25, width: 150}} min={0} max={maxPeople} id='peopleAmount' value={props.peopleAmount} onChange={handleOnChange} required />
            </div>
            <br/>
            <input type='submit' className='Next' value={'Next'} onClick={handleOnClick} />
            <p style={{marginTop: 100, fontSize: 20, color: 'grey'}}>More than {maxPeople} people? Send a mail to <a href={'https'}>{props.companyInfo.company_email}</a> </p>
        </div>
    )
}