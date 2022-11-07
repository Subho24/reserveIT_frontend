import { Box } from "@mui/system"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { BookingList } from "../components/BookingsList"

export const Home = (props) => {    

    return (
        <>
            <Header />
            <Box style={{minHeight: '100vh', margin: '0px 20px 0 20px'}} >
                <BookingList token={props.token} />
            </Box>
            <Footer />
        </>

    )
}