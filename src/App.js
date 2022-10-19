import './App.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Main } from './components/Main';


function App() {

  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };
  
    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);


  return (
    <Router>
      <Routes>
        <Route path='/book/:restaurantId' element={<Main />} />
      </Routes>
    </Router>
  );

}

export default App;
