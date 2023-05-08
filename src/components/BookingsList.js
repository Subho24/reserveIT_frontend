import axios from "../axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { BiCommentCheck } from 'react-icons/bi'
import { BsCheckCircle } from "react-icons/bs";
import { BiError } from 'react-icons/bi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { RiEdit2Line } from 'react-icons/ri'
import { Box, Modal, Card, CardContent } from "@mui/material";


export const BookingList = (props) => {
    const { companyId } = useParams();
    const [customerInfo, setCustomerInfo] = useState(null);
    const [modalOpen, setModalOpen] = useState(false)
    const [modalView, setModalView] = useState(null)
    const token = props.token;


    const countCustomers = (bookings) => {
        let totalCustomers = 0;

        for(let i=0; i<props.bookings.length; i++) {
            totalCustomers += bookings[i].number_of_people
        }

        return totalCustomers;
    }

    const handleChange = (field, newValue) => {
        setCustomerInfo(prevState => ({
          ...prevState,
          [field]: newValue
        }));
      };
      

    const handleCustomerInfoClick = (booking) => {
        let date, time;
        if(booking.booked_time) {
            date = booking.booked_time.split('T')[0]
            time = `${new Date(booking.booked_time).getHours()}:${new Date(booking.booked_time).getMinutes() < 10 ? 0 : ''}${new Date(booking.booked_time).getMinutes()}`
        }
        setCustomerInfo({
            customer_name: booking.customer_name,
            customer_mobile: booking.customer_mobile,
            customer_email: booking.customer_email,
            booking_comments: booking.booking_comments,
            booking_time: booking.booking_time,
            booked_time: !booking.booked_time ? '----' : `${date} || ${time}`,
            booking_date: booking.booking_date,
            booking_id: booking.booking_id,
            booking_type: booking.booking_type,
            number_of_people: booking.number_of_people
        });
        setModalView('customerInfo');
        setModalOpen(true);
    }

    const handleDelete = (bookingId) => {
        axios.delete(`/api/bookings/${companyId}/?booking_id=${bookingId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((res) => {
            setModalView('deleteSuccessful')
        })
        .catch((err) => {
            console.log(err.message)
            setModalView('deleteError')
        })
    }


    const saveChanges = (bookingId) => { //This function saves all the changes made for the particular booking.
        axios.patch(`/api/bookings/${companyId}/?booking_id=${bookingId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: {
                booking_type: customerInfo.booking_type,
                number_of_people: customerInfo.number_of_people,
                booking_date: customerInfo.booking_date,
                booking_time: customerInfo.booking_time
            }
        })
        .then((res) => {
            setModalView('editSuccessful')
        })
        .catch((err) => {
            console.log(err.message)
            setModalView('editError')
        })
    }


    const modalContent = modalView === 'customerInfo' ?
    (
        <div className="modal">
            <AiOutlineCloseCircle onClick={() => setModalOpen(false)} style={{float: 'right', padding: 10}} />
            {
                customerInfo !== null ? (
                    <span style={{float: 'right', padding: 10, fontWeight: 'bolder', color: 'darkgray'}} >Received: {customerInfo.booked_time}</span>
                )
                :
                <span>----</span>

            }
            <h1>Customer Details</h1>
            <ul style={{listStyle: 'none', textAlign: 'left', padding: '10px'}}>
                {
                    customerInfo !== null ? (
                        <>
                            <li>
                                <h3><span style={{color: 'red'}}>Customer Name</span>: {customerInfo.customer_name}</h3>
                            </li>
                            <li>
                                <h3><span style={{color: 'red'}}>Customer Mobile</span>: {customerInfo.customer_mobile}</h3>
                            </li>
                            <li>
                                <h3><span style={{color: 'red'}}>Customer Email</span>: {customerInfo.customer_email}</h3>
                            </li>
                            <li>
                                <h3><span style={{color: 'red'}}>Booking Time</span>: {customerInfo.booking_time}</h3>
                            </li>
                            <li>
                                <h3><span style={{color: 'red'}}>Booking Date</span>: {customerInfo.booking_date}</h3>
                            </li>
                            <li>
                                <h3><span style={{color: 'red'}}>Comments</span>: {customerInfo.booking_comments ? customerInfo.booking_comments : '----'}</h3>
                            </li>
                        </>
                    ) : <p>----</p>
                }
            </ul> 
        </div>
    )
    : modalView === 'deleteReservation' ?
    (
        <div className="modal" style={{width: '80%', height: 'auto'}}>
            <AiOutlineCloseCircle onClick={() => setModalOpen(false)} style={{float: 'right', padding: 10}} />
            <div style={{marginBottom: '10%'}}>
                <h1>Cancel Reservation?</h1>
                <h3> 
                    Cancel reservation for <span style={{color: 'red'}}>{customerInfo.customer_name}</span> 
                    <br/>
                    on <span style={{color: 'red'}}>{customerInfo.booking_date}</span> 
                    <br/>
                    at <span style={{color: 'red'}}>{customerInfo.booking_time}</span>
                </h3>
            </div>
            <div>
                <button className="bttn warn" style={{margin: 10}} onClick={() => handleDelete(customerInfo.booking_id)}>Confirm</button>
                <button className="bttn" style={{margin: 10}} onClick={() => setModalOpen(false)}>Cancel</button>
            </div>
        </div>
    )
    : modalView === 'deleteSuccessful' || modalView === 'deleteError' ?
    (
        <div className="modal" style={{width: '80%', height: 'auto'}}>
            <AiOutlineCloseCircle onClick={() => setModalOpen(false)} style={{float: 'right', padding: 10}} />
            <div style={{marginBottom: '10%'}}>
                {
                    modalView === 'deleteSuccessful' ?
                    (
                        <>
                            <h1>Deleted</h1>
                            <BsCheckCircle style={{
                                fontSize: 50,
                                color: 'green',
                                margin: 'auto'
                            }} />
                        </>
                    )
                    : modalView === 'deleteError' ?
                    (
                        <>
                            <h1>Error</h1>
                            <BiError style={{
                                fontSize: 50,
                                color: 'red',
                                margin: 'auto'
                            }} />
                        </>
                    ) : null
                }
            </div>
            <div>
                <button className="bttn" style={{margin: 10}} onClick={() => window.location.reload()}>Okay</button>
            </div>
        </div>
    ) 
    : modalView === 'editReservation' ?
    (
        <div className="modal" style={{width: '80%', height: 'auto'}}>
            <AiOutlineCloseCircle onClick={() => setModalOpen(false)} style={{float: 'right', padding: 10}} />
            <div style={{textAlign: 'center'}}>
                <input style={{width: '60%', height: 25, marginBottom: 15}} onChange={({ target }) => handleChange('booking_type', target.value)} value={customerInfo.booking_type} type={'text'} />
                <input style={{width: '60%', height: 25, marginBottom: 15}} onChange={({ target }) => handleChange('number_of_people', target.value)} value={customerInfo.number_of_people} type={'number'} />
                <input style={{width: '60%', height: 25, marginBottom: 15}} onChange={({ target }) => handleChange('booking_date', target.value)} value={customerInfo.booking_date} type={'date'} />
                <input style={{width: '60%', height: 25, marginBottom: 15}} onChange={({ target }) => handleChange('booking_time', target.value)} value={customerInfo.booking_time} type={'time'} />
            </div>
            <div>
                <button className="bttn warn" style={{margin: 10}} onClick={() => saveChanges(customerInfo.booking_id)}>Save</button>
                <button className="bttn" style={{margin: 10}} onClick={() => setModalOpen(false)}>Cancel</button>
            </div>
        </div>
    )
    :  modalView === 'editSuccessful' || modalView === 'editError' ?
    (
        <div className="modal" style={{width: '80%', height: 'auto'}}>
            <AiOutlineCloseCircle onClick={() => setModalOpen(false)} style={{float: 'right', padding: 10}} />
            <div style={{marginBottom: '10%'}}>
                {
                    modalView === 'editSuccessful' ?
                    (
                        <>
                            <h1>Saved</h1>
                            <BsCheckCircle style={{
                                fontSize: 50,
                                color: 'green',
                                margin: 'auto'
                            }} />
                        </>
                    )
                    : modalView === 'editError' ?
                    (
                        <>
                            <h1>Error</h1>
                            <BiError style={{
                                fontSize: 50,
                                color: 'red',
                                margin: 'auto'
                            }} />
                        </>
                    ) : null
                }
            </div>
            <div>
                <button className="bttn" style={{margin: 10}} onClick={() => window.location.reload()}>Okay</button>
            </div>
        </div>
    )
    : 
    (<div></div>)

    const summaryStyle = {
        width: '75%',
        border: '0px solid black',
        margin: '10px auto 0px auto',
        boxShadow: '5px 3px 5px dimgrey',
        borderRadius: '5px',
        fontWeight: 'bolder',
        height: '25px',
        background: 'aliceblue'
    }

    const typeStyle = {
        border: '0px solid black',
        padding: 2,
        boxShadow: '0px 2px 1px dimgrey',
        borderRadius: '5px',
        background: 'aliceblue',
        float: 'right'
    }

    const nameStyle = {
        border: '0px solid black',
        padding: 2,
        boxShadow: '0px 2px 1px dimgrey',
        borderRadius: '5px',
        background: 'aliceblue',
        float: 'left',
        marginBottom: '10px'
    }

    if(props.bookings.length < 1) {
        return(
            <p style={{textAlign: 'center'}}>No bookings for today!</p>
        )
    } else {
        return (
            <>
                <Box>
                    <div style={summaryStyle}>{props.bookings.length} {props.bookings.length > 1 ? 'bookings' : 'booking'} {countCustomers(props.bookings)} {countCustomers(props.bookings) > 1 ? 'customers' : 'customer'}</div>
                    {props.bookings.map(booking => {
                        return(
                            <Card sx={{marginTop: 5}}>
                                <CardContent onClick={() => handleCustomerInfoClick(booking)}>
                                    <span style={{float: 'left'}}>{booking.booking_time}</span>
                                    <span style={typeStyle}>{booking.booking_type} </span>
                                    {
                                        booking.booking_comments ? <BiCommentCheck style={{float: 'right', padding: '3px 10px 0px 0px'}} /> : null
                                    }
                                    <br/>
                                    <br/>
                                    <span style={nameStyle}>{booking.customer_name}</span>
                                    <span style={{float: 'left', paddingTop: '4px', paddingLeft: '5px', color: 'red'}}>{booking.number_of_people} person</span>
                                    <span style={{float: 'right'}}>{booking.booking_date}</span>
                                    <br/>
                                    <br/>
                                </CardContent>
                                <div style={{textAlign: 'initial'}}>
                                    <button 
                                        style={{
                                            margin: 10,
                                            backgroundColor: 'darkred',
                                            color: "white",
                                            width: 80,
                                            height: 25,
                                            border: 'none',
                                            borderRadius: 10,
                                            boxShadow: 'dimgrey 0px 2px 1px',
                                            fontSize: '1.2em'
                                        }}
                                        onClick={() => {
                                            handleCustomerInfoClick(booking)
                                            setModalView('deleteReservation');
                                            setModalOpen(true); 
                                        }}
                                    >
                                        <RiDeleteBin6Line />
                                    </button>
                                    <button 
                                        style={{
                                            margin: 10,
                                            backgroundColor: 'black',
                                            color: "white",
                                            width: 80,
                                            height: 25,
                                            border: 'none',
                                            borderRadius: 10,
                                            boxShadow: 'dimgrey 0px 2px 1px',
                                            fontSize: '1.2em'
                                        }}
                                        onClick={() => {
                                            handleCustomerInfoClick(booking)
                                            setModalView('editReservation');
                                            setModalOpen(true); 
                                        }}
                                    >
                                        <RiEdit2Line />
                                    </button>
                                </div>
                            </Card>
                        )
                    })}
                    <Modal
                        open={modalOpen}
                    >
                        {modalContent}
                    </Modal>
                </Box>
            </>
        )
    }
}