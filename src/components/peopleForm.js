import { useState, useEffect } from 'react';
import { BsPeople } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import axios from '../axios';

const createArray = (length) => {
    const arr = [];
    for(let i = 0; i < length; i++) {
        arr.push(i+1);
    }
    return arr;
}

export const PeopleForm = (props) => {
    const { companyId } = useParams();
    const [peopleArr, setPeopleArr] = useState([]);
    
    const handleOnClick = (e) => {
        // const inputValue = document.getElementById('peopleAmount')
        // if(inputValue.value === '') {
        //     alert('Please select the number of people')
        //     return
        // } else if(inputValue.value === '0') {
        //     alert('The booking should be atleast for 1 person')
        //     return
        // }
        // if(parseInt(inputValue.value) > maxPeople) {
        //     alert(`Number of people can be max ${maxPeople}`)
        //     return
        // }
        // props.setPeopleAmount(inputValue.value)
        // props.setStepCount(3);
        props.setPeopleAmount(e.target.innerText)
        props.setStepCount(3);
    }

    // const handleOnChange = ({target}) => {
    //     props.setPeopleAmount(target.value)
    // }

    useEffect(() => {
        axios.get(`/api/booking_instructions/${companyId}/`).then(response => {
            response.data.map(item => {
                if(item.booking_type === props.selectedType) {
                    setPeopleArr(createArray(item.max_people))
                }
            })
        })
    }, [])

    return (
        <div className='formContainer'>
            <h1>How many people?</h1>
            {/* <div style={{display: 'inline-flex', fontSize: 30, margin: '0% 25% 0% 20%'}}>
                <BsPeople style={{margin: 5}}/>
                <input type={'number'}  min={0} max={maxPeople} id='peopleAmount' value={props.peopleAmount} onChange={handleOnChange} required />
            </div>
            <br/>
            <input type='submit' className='Next' value={'Next'} onClick={handleOnClick} /> */}
            <div className='input'>
                {peopleArr.map(num => {
                    return(
                        <span className='floatingTabs' onClick={e => handleOnClick(e)} >{num}</span>
                    )
                })}
            </div>
            <p className='people'>More than {peopleArr.length} people? Send a mail to <a href={'https'}>{props.companyInfo.company_email}</a> </p>
        </div>
    )
}