import { Box } from "@mui/system"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { BookingList } from "../components/BookingsList"
import { useNavigate } from "react-router-dom"

export const Home = (props) => {    

    const redirect = useNavigate();

    return (
        <>
            <Header />
            <Box style={{minHeight: '100vh', margin: '0px 20px 0 20px'}} >
                <BookingList token={props.token} userId={props.userId} />
                <button onClick={() => redirect('/book/2')} >Visit site</button>
            </Box>
            <Footer />
        </>

    )
}