import japaneseRestaurant from '../japaneseRestaurant.png';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useParams} from 'react-router-dom';
import { Header } from './Header';
import { NavBar } from './NavBar';
import { TypeForm } from './typeForm';
import { PeopleForm } from './peopleForm';
import { DateForm } from './dateForm';
import { TimeForm } from './timeForm';
import { Confirmation } from './confirmation';

import axios from 'axios';

export const Main = (props) => {
    const [selectedType, setSelectedType] = useState('');
    const [peopleAmount, setPeopleAmount] = useState(0);
    const [selectedDate, setSelectedDate] = useState(null)
    const [selectedTime, setSelectedTime] = useState(null)
    const availableTypes = [
      'Breakfast',
      'Lunch',
      'Dinner'
    ]
    const { pathname } = useLocation();
    const { restaurantId } = useParams();
    console.log(pathname)
    console.log(props.elementToRender)

    return (
      <div>
        <Header RestaurantName="Sakanaya" />
        <main style={{display: 'flex', width: '100%', height: '100%'}}>
          <div className='restaurantImage' style={{ padding: '50px 0px 50px 80px'}}>
            <img src={japaneseRestaurant} width={450} height={600} alt='Restaurant' />
          </div>
          <div className='bookingForm' style={{width: '100%', textAlign: 'center'}}>
            <NavBar 
              selectedType={selectedType}
              peopleAmount={peopleAmount}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
            />
            {
              props.elementToRender === 'type' ? <TypeForm AvailableTypes={availableTypes} setSelectedType={setSelectedType} setElementToRender={props.setElementToRender} /> :
              props.elementToRender === 'people' ? <PeopleForm peopleAmount={peopleAmount} setPeopleAmount={setPeopleAmount} setElementToRender={props.setElementToRender} /> :
              props.elementToRender === 'date' ? <DateForm selectedDate={selectedDate} setSelectedDate={setSelectedDate} setElementToRender={props.setElementToRender} /> :
              props.elementToRender === 'time' ? <TimeForm openingTime={11} closingTime={20} selectedTime={selectedTime} setSelectedTime={setSelectedTime} setElementToRender={props.setElementToRender} /> :
              <Confirmation 
                  selectedType={selectedType}   
                  selectedTime={selectedTime} 
                  peopleAmount={peopleAmount}
                  selectedDate={selectedDate}
              />
            }
          </div>
        </main>

      </div>
    )
}