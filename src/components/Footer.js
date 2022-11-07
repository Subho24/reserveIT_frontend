import { Box } from "@mui/system"
import { BiPhone } from "react-icons/bi"
import { GoMail, GoLocation } from 'react-icons/go'


const footerStyle = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'black', 
    height: 200, 
    color: 'white',
    fontSize: 15,
}

export const Footer = () => {
    return (
        <Box className='footer' style={footerStyle} >
            <BiPhone style={{margin: 5}}/> +46 76 304 5060
            <GoMail style={{margin: 5}} /> subhojitan@gmail.com
            <GoLocation style={{margin: 5}} /> Gånglåtsvägen 3G <br/> 215 78 Malmö 
        </Box>
    )
}