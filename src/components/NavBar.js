import { Link } from 'react-router-dom';
import { BsTag, BsPerson, BsCalendarCheck, BsCalendarWeek } from 'react-icons/bs';
import { BiTime } from 'react-icons/bi';


export const NavBar = (props) => {
    const NavLinkStyle = {
        margin: 15,
        fontSize: '1.2em',
        fontStyle: 'none',
        textDecoration: 'none',
        color: 'grey'
    }
    return (
        <div  className='NavBar'  >
            <Link style={NavLinkStyle} onClick={() => {
                props.setStepCount(1);
            }} >
                <BsTag/>{props.selectedType === '' ? 'Type' : props.selectedType}
            </Link>
            <Link style={NavLinkStyle}  onClick={(e) => {
                if(props.selectedType === '') e.preventDefault()
                props.setStepCount(2);
            }} >
                <BsPerson/>{props.peopleAmount === 0 ? 'People' : props.peopleAmount === 1 ? '1 person' : `${props.peopleAmount} persons`}
            </Link>
            <Link style={NavLinkStyle}  onClick={(e) => {
                if(props.peopleAmount === 0) e.preventDefault()
                props.setStepCount(3);
            }} >
                <BsCalendarWeek/>{props.selectedDate === null ? 'Date' : props.selectedDate}
            </Link>
            <Link style={NavLinkStyle}  onClick={(e) => {
                if(props.selectedDate === null) e.preventDefault()
                props.setStepCount(4);
            }} >
                <BiTime/>{props.selectedTime === null ? 'Time' : props.selectedTime}
            </Link>
            <Link style={NavLinkStyle}  onClick={(e) => {
                if(props.selectedTime === null) e.preventDefault()
                props.setStepCount(5);
            }} >
                <BsCalendarCheck/>Confirm
            </Link>
        </div>
    )
}