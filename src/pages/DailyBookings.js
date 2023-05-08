import { Box } from "@mui/system"
import { Header } from "../components/Header"
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
            <Header />
            <Box style={{margin: '0px 20px 0 20px'}} >
                <CalendarWrapper setSelectedDate={setSelectedDate} setBookings={setBookings} />
                <BookingList selectedDate={selectedDate} bookings={bookings} token={props.token}  />
            </Box>
            <Footer />
        </>

    )
}