import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Book } from './pages/book';
import { Home } from './pages/Home';
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
        <Route path='/dashboard/:companyId' element={<Home token={accessToken} /> } />
        <Route path='/book/:companyId' element={<Book companyInfo={companyInfo} setCompanyInfo={setCompanyInfo} /> } />
      </Routes>
    </Router>
  );
}

export default App;
