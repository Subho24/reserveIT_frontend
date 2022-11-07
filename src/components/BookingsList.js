import axios from "../axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingVisual } from "./Loading";
import { FaRegClock } from 'react-icons/fa'
import { MdOutlinePeopleOutline } from 'react-icons/md'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { Modal } from "@mui/material";


export const BookingList = (props) => {
    const { companyId } = useParams();
    const [lunchBookings, setLunchBookings] = useState(null);
    const [brunchBookings, setBrunchBookings] = useState(null);
    const [customerInfo, setCustoemrInfo] = useState(null);
    const [modalOpen, setModalOpen] = useState(false)
    const [datesArray, setDatesArray] = useState(null)
    const [loadMoreClicked, setLoadMoreClicked] = useState(0);
    const [token, setToken] = useState(sessionStorage.getItem('accessToken'))

    const nav = useNavigate();
    let currDate = new Date();
    let test = []

    for(let i = 0; i < 5; i++) {
        const formatedDate = `${currDate.getFullYear()}-${currDate.getMonth() + 1}-${currDate.getDate() < 10 ? '0' + currDate.getDate() : currDate.getDate() }`
        test.push(formatedDate)
        currDate.setDate(currDate.getDate() + 1)
    }

    useEffect(() => {
        setDatesArray(test);
    }, []);

    const handleLoadMoreClick = (datesArr) => {
        setLoadMoreClicked(loadMoreClicked + 1)
        const lastDate = datesArr[datesArray.length - 1]
        const newDate = new Date(lastDate);
        newDate.setDate(newDate.getDate() + 1);
        let newDatesArray = [];

        for(let i = 0; i < 5; i++) {
            const formatedDate = `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate()}`
            newDatesArray.push(formatedDate)
            newDate.setDate(newDate.getDate() + 1)
        }
        setDatesArray(newDatesArray);

    }
    const handleGoBackClick = (datesArr) => {
        setLoadMoreClicked(loadMoreClicked - 1)
        const lastDate = datesArr[0]
        const newDate = new Date(lastDate);
        newDate.setDate(newDate.getDate() - 5);
        let newDatesArray = [];

        for(let i = 0; i < 5; i++) {
            const formatedDate = `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate()}`
            newDatesArray.push(formatedDate)
            newDate.setDate(newDate.getDate() + 1)
        }
        setDatesArray(newDatesArray);

    }

    useEffect(() => {
        axios.get(`/api/bookings/${companyId}/?custom=booking_type&for="Lunch"`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((res) => {
            setLunchBookings(res.data)
        })
        .catch((err) => {
            console.log(err)
            if(err.response.status === 403) {
                nav('/login');
            }
            setLunchBookings(null);
        });

        axios.get(`/api/bookings/${companyId}/?custom=booking_type&for="brunch"`, {
            headers: { 
                'Authorization': `Bearer ${token}`
            }
        })
        .then((res) => {
            setBrunchBookings(res.data)
        })
        .catch((err) => {
            console.log(err)
            if(err.response.status === 403) {
                nav('/login');
            }
            setBrunchBookings(null);
        });
    }, [])

    const handleCustomerInfoClick = (booking) => {
        setCustoemrInfo({
            customer_name: booking.customer_name,
            customer_mobile: booking.customer_mobile,
            customer_email: booking.customer_email
        });
        setModalOpen(true);
    }


    const listStyles = {
        display: 'flex',
        gap: 50
    }

    const modalContent = (
        <div className="confirmModal" style={{
            position: 'absolute',
            width: 400,
            top: '40%',
            left: '35%',
            textAlign: 'center',
            backgroundColor: 'whitesmoke',
            borderRadius: 30
        }}>
            <AiOutlineCloseCircle onClick={() => setModalOpen(false)} style={{float: 'right', padding: 10}} />
            <h1>Customer Details</h1>
            <ul>
                {
                    customerInfo !== null ? (
                        <li style={{display: 'inline-flex', flexWrap: 'wrap'}}>
                            <h3>Customer Name: {customerInfo.customer_name}</h3>
                            <h3>Customer Mobile: {customerInfo.customer_mobile}</h3>
                            <h3>Customer Email: {customerInfo.customer_email}</h3>
                        </li>
                    ) : <p>----</p>
                }
            </ul> 
        </div>
    )

    if(lunchBookings !== null && brunchBookings !== null) {
        return (
            <>
            <div style={{display: 'flex', flexDirection: 'column'}} >
                <div>
                    <button onClick={() => handleGoBackClick(datesArray)} >Previous Days</button>

                    {
                        datesArray.map((date) => {
                            return(
                                <div>
                                    <h1 style={{border: '1px solid black', borderRadius: 10, width: '20%', minWidth: 200, textAlign: 'center'}}>{date}</h1>
                                    <h3>Lunch</h3>
                                    <ul>
                                        {
                                            lunchBookings.map((booking) => {
                                                return(
                                                    booking.booking_date === date ? (
                                                        <li>
                                                            <div style={listStyles} >
                                                                <h4><FaRegClock/> {booking.booking_time}</h4>
                                                                <h4 style={{border: '1px solid black', borderRadius: 5, minWidth: 100, width: '15%', textAlign: 'center'}} onClick={() => handleCustomerInfoClick(booking)} >{booking.customer_name}</h4>
                                                                <h4><MdOutlinePeopleOutline/> {booking.number_of_people}</h4>
                                                            </div>
                                                        </li>
                                                    ) : null
                                                )
                                            })
                                        }
                                    </ul>
                                    <h3>Brunch</h3>
                                    <ul>
                                        {
                                            brunchBookings.map((booking) => {
                                                return(
                                                    booking.booking_date === date ? (
                                                        <li>
                                                            <div style={listStyles} >
                                                                <h4><FaRegClock/> {booking.booking_time}</h4>
                                                                <h4 style={{border: '1px solid black', borderRadius: 5, width: '15%', textAlign: 'center'}} onClick={() => handleCustomerInfoClick(booking)} >{booking.customer_name}</h4>
                                                                <h4><MdOutlinePeopleOutline/> {booking.number_of_people}</h4>
                                                            </div>
                                                        </li>
                                                    ) : null
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            )
                        })
                    }
                    <button onClick={() => handleLoadMoreClick(datesArray)} >Load More</button>
                    <Modal open={modalOpen}>
                        {modalContent}
                    </Modal>
                </div>
            </div>
            </>
        )
    } else {
        return <LoadingVisual/>
    }

}