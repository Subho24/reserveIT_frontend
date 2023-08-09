import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Book } from './pages/book';
import { Recents } from './pages/allBookings';
import { DailyBookings } from './pages/DailyBookings';
import { Login } from './pages/Login';
import { Edit } from './pages/edit';
import { PunchClock } from './pages/punchClock';
import { Punches } from './pages/punches';


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
        <Route path='/admin/recents/:companyId' element={<Recents /> } />
        <Route path='/admin/bookings/:companyId' element={<DailyBookings token={accessToken} companyInfo={companyInfo} /> } />
        <Route path='/admin/edit/:companyId' element={<Edit token={accessToken} companyInfo={companyInfo} setCompanyInfo={setCompanyInfo} /> } />
        <Route path='/admin/punch/:companyId' element={<PunchClock companyInfo={companyInfo} />} />
        <Route path='/admin/punches/:companyId' element={<Punches companyInfo={companyInfo} />} />
        <Route path='/book/:companyId' element={<Book companyInfo={companyInfo} setCompanyInfo={setCompanyInfo} /> } />
      </Routes>
    </Router>
  );
}

export default App;
