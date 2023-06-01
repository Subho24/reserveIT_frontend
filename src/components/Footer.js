import { Box } from "@mui/system"
import { BiPhone } from "react-icons/bi"
import { GoMail, GoLocation, GoMailRead } from 'react-icons/go'



export const Footer = () => {
    return (
        <Box className='footer'>
            <span>
                <BiPhone/> +46 76 304 5060
            </span>
            <span>
                <GoMailRead/> subhojitan@gmail.com
            </span>
            <span>
                <GoLocation/> Gånglåtsvägen 3G <br/> 215 78 Malmö 
            </span>
        </Box>
    )
}