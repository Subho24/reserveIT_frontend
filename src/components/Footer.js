import { Box } from "@mui/system"
import { BiPhone } from "react-icons/bi"
import { GoMail, GoLocation } from 'react-icons/go'


const footerStyle = {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#061A40', 
    height: '80px',
    color: 'white',
    fontSize: 10,
}

export const Footer = () => {
    return (
        <Box className='footer' style={footerStyle} >
            <span>
                <BiPhone style={{marginTop: 10}}/> +46 76 304 5060
            </span>
            <span>
                <GoMail style={{marginTop: 10}} /> subhojitan@gmail.com
            </span>
            <span>
                <GoLocation style={{marginTop: 10}} /> Gånglåtsvägen 3G <br/> 215 78 Malmö 
            </span>
        </Box>
    )
}