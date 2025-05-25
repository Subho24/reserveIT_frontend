import { Box, width } from "@mui/system"
import { Header, PhoneHeader } from "../components/Header"
import { Footer } from "../components/Footer"
import { BookingList } from "../components/BookingsList"
import { useNavigate, useParams } from "react-router-dom"
import { CalendarWrapper } from "../components/calendar"
import { useState } from "react"

export const DailyBookings = (props) => {    
    const [bookings, setBookings] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    return (
        <>
            {
                window.outerWidth < 500 ? 
                <PhoneHeader/>
                :
                <Header/>
            }
            {/* <Header /> */}
            <Box style={{margin: '50px 20px', width: "100%"}} >
                <CalendarWrapper setSelectedDate={setSelectedDate} setBookings={setBookings} />
                <BookingList selectedDate={selectedDate} bookings={bookings} token={props.token}  />
            </Box>
        </>

    )
}