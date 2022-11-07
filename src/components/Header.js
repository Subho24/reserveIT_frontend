import { Box } from '@mui/material/'
import { NavLink, useParams, Link } from 'react-router-dom'

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

    return (
        <Box className='header' style={headerStyle} >
            <NavLink className='NavLink' to={`/${companyId}`} style={({isActive}) => isActive ? {backgroundColor: 'white', color: 'black'} : null } >Bookings</NavLink>
            <Link className='NavLink' style={{marginLeft: 'auto'}} >Log out</Link>
        </Box>
    )
}