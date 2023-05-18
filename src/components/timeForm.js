import { redirect } from 'react-router-dom';
import axios from '../axios';
import Switch from '@mui/material/Switch';

export const TimeForm = (props) => {

    const timeAvailable = (time) => {
        const now = new Date();
        const selectedDate = new Date(props.selectedDate)
        const selectedTime = parseInt(time.split(':')[0]);

        if(selectedDate.toLocaleDateString() === now.toLocaleDateString()) {

            if(selectedTime - 3 >= now.getHours()) {
                return true
            } else {
                return false
            }
        } else {
            return true
        }
    }

    const timeClosed = (time) => {
        for(let i = 0; i < props.closedBookings.length; i++) {
            if(props.closedBookings[i].booking_closed_time === time) {
                return true
            }
        }
        return false
    }


    const handleChange = (time) => {
        if(timeClosed(time)) {
            axios.delete(`/api/booking_settings/${props.companyInfo.company_id}`, {
                headers: { 
                    'Authorization': `Bearer ${props.token}`
                },
                data: {
                    company_id: props.companyInfo.company_id,
                    booking_closed_date: props.selectedDate,
                    booking_closed_type: props.selectedType,
                    booking_closed_time: time
                }
            })
            .then(res => {
                console.log(res.status)
                props.getClosedBookings()
            })
            .catch(err => {
                console.log(err)
                if(err.status === 403) redirect('/login')
            })
        } else {
            axios.post('/api/booking_settings', {
                company_id: props.companyInfo.company_id,
                booking_closed_date: props.selectedDate,
                booking_closed_type: props.selectedType,
                booking_closed_time: time
            })
            .then(res => {
                console.log(res.status)
                props.getClosedBookings()
            })
            .catch(err => {
                console.log(err)
                if(err.status === 403) redirect('/login')
            })
        }
    }

 
    const handleOnClick = ({target}) => {
        console.log(timeAvailable(target.innerText))
        console.log(timeClosed(target.innerText))

        if(timeClosed(target.innerText) === true) {
            alert('Vald tiden är full bokad')
            return
        } else if(timeAvailable(target.innerText) === false) {
            alert('Vald tid är inte tillgänglig')
            return;
        }

        props.setSelectedTime(target.innerText);
        props.setStepCount(5);
    }

    const editJSX = (
        <div className='formContainer' >
            <h1>Välj tid</h1>
            <div className='input'>
                {
                    props.timeArr ? props.timeArr.map(time => {
                        return (
                            <div>
                                <span className='floatingTabs' onClick={(e) => handleOnClick} style={{backgroundColor: timeAvailable(time) === true && timeClosed(time) !== true ? null : 'lightgrey' }}>
                                    {time}
                                </span>
                                <div style={{margin: 10}}>
                                    <Switch
                                        disabled={timeAvailable(time) ? false : true}
                                        checked={!timeClosed(time)}
                                        onChange={() => handleChange(time)}
                                    />
                                </div>
                            </div>
                        )
                    })
                    : null
                }
            </div>
        </div>
    )

    const bookJSX = (
        <div className='formContainer' >
            <h1>Välj tid</h1>
            <div className='input'>
                {                     
                    props.timeArr ? props.timeArr.map(time => <span className='floatingTabs' onClick={handleOnClick} style={{backgroundColor: timeAvailable(time) === true && timeClosed(time) === false ? null : 'orange' }} >{time}</span>) : null
                }
            </div>
        </div>
    )

    if(props.edit) {
        return editJSX
    } else {
        return bookJSX
    }

}

