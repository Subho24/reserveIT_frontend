import { Box } from "@mui/system"
import { BiPhone } from "react-icons/bi"
import { GoMail, GoLocation } from 'react-icons/go'


const footerStyle = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'black', 
    height: '120px',
    color: 'white',
    fontSize: 15,
}

export const Footer = () => {
    return (
        <Box className='footer' style={footerStyle} >
            <span>
                <BiPhone style={{margin: 5}}/> +46 76 304 5060
            </span>
            <span>
                <GoMail style={{margin: 5}} /> subhojitan@gmail.com
            </span>
            <span>
                <GoLocation style={{margin: 5}} /> Gånglåtsvägen 3G <br/> 215 78 Malmö 
            </span>
        </Box>
    )
}