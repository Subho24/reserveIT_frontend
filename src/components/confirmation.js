import { Box } from "@mui/system"
import { TextField } from "@mui/material"
import { Checkbox, FormControl, FormControlLabel } from "@mui/material"
import { useState } from "react"

export const Confirmation = (props) => {
    const [customerName, setCustomerName] = useState(null);
    const [customerPhone, setCustomerPhone] = useState(null);
    const [customerEmail, setCustomerEmail] = useState(null);
    const [customerComments, setCustomerComments] = useState(null);
    const [timeLenthAgreed, setTimeLengthAgreed] = useState(false);

    const toggleTimeAgreement = () => {
        console.log(timeLenthAgreed);
        !timeLenthAgreed ? setTimeLengthAgreed(true) : setTimeLengthAgreed(false);
    }

    return (
        <div>
            <div className="detailsContainer" >
                <p className="confirmType" >Type: {props.selectedType} </p>
                <p className="confirmPeople" >Number of people: {props.peopleAmount} </p>
                <p className="confirmDate" >Date: {props.selectedDate} </p>
                <p className="confirmTime" >Time: {props.selectedTime} </p>
            </div>
            <Box sx={{p: '0px 100px 100px 100px'}}  >
                <div style={{display: "flex", flexWrap: 'wrap'}}>     
                    <TextField id="filled-basic" type={"text"} label="Full Name" variant="filled" 
                        sx={{ m: 1, flexGrow: 1}}
                        onChange={({target}) => setCustomerName(target.value) }
                    />
                    <TextField id="filled-basic" type={"tel"} label="Mobile" variant="filled"
                        sx={{m: 1, flexGrow: 1}}
                        onChange={({target}) => setCustomerPhone(target.value)}
                    />
                    <TextField id="filled-basic" type={"email"} label="Email" variant="filled" 
                        sx={{ m: 1, width: 1}}
                        onChange={({target}) => setCustomerEmail(target.value)}
                    />
                    <TextField id="filled-basic" type={"text"} label="Comments" variant="filled" multiline maxRows={3} minRows={2}
                        sx={{ m: 1, width: 1}}
                        onChange={({target}) => setCustomerComments(target.value)}
                    />
                    <FormControl>
                        <FormControlLabel control={<Checkbox onChange={() => toggleTimeAgreement()}/>} label="I understand that the booking is for 1 hour" sx={{m: 1}} />
                    </FormControl>
                </div>
                <input type='submit' className='Next' value={'Book'} onClick={() => {
                    console.log({
                        customerName: customerName,
                        customerPhone: customerPhone,
                        customerEmail: customerEmail,
                        customerComments: customerComments,
                        selectedType: props.selectedType,
                        peopleAmount: props.peopleAmount,
                        selectedTime: props.selectedTime,
                        selectedDate: props.selectedDate,
                        timeLenthAgreed: timeLenthAgreed
                    })
                }}/>
            </Box>
            {/* <div className="customerDetails">
                    <input id="firstName" placeholder="First Name" type={"text"} style={{fontSize: '1em', width: 150, gridArea: 'firstName'}} />
                    <input id="lastName" placeholder="Last Name" type={"text"} style={{fontSize: '1em', width: 150, gridArea: 'lastName'}} />
                    <input id="email" placeholder="Email" type={"email"} style={{fontSize: '1em', width: 150, gridArea: 'email'}} />
                    <input id="phoneNumber" placeholder="Mobiles" type={"tel"} style={{fontSize: '1em', width: 150, gridArea: 'phone'}} />
            </div> */}
        </div>
    )
}