import axios from "../axios";
import { useState } from "react"
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

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
            console.log(token);
            sessionStorage.setItem('accessToken', token)

            const decoded = jwtDecode(token);
            nav(`/dashboard/${decoded.companyId}`)
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div style={{
            background: 'linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
            minWidth: '100vw',
            minHeight: '100vh'}} 
        >
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                position: 'absolute',
                width: 640,
                height: 480,
                top: '30%',
                left: '30%',
                borderRadius: 30
            }}>
                <h2>Login</h2>
                <h4>Email</h4>
                <input style={{width: 540, height: 40, borderRadius: 5}} type={'email'} onChange={(e) => setEmail(e.target.value)} ></input>
                <h3>Password</h3>
                <input style={{width: 540, height: 40, borderRadius: 5}} type={'password'} onChange={(e) => setPass(e.target.value)} ></input>
                <button style={{width:180, height: 40, backgroundColor: 'whitesmoke', marginTop: 50, borderRadius: 5 }} onClick={handleLogin} >Login</button>
            </div>
        </div>
    )
}