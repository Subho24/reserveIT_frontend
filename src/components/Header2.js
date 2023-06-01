import { Scale } from '@mui/icons-material';
import img from '../1olek.png'
 
 
 export const Header = () => {
  return (
    <div className="navbar">
      <a href="/"><img src={img} alt="logo" style={{width: '100%'}}/></a>
      <a href="/about_us"><i className="fa fa-group" style={{ fontSize: '24px' }}></i><span>About us</span></a>
      <a href="/conus"><i className="fa fa-envelope-o" style={{ fontSize: '24px' }}></i><span>Contact us</span></a>
      <a href="/login" className="login"><i className="fa fa-sign-in" style={{ fontSize: '24px' }}></i><span>Login</span></a>
      
    </div>
  );
};
