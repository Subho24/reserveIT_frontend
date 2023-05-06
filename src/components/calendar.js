import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { BsDot } from 'react-icons/bs'
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useNavigate, useParams } from "react-router-dom";
import axios from "../axios";

export const CalendarWrapper = (props) => {
    const { companyId } = useParams();
    const nav = useNavigate();
    const [token, setToken] = useState(sessionStorage.getItem('accessToken'))

    const [currDate, setCurrDate] = useState(new Date());
    const [allBookings, setAllbookings] = useState([]);

    const handleChange = (value) => {
        setCurrDate(value);
        props.setSelectedDate(`${currDate.getFullYear()}-${currDate.getMonth() + 1}-${currDate.getDate()}`)
    }

    useEffect(() => {
        axios.get(`/api/bookings/${companyId}/?custom=booking_date&for="${currDate.getFullYear()}-${currDate.getMonth() + 1 >= 10 ? '' : '0'}${currDate.getMonth() + 1}-${currDate.getDate() >= 10 ? '' : '0'}${currDate.getDate()}"`, {
        // axios.get(`/api/bookings/${companyId}/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((res) => {
            props.setBookings(res.data)
        })
        .catch((err) => {
            console.log(err)
            if(err.response.status === 403) {
                nav('/login');
            }
        });
    }, [currDate])

    useEffect(() => {
        axios.get(`/api/bookings/${companyId}/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((res) => {
            setAllbookings(res.data)
        })
        .catch((err) => {
            console.log(err)
            if(err.response.status === 403) {
                nav('/login');
            }
        });
    }, [companyId, nav, token])

    const bookingAvailable = (date) => {
        if (allBookings.length > 1) {
          for (let i = 0; i < allBookings.length; i++) {
            if(allBookings[i].booking_date === date) {
              return true;
            }
          }
        }
        return false;
    };


    const calendar = 
    <Calendar 
        value={currDate}
        onChange={handleChange} 
        tileContent=''             
        tileClassName={({ date }) => {
            const formatedDate = `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? 0 : ''}${date.getMonth() + 1}-${date.getDate() + 1 <= 10 ? 0 : ''}${date.getDate()}`;

            if(bookingAvailable(formatedDate)) {
              return 'bookingAvailable';
            } else {
              return null;
            }
        }}              
    />


    return(
        allBookings.length > 1 ? calendar : null
    )
}