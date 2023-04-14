import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useNavigate, useParams } from "react-router-dom";
import axios from "../axios";

export const CalendarWrapper = (props) => {
    const { companyId } = useParams();
    const nav = useNavigate();
    const [token, setToken] = useState(sessionStorage.getItem('accessToken'))

    const [currDate, setCurrDate] = useState(new Date());

    const handleChange = (value) => {
        console.log('working')
        console.log(value);
        setCurrDate(value);
        props.setSelectedDate(`${currDate.getFullYear()}-${currDate.getMonth() + 1}-${currDate.getDate()}`)
    }

    useEffect(() => {
        console.log(currDate)
        axios.get(`/api/bookings/${companyId}/?custom=booking_date&for="${currDate.getFullYear()}-${currDate.getMonth() + 1 >= 10 ? '' : '0'}${currDate.getMonth() + 1}-${currDate.getDate() >= 10 ? '' : '0'}${currDate.getDate()}"`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((res) => {
            console.log(res.data)
            props.setBookings(res.data)
        })
        .catch((err) => {
            console.log(err)
            if(err.response.status === 403) {
                nav('/login');
            }
        });
    }, [currDate])

    return(
        <Calendar 
            value={currDate}
            onChange={handleChange} 
        />
    )
}