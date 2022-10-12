import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Header } from './components/Header';
import { NavBar } from './components/NavBar';
import { TypeForm } from './components/typeForm';
import { PeopleForm } from './components/peopleForm';


function App() {
  const [selectedType, setSelectedType] = useState('');
  const availableTypes = [
    'Breakfast',
    'Lunch',
    'Dinner'
  ]

  return (
    <Router>
      <Header RestaurantName="Sakanaya" />
      <NavBar 
        selectedType={selectedType}
      />
      <main>
        <Routes>
          <Route path='/book' element={<TypeForm AvailableTypes={availableTypes} setSelectedType={setSelectedType} />} />
          <Route path='/people' element={<PeopleForm AvailableTypes={availableTypes} setSelectedType={setSelectedType} />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
