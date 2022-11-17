import { Link } from 'react-router-dom';
import { BsTag, BsPerson, BsCalendarCheck, BsCalendarWeek } from 'react-icons/bs';
import { BiTime } from 'react-icons/bi';


export const NavBar = (props) => {

    return (
        <div  className='NavBar'  >
            <Link
                style={props.stepCount === 1 ? {fontWeight: 'bold', border: 'Solid 1px black', borderRadius: 10, padding: 6, color: 'black'} : {}}
                className='steps'
                onClick={() => {
                props.setStepCount(1);
            }} >
                <BsTag/>{props.selectedType === '' ? 'Type' : props.selectedType}
            </Link>
            <Link style={{pointerEvents: props.selectedType === '' ? 'none' : '', fontWeight: props.stepCount === 2 ? 'bold' : '', border: props.stepCount === 2 ? 'solid 1px black': null, padding: props.stepCount === 2 ? 6 : null, borderRadius: props.stepCount === 2 ? 10 : null, color: props.stepCount === 2 ? 'black' : null }}
                className='steps'  
                onClick={(e) => {
                if(props.selectedType === '') e.preventDefault()
                props.setStepCount(2);
            }} >
                <BsPerson/>{props.peopleAmount === 0 ? 'People' : props.peopleAmount === '1' ? '1 person' : `${props.peopleAmount} person`}
            </Link>
            <Link style={{pointerEvents: props.peopleAmount === 0 ? 'none' : '', fontWeight: props.stepCount === 3 ? 'bold' : null, border: props.stepCount === 3 ? 'solid 1px black': null, padding: props.stepCount === 3 ? 6 : null, borderRadius: props.stepCount === 3 ? 10 : null, color: props.stepCount === 3 ? 'black' : null }}  
                className='steps'
                onClick={(e) => {
                if(props.peopleAmount === 0) e.preventDefault()
                props.setStepCount(3);
            }} >
                <BsCalendarWeek/>{props.selectedDate === '' ? 'Date' : props.selectedDate}
            </Link>
            <Link style={{pointerEvents: props.selectedDate === '' ? 'none' : '', fontWeight: props.stepCount === 4 ? 'bold' : null,  border: props.stepCount === 4 ? 'solid 1px black': null, padding: props.stepCount === 4 ? 6 : null, borderRadius: props.stepCount === 4 ? 10 : null, color: props.stepCount === 4 ? 'black' : null }}  
                className='steps'
                onClick={(e) => {
                if(props.selectedDate === null) e.preventDefault()
                props.setStepCount(4);
            }} >
                <BiTime/>{props.selectedTime === null ? 'Time' : props.selectedTime}
            </Link>
            <Link style={{pointerEvents: props.selectedTime === null ? 'none' : '', fontWeight: props.stepCount === 5 ? 'bold' : null,  border: props.stepCount === 5 ? 'solid 1px black': null, padding: props.stepCount === 5 ? 6 : null, borderRadius: props.stepCount === 5 ? 10 : null, color: props.stepCount === 5 ? 'black' : null }}  
                className='steps'
                onClick={(e) => {
                if(props.selectedTime === null) e.preventDefault()
                props.setStepCount(5);
            }} >
                <BsCalendarCheck/>Confirm
            </Link>
        </div>
    )
}