import { NavLink } from 'react-router-dom';
import { BsTag, BsPerson, BsCalendarCheck, BsCalendarWeek } from 'react-icons/bs';
import { BiTime } from 'react-icons/bi';


export const NavBar = (props) => {
    const divStyle = {
        display: 'inline-block',
        margin: '10% 25% 0% 25%'
    }
    const NavLinkStyle = {
        margin: 20,
        fontSize: 20,
        fontStyle: 'none',
        textDecoration: 'none',
        color: 'grey'
    }
    return (
        <div style={divStyle} className='NavBar'  >
            <NavLink style={NavLinkStyle} to={'/book'}>
                <BsTag/>{props.selectedType === '' ? 'Type' : props.selectedType}
            </NavLink>
            <NavLink style={NavLinkStyle} to={'/people'}>
                <BsPerson/>People
            </NavLink>
            <NavLink style={NavLinkStyle} to={'/date'}>
                <BsCalendarWeek/>Date
            </NavLink>
            <NavLink style={NavLinkStyle} to={'/time'}>
                <BiTime/>Time
            </NavLink>
            <NavLink style={NavLinkStyle} to={'/confirm'}>
                <BsCalendarCheck/>Confirm
            </NavLink>
        </div>
    )
}