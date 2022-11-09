import { Box } from '@mui/material/'
import { NavLink, useParams, Link, useNavigate } from 'react-router-dom'

const headerStyle = {
    display: 'flex',
    backgroundColor: '#222222',
    color: 'white',
    height: 60,
    textAlign: 'center',
    padding: '0px 10px 0px 10px'
}

const linkStyle = {
    textDecoration: 'none',
    color: 'white',
}

export const Header = (props) => {
    const { companyId } = useParams();
    const redirect = useNavigate();

    const handleLogOut = () => {
        sessionStorage.removeItem('accessToken');
        redirect('/login');
    }

    return (
        <Box className='header' style={headerStyle} >
            <NavLink className='NavLink' style={({isActive}) => isActive ? {backgroundColor: 'white', color: 'black'} : null } >Bookings</NavLink>
            <div className='NavLink' style={{marginLeft: 'auto'}} onClick={handleLogOut} >Log out</div>
        </Box>
    )
}