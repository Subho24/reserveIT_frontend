import { Box } from "@mui/system";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import axios from "../axios";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PunchesList } from "../components/punchesList";


export const Punches = (props) => {
    const [punches, setPunches] = useState([]);

    const { companyId } = useParams()
    
    useEffect(() => {
        axios.get(`/api/employee_punches/all/company/${companyId}`)
        .then(res => {
            setPunches(res.data.reverse());
        })
        .catch(err => {
            console.log(err)
        })
    }, [])
    
    
    return (
        <>
            <Header/>
            <Box style={{margin: '0px 20px 0 20px', textAlign: 'center'}}>
                <PunchesList punches={punches} />
            </Box>
            <Footer/>
        </>
    )
} 