import axios from "../axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { BsCheckCircle } from "react-icons/bs";
import { BiError } from 'react-icons/bi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { RiEdit2Line } from 'react-icons/ri'
import { Box, Modal, Card, CardContent } from "@mui/material";

export const PunchesList = (props) => {
    const [modalView, setModalView] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [punchData, setPunchData] = useState({})

    const formatDate = (date) => {
        const dateObj = new Date(date);
        const dateString = dateObj.toUTCString();
        const dateArr = dateString.split(' ');

        const formatedString = dateArr.slice(0, dateArr.length - 2).join(' ')
        
        return formatedString;
    }

    const handleChange = (field, newValue) => {
        setPunchData(prevState => ({
          ...prevState,
          [field]: newValue
        }));
      };

    const modalContent = modalView === 'editPunch' ? (
        <div className="modal" style={{width: '80%', height: 'auto'}}>
            <AiOutlineCloseCircle onClick={() => setModalOpen(false)} style={{float: 'right', padding: 10}} />
            <div style={{textAlign: 'center'}}>
                <input style={{width: '60%', height: 25, marginBottom: 15}} onChange={({ target }) => handleChange('punch_start_time', target.value)} value={punchData.punch_start_time} type={'time'} />
                <input style={{width: '60%', height: 25, marginBottom: 15}} onChange={({ target }) => handleChange('punch_end_time', target.value)} value={punchData.punch_end_time} type={'time'} />
            </div>
            <div>
                <button className="bttn warn" style={{margin: 10}} onClick={() => console.log(punchData)}>Save</button>
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
    <div>---</div>

    const styles = {
        nameStyle: {
            border: '0px solid black',
            padding: 2,
            boxShadow: '0px 2px 1px dimgrey',
            borderRadius: '5px',
            background: 'aliceblue',
            float: 'left',
            marginBottom: '10px'
        }
    }

    if(props.punches.length < 1) {
        return <h1>No punches!!</h1>
    }

    return (
        <Box style={{height: '80vh'}}>
            {props.punches.map(punch => {

                console.log(punch)

                return(
                    <Card sx={{marginTop: 5}}>
                        <CardContent>
                            <span style={{width: '100%', ...styles.nameStyle}}>{formatDate(punch.punch_date)} <span style={{float: 'right'}}>{punch.daily_total_hours}h</span> </span>
                            <br/>
                            <span style={styles.nameStyle}>{punch.employee_fullname}</span>
                            <span style={{float: 'left', paddingTop: '4px', paddingLeft: '5px', color: 'red'}}>{punch.employee_personnummer}</span>
                            <br/>
                            <br/>
                            <br/>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <span>{punch.punch_start_time}</span>
                                <span>{punch.punch_end_time}</span>
                            </div>
                            <br/>
                            <div>
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
                                        setPunchData(punch)
                                        console.log(punch)
                                        setModalView('editPunch')
                                        setModalOpen(true)
                                    }}
                                >
                                    <RiEdit2Line />
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                )
            })}
            <Modal 
                open={modalOpen}
            >
                {modalContent}
            </Modal>
        </Box>
    )
} 