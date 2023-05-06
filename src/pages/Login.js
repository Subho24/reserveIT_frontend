import axios from "../axios";
import { useState } from "react"
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Box, margin } from "@mui/system";

export const Login = (props) => {
    const [email, setEmail] = useState(null);
    const [pass, setPass] = useState(null);
    const nav = useNavigate();

    const handleLogin = () => {
        axios.post('/auth', {
            userName: email,
            userPass: pass
        })
        .then(res => {
            const token = res.data.token;
            sessionStorage.setItem('accessToken', token)

            const decoded = jwtDecode(token);
            nav(`/bookings/${decoded.companyId}`)
        })
        .catch(err => {
            console.log(err);
        })
    }
    console.log(window.innerWidth, window.innerHeight)

    const mobileStyle = {
        loginContainer: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            margin: '250px auto',
            borderRadius: 30
        },

        input: {
            width: '60%', 
            height: 20, 
            borderRadius: 5,
            margin: 'auto'
        },

        button: {
            width:130, 
            height: 30, 
            backgroundColor: 'whitesmoke', 
            borderRadius: 5,
            margin: '50px auto'
        }
    }

    const ipadStyle = {
        loginContainer: {
            display: 'flex',
            flexDirection: 'column',
            width: '60%',
            height: '100%',
            margin: '45% auto',
            borderRadius: 30
        },

        input: {
            width: '60%', 
            height: 20, 
            borderRadius: 5,
            margin: 'auto'
        },

        button: {
            width:130, 
            height: 30, 
            backgroundColor: 'whitesmoke', 
            borderRadius: 5,
            margin: '50px auto'
        }
    }

    const desktopStyle = {
        loginContainer: {
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            width: '100%',
            height: '100%',
            margin: 'auto',
            top: '30%',
            left: '30%',
            borderRadius: 30
        },

        input: {
            width: 540, 
            height: 40, 
            borderRadius: 5
        },

        button: {
            width:180, 
            height: 40, 
            backgroundColor: 'whitesmoke', 
            marginTop: 50, 
            borderRadius: 5 
        }
    }

    return (
        <Box sx={{
            background: 'linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
            minWidth: '100vw',
            minHeight: '100vh'}} 
        >
            <Box sx={window.innerWidth < 500 ? mobileStyle.loginContainer : window.innerWidth < 1100 ? ipadStyle.loginContainer : desktopStyle.loginContainer}>
                <h2>Login</h2>
                <h3>Email</h3>
                <input style={window.innerWidth < 500 ? mobileStyle.input : desktopStyle.input} type={'email'} onChange={(e) => setEmail(e.target.value)} ></input>
                <h3>Password</h3>
                <input style={window.innerWidth < 500 ? mobileStyle.input : desktopStyle.input} type={'password'} onChange={(e) => setPass(e.target.value)} ></input>
                <button style={window.innerWidth < 500 ? mobileStyle.button : desktopStyle.button} onClick={handleLogin} >Login</button>
            </Box>
        </Box>
    )
}