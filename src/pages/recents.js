import { Box } from "@mui/system"
import axios from "../axios"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { RecentBookingsList } from "../components/recentBookings"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

export const Recents = (props) => {    
    const [bookings, setBookings] = useState([]);
    const [token, setToken] = useState(sessionStorage.getItem('accessToken'))
    const { companyId } = useParams();
    const redirect = useNavigate();

    useEffect(() => {
        axios.get(`/api/bookings/${companyId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((res) => {
            console.log(res.data);
            setBookings(res.data.reverse());
        })
        .catch((err) => {
            console.log(err);
            if(err.response.status === 403) {
                redirect('/login');
            }
        })
    }, [])

    return (
        <>
            <Header />
            <Box style={{margin: '0px 20px 0 20px'}} >
                <RecentBookingsList bookings={bookings} />
            </Box>
            <Footer />
        </>

    )
}