import { useState } from 'react';
import { IconButton, Menu, MenuItem} from '@mui/material'
import { MoreVert } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

const headerStyle = {
    display: 'flex',
    backgroundColor: '#222222',
    color: 'white',
    height: 60,
    textAlign: 'center',
    padding: '0px 10px 0px 10px'
}

// const linkStyle = {
//     textDecoration: 'none',
//     color: 'white',
// }

// export const Header = (props) => {
//     const { companyId } = useParams();
//     const redirect = useNavigate();

//     const handleLogOut = () => {
//         sessionStorage.removeItem('accessToken');
//         redirect('/login');
//     }

//     return (
//         <Box className='header' style={headerStyle} >
//             <div className='NavLink'> Bookings</div>
//             <div className='NavLink'> Recents </div>
//             <div className='NavLink' style={{marginLeft: 'auto'}} onClick={handleLogOut} >Log out</div>
//         </Box>
//     )
// }



export function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { companyId } = useParams();
  const redirect = useNavigate()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{
        backgroundColor: 'black',
        color: 'white'
    }}>
      <IconButton
        id="positioned-demo-button"
        aria-controls={open ? 'positioned-demo-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="outlined"
        color="inherit"
        onClick={handleClick}
        style={{
            float: 'left'
        }}
      >
        <MoreVert />
      </IconButton>

      <Menu
        id="positioned-demo-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        aria-labelledby="positioned-demo-button"
        placement="bottom-end"
      >
        <MenuItem onClick={() => {
              redirect(`/bookings/${companyId}`)
              setAnchorEl(null);
            }}
        >
            Calendar
        </MenuItem>
        <MenuItem onClick={() => {
              redirect(`/recents/${companyId}`)
              setAnchorEl(null);
            }}
        >
            All bookings
        </MenuItem>
      </Menu>
    </div>
  );
}