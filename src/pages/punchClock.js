import { Box } from "@mui/system"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { KeyPad } from "../components/keyPad"
import { useEffect, useState } from "react"
import { BsCheckCircle } from "react-icons/bs"
import { BiError } from "react-icons/bi"
import axios from "../axios"
import { useParams } from "react-router-dom"

export const PunchClock = (props) => {    
    const [personNumber, setPersonNumber] = useState('');
    const [clockedIn, setClockedIn] = useState(null);
    const [employeePunchData, setEmployeePunchData] = useState([])
    const [employeeNotFound, setEmployeeNotFound] = useState(null);
    const [punchStatus, setPunchStatus] = useState(null)

    const companyInfo = useParams()

    const date = new Date()
    const formatedDate = `${date.getFullYear()}-${date.getMonth() + 1 <= 9 ? 0 : ''}${date.getMonth() + 1}-${date.getDate() + 1 <= 9 ? '0' : ''}${date.getDate()}`

    useEffect(() => setEmployeeNotFound(null), [personNumber])


    const handleClick = () => {
        axios.get(`/api/employee_punches/${personNumber}?date=${formatedDate}`)
        .then((res) => {
            const { data } = res
            console.log(res)
            setEmployeePunchData(data[data.length - 1])
            if(Object.keys(data).length <= 0) {
                console.log('here')
                setClockedIn(false)
                return
            } 
            data.map(punch => {
                if(punch.punch_start_time === null && punch.punch_end_time === null) setClockedIn(false) //If both start and end time = null then clockedIn = false
                if(punch.punch_start_time !== null && punch.punch_end_time === null) setClockedIn(true)  //If start time is !null and end time is null clockedIn = true
                if(punch.punch_start_time !== null && punch.punch_end_time !== null) setClockedIn(false) //If both start and end time != null then clockedIn = false
            })
        })
        .catch((err) => {
            if(err.status === 404) {
                setEmployeeNotFound(true)
            }
            console.log(err)
        })
    }

    const handleClockIn = () => {
        axios.post('/api/employee_punches/clockIn', {
            "employee_personnummer": personNumber,
            "punch_date": formatedDate,
            "punch_start_time": `${date.getHours() < 10 ? '0' : ''}${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`,
            "company_id": companyInfo.companyId,
            "employee_fullname": employeePunchData.employee_fullname
        })
        .then(res => {
            console.log(res)
            setPunchStatus('success')
        })
        .catch(err => {
            console.log(err);
            setPunchStatus('error')
        })
    }

    const handleClockOut = () => {
        const data = {...employeePunchData}
        console.log(data)
        data.punch_end_time = `${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`
        console.log(data)
        axios.patch('/api/employee_punches/clockOut', data)
        .then(res => {
            console.log(res)
            setPunchStatus('success');
        })
        .catch(err => {
            console.log(err)
            setPunchStatus('error');
        })
    }



    return (
        <>
            <Header />
            <Box style={{margin: '0px 20px 0 20px', textAlign: 'center'}} >
                {
                    punchStatus === 'success' ? (
                      <div style={{margin: '20%', textAlign: 'center', display: 'flex', flexDirection: 'column'}}>
                        <BsCheckCircle style={{
                            fontSize: 50,
                            color: 'green',
                            margin: 'auto'
                        }} />
                        <a style={{textDecoration: 'none'}} href={`/admin/punch/${companyInfo.companyId}`}>
                          <button className='bttn'>
                            Okej
                          </button>
                        </a>
                      </div>
                    )
                    : punchStatus === 'error' ?
                    (
                      <div style={{marginTop: '20%', textAlign: 'center', display: 'flex', flexDirection: 'column'}}>
                        <BiError style={{
                            fontSize: 50,
                            color: 'red',
                            margin: 'auto'
                        }} />
                        <p>Något gick fel</p>
                        <p>Försök igen senare.</p>
                        <a style={{textDecoration: 'none'}} href={`/admin/punch/${companyInfo.companyId}`}>
                          <button className='bttn'>
                            Okej
                          </button>
                        </a>
                      </div>
                    )
                    :
                    <>
                        <KeyPad personNumber={personNumber} setPersonNumber={setPersonNumber} employeeNotFound={employeeNotFound} />
                        {
                            clockedIn === null  ? <button className="punch bttn" style={{margin: '10px'}} onClick={handleClick} >Next</button>
                            : 
                            (
                                <>
                                    <button className="punch bttn" style={{margin: '10px', opacity: clockedIn ? '0.5' : null}} disabled={clockedIn ? true : false} onClick={handleClockIn} >Stämpla In</button>
                                    <button className="punch bttn" style={{margin: '10px', opacity: clockedIn ? null : '0.5'}} disabled={clockedIn ? false : true} onClick={handleClockOut} >Stämpla Ut</button>
                                </>
                            )
                        }
                    </>
                }
            </Box>
            <Footer />
        </>

    )
}
