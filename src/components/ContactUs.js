import MainContainer from '../components/MainContainer';
import { useState } from 'react';
import ContactUs from '../components/ContactUs';
//import '../css/styleCon.css';

export const Support = () => {
  const [containerSupport, setContainerSupport] = useState('containerSupport')

  return (
    <div>

      <div className={containerSupport} id="containerSupport">
        <h1>Contact Us</h1>
        <p>Please fill out the form below to get in touch with us.</p>
        <form id="contact-form" method="post" action="submit_form.php">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" required/>
    
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required/>
    
          <label for="message">Message:</label>
          <textarea requiresStyle={{height:237}} placeholder="Message"id="message" name="message" required cols="30" rows="8" maxLength={300}></textarea>
    
          <input type="submit" value="Submit"/>
        </form>

      </div>
      <br/>
      <br/>
    </div>

  );

};