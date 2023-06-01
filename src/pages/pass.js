import { useState } from 'react';
import axios from 'axios';
import { Header } from '../components/Header2';
import { Footer } from '../components/Footer';

const PasswordPage = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();

    try {
      // Wysłanie zapytania do serwera backendowego w celu wysłania wiadomości e-mail z kodem resetu hasła
      // Sending a query to the backend server to send an email with a password reset code
      const response = await axios.post('/api/send-reset-email', { email });
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <Header />
      <div className="pass_container">
        <div className="pass_how_to_change_password">
          <h2>How to change your password?</h2>
          <br />
          <hr />
          <span>
          </span>
        </div>
        <div className="pass_email_write">
          <form onSubmit={handleSendEmail}>
            <input type="email" placeholder="Email" id="pass_email" value={email} onChange={handleEmailChange} />
            <button type="submit">Send Email</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PasswordPage;
