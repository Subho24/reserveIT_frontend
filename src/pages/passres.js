import { useState } from 'react';
import axios from 'axios';
import { Header } from '../components/Header2';
import { Footer } from '../components/Footer';

export const password = () => {

    return(
        <div>
            <Header />
            <div className="pass_container">
                <div className="pass_email_write">

                    <form>
                        <input type="password" placeholder="New Password" id="pass_newpass" />
                        <input type="password" placeholder="Confirm Password" id="pass_newpass_2" />

                        <button type="submit">Set Password</button>
                    </form>
                </div>
                </div>
            <Footer />
        </div>

    )
};
export default password;