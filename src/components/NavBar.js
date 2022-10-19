import { NavLink } from 'react-router-dom';
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
            <NavLink style={NavLinkStyle} to={'/book'} >
                <BsTag/>{props.selectedType === '' ? 'Type' : props.selectedType}
            </NavLink>
            <NavLink style={NavLinkStyle} to={'/people'} onClick={(e) => {if(props.selectedType === '') e.preventDefault()}} >
                <BsPerson/>{props.peopleAmount === 0 ? 'People' : props.peopleAmount === 1 ? '1 person' : `${props.peopleAmount} persons`}
            </NavLink>
            <NavLink style={NavLinkStyle} to={'/date'} onClick={(e) => {if(props.peopleAmount === 0) e.preventDefault()}} >
                <BsCalendarWeek/>{props.selectedDate === null ? 'Date' : props.selectedDate}
            </NavLink>
            <NavLink style={NavLinkStyle} to={'/time'} onClick={(e) => {if(props.selectedDate === null) e.preventDefault()}} >
                <BiTime/>{props.selectedTime === null ? 'Time' : props.selectedTime}
            </NavLink>
            <NavLink style={NavLinkStyle} to={'/confirm'} onClick={(e) => {if(props.selectedTime === null) e.preventDefault()}} >
                <BsCalendarCheck/>Confirm
            </NavLink>
        </div>
    )
}