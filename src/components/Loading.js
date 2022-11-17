import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';
import axios from '../axios';
import { useEffect } from 'react';

export const Loading = (props) => {
    const { companyId } = useParams();

    useEffect(() => {
        axios.get(`/api/companies/companyBookingInfo/${companyId}`).then(response => {
            const availableTypes = response.data.bookingInfo.map(info => {
                return info.booking_type
            })
            props.setCompanyInfo(response.data.companyInfo)
            props.setBookingInfo(response.data.bookingInfo)
            props.setAvailableTypes(availableTypes);
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