import { Box } from "@mui/system"
import { TextField } from "@mui/material"
import { Checkbox, FormControl, FormControlLabel, Modal } from "@mui/material"
import { useState } from "react"
import axios from "../axios"
import { useParams } from "react-router-dom"
import { BsCheckCircle } from 'react-icons/bs'
import { BiError } from 'react-icons/bi'
import validator from "validator"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const buttonStyle = {
    padding: 0
}

export const Confirmation = (props) => {
    const { companyId } = useParams();
    const [bookingStatus, setBookingStatus ] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [customerName, setCustomerName] = useState(null);
    const [customerPhone, setCustomerPhone] = useState(null);
    const [customerEmail, setCustomerEmail] = useState(null);
    const [customerComments, setCustomerComments] = useState(null);
    const [timeLenthAgreed, setTimeLengthAgreed] = useState(false);
    const [countryCode, setCountryCode] = useState();

    let inputStyle = {
        width: '100%',
        height: '55px',
        backgroundColor: '#f0f0f0',
        borderBottom: customerPhone ? 'none' : '1px solid #d6413f'
    }

    const validateCustomerInfo = () => {
        props.setBookingStatus('await');
        console.log(customerName, customerPhone, customerEmail, timeLenthAgreed, countryCode)       
        if(!customerName || !customerPhone || !customerEmail || !timeLenthAgreed) {
            alert('Vänligen fyll i fälten markerade med *')
            return
        } else {
            if(!validator.isMobilePhone(customerPhone, countryCode)) {
                alert('Ange ett giltigt telefonnummer')
                return
            }
            if(!validator.isEmail(customerEmail)) {
                alert('Ogiltig Mejl')
                return
            }
            submitData();
        }
    }

    const toggleTimeAgreement = () => {
        !timeLenthAgreed ? setTimeLengthAgreed(true) : setTimeLengthAgreed(false);
    }

    const submitData = () => {
        axios.post('/api/bookings', {
            "company_id": companyId,
            "booking_type": props.selectedType,
            "booking_date": props.selectedDate,
            "booking_time": props.selectedTime,
            "booking_comments": customerComments,
            "number_of_people": props.peopleAmount,
            "customer_name": customerName,
            "customer_mobile": customerPhone,
            "customer_email": customerEmail
        }).then(res => {
            console.log(res.data)
            props.setBookingStatus('success')
        }).catch(err => {
            console.log(err);
            props.setBookingStatus('error')
        })
    }

    const closeModal = () => {
        setModalOpen(false)
        props.setStepCount(1)
        window.location.reload();
    }

    const handleCountryCode = (country) => {
        switch(country) {
            case 'se':
                setCountryCode(['sv-SE']);
                break;
            case 'dk':
                setCountryCode(['da-DK']);
                break;
            case 'pl':
                setCountryCode(['pl-PL']);
        }
    }

    const modalContent = bookingStatus === 'success' ?
    (
        <div className="modal">
            <h1>Booking confirmed</h1>
            <BsCheckCircle style={{
                fontSize: 50,
                color: 'green',
                margin: 'auto'
            }} />
            <button className="bttn" style={{margin: '60px auto 60px auto'}} onClick={closeModal} >Okay</button>
        </div>
    ) : (
        <div className="modal">
            <h1>Error!!</h1>
            <h3>Something went wrong!!</h3>
            <h3>Please try again later</h3>
            <BiError style={{
                fontSize: 50,
                color: 'red',
                margin: 'auto'
            }} />
            <button className="bttn" style={{margin: '60px auto 60px auto'}} onClick={closeModal} >Close</button>
        </div>
    )

    return (
        <div>
            {/* <div className="detailsContainer" >
                <p className="confirmType" >Typ: {props.selectedType} </p>
                <p className="confirmPeople" >Antal personer: {props.peopleAmount} </p>
                <p className="confirmDate" >Datum: {props.selectedDate} </p>
                <p className="confirmTime" >Tid: {props.selectedTime} </p>
            </div> */}
            <Box sx={{p: '0px 5% 5% 5%'}}  >
                <div style={{display: "flex", flexWrap: 'wrap'}}>     
                    <TextField id="filled-basic" type={"text"} label="Namn" variant="filled" 
                        required={true}
                        error={customerName === null ? true : false}
                        sx={{ m: 1, flexGrow: 1}}
                        onChange={({target}) => setCustomerName(target.value) }
                    />
                    {/* <TextField id="filled-basic" type={"tel"} label="Mobile" variant="filled"
                        required={true}
                        error={customerPhone === null ? true : false}
                        sx={{m: 1, flexGrow: 1}}
                        onChange={({target}) => setCustomerPhone(target.value)}
                    /> */}
                    <PhoneInput
                        country={'se'}
                        value={customerPhone}
                        containerClass="phoneContainer"
                        inputClass="phoneInput"
                        inputStyle={inputStyle}
                        onChange={(phone, country) => {
                            if(country.countryCode === 'se') {
                                if(phone[2] === '0') phone = '46'
                                console.log(phone)
                            }
                            setCustomerPhone(phone)
                            handleCountryCode(country.countryCode)
                        }}
                    />
                    <TextField id="filled-basic" type={"email"} label="Mejl" variant="filled" 
                        required={true}
                        error={customerEmail === null || !validator.isEmail(customerEmail) ? true : false}
                        sx={{ m: 1, width: 1}}
                        onChange={({target}) => setCustomerEmail(target.value)}
                    />
                    <TextField id="filled-basic" type={"text"} label="Meddelande" variant="filled" multiline maxRows={3} minRows={2}
                        sx={{ m: 1, width: 1}}
                        onChange={({target}) => setCustomerComments(target.value)}
                    />
                    <FormControl>
                        <FormControlLabel control={<Checkbox onClick={toggleTimeAgreement} required={true} />} label="Jag bekräftar bokningen och att informationen jag lämnat är korrekt." sx={{m: 1}}  />
                    </FormControl>
                </div>
                <input type='submit' className='bttn' value={'Boka'} disabled={props.bookingStatus === 'await' ? true : false } onClick={validateCustomerInfo}/>
                <Modal open={modalOpen} >
                    {modalContent}
                </Modal>
            </Box>
        </div>
    )
}