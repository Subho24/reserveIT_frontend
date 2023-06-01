import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Home }from './pages/homepage';
import { About_us } from './pages/about_us';
import { Conus } from './pages/conus';
import { Login } from './pages/login2';
import PasswordPage from './pages/pass';
import Password from './pages/passres';

const App = () => {
  return (

    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about_us' element={<About_us showThis='test' />} />
        <Route path='/conus' element={<Conus/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/passwordChanger' element={<PasswordPage/>} />
        <Route path='/newpassword' element={<Password/>} />
      </Routes>
    </Router>
  );
};

export default App;
