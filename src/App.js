import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Book } from './pages/book';
import { Recents } from './pages/recents';
import { AllBookings } from './pages/allBookings';
import { Login } from './pages/Login';


function App() {
  const [companyInfo, setCompanyInfo] = useState(null);
  const [accessToken, setAccessToken] = useState(null);


  // useEffect(() => {
  //   const unloadCallback = (event) => {
  //     event.preventDefault();
  //     event.returnValue = "";
  //     return "";
  //   };
  
  //   window.addEventListener("beforeunload", unloadCallback);
  //   return () => window.removeEventListener("beforeunload", unloadCallback);
  // }, []);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login setAccessToken={setAccessToken} />} />
        <Route path='/login' element={<Login setAccessToken={setAccessToken} />} />
        <Route path='/recents/:companyId' element={<Recents /> } />
        <Route path='/bookings/:companyId' element={<AllBookings token={accessToken} /> } />
        <Route path='/book/:companyId' element={<Book companyInfo={companyInfo} setCompanyInfo={setCompanyInfo} /> } />
      </Routes>
    </Router>
  );
}

export default App;
