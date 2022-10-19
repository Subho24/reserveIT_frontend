import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

export const Loading = (props) => {
    const { companyId } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:4000/api/companies/${companyId}`).then(response => {
            console.log(response.data[0])
            props.setCompanyInfo(response.data[0]);
        })
    }, [])

    return (
        <div style={{width: '100%', height: '100%', textAlign: 'center', marginTop: '25%'}}>
            <CircularProgress />
        </div>
    );
}