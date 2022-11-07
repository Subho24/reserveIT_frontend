import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';
import axios from '../axios';
import { useEffect } from 'react';

export const Loading = (props) => {
    const { companyId } = useParams();

    var config = {
        method: 'get',
        url: 'http://localhost:4000/api/companies/2',
        headers: { 
          'Content-Type': 'application/json'
        }
    };

    useEffect(() => {
        axios.get('/api/companies/2').then(response => {
            props.setCompanyInfo(response.data[0]);
        })
    }, [])

    return (
        <div style={{width: '100%', height: '100%', textAlign: 'center', marginTop: '25%'}}>
            <CircularProgress />
        </div>
    );
}

export const LoadingVisual = () => {
    return (
        <div style={{width: '100%', height: '100%', textAlign: 'center', marginTop: '25%'}}>
            <CircularProgress />
        </div>
    );
}