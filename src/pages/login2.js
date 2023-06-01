import { useState } from 'react';
import '../css/styleLogin.css';

export const Login = () => {
  const [containerClass, setContainerClass] = useState('container');


  const styles = {
    container: {
        backgroundColor: '#fff',
        borderRadius: 10,
        boxShadow: '0 14px 28px rgba(0,0,0,0.25)',
        boxShadow:'0 10px 10px rgba(0,0,0,0.22)',
        position: 'relative',
        overflow: 'hidden',
        width: 768,
        maxWidth: '100%',
        minHeight: 800,
        display: 'grid',
        gap: 4,
        margin: 'auto'
    },

    test:{
        transform:'translateX(100%)',
    },
    
    'sign-up-container': {
        left: 0,
        width: '50%',
        opacity: 0,
        zIndex: 1,
    },
    
    'container.right-panel-active .sign-up-container':{
        transform: 'translateX(100%)',
        opacity: 1,
        zIndex: 5,
        animation: 'show 0.6s',
    }
  }
  const handleSignIn = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const userData = await response.json();
        console.log('Zalogowano:', userData);
        // Wykonaj odpowiednie akcje po zalogowaniu, np. przekierowanie na inną stronę
      } else {
        console.error('Błąd logowania:', response.statusText);
        // Wyświetl odpowiedni komunikat dla użytkownika
      }
    } catch (error) {
      console.error('Wystąpił błąd:', error);
      // Wyświetl odpowiedni komunikat dla użytkownika
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    const address = event.target.address.value;
    const city = event.target.city.value;
    const name = event.target.name.value;
    const email = event.target.email.value;
    const phoneNumber = event.target.phoneNumber.value;
    const category = event.target.category.value;

    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ address, city, name, email, phoneNumber, category })
      });

      if (response.ok) {
        const userData = await response.json();
        console.log('Zarejestrowano:', userData);
        // Wykonaj odpowiednie akcje po rejestracji, np. przekierowanie na inną stronę
      } else {
        console.error('Błąd rejestracji:', response.statusText);
        // Wyświetl odpowiedni komunikat dla użytkownika
      }
    } catch (error) {
      console.error('Wystąpił błąd:', error);
      // Wyświetl odpowiedni komunikat dla użytkownika
    }
  };

  return (
    <div>
      <div className={containerClass} id="container">
        <div className="form-container sign-up-container">
          <form onSubmit={handleSignUp}>
            <h1>Create Account</h1>
            <br />
            <span></span>
            <input type="text" placeholder="Address" name="address" />
            <input type="text" placeholder="City" name="city" />
            <br />
            <span>Contact Person</span>
            <input type="text" placeholder="Name" name="name" />
            <input type="email" placeholder="Email" name="email" />
            <input type="tel" maxLength="9" placeholder="Your Phone Number" name="phoneNumber" />
            <input list="br" placeholder="Category" name="category" />

            <datalist id="br">
              <option value="Restaurant"></option>
              <option value="Salon"></option>
              <option value="Massage Parlour"></option>
              <option value="Dentist"></option>
              <option value="Therapy"></option>
            </datalist>
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={handleSignIn}>
            <h1>Sign in</h1>
            <div className="social-container">
              <a href="#" className="social">
                <i className="fa fa-facebook-f"></i>
              </a>
              <a href="#" className="social">
                <i className="fa fa-google"></i>
              </a>
              <a href="#" className="social">
                <i className="fa fa-linkedin"></i>
              </a>
            </div>
            <span>or use your account</span>
            <input type="email" placeholder="Email" name="email" />
            <input type="password" placeholder="Password" name="password" />
            <a href="/passwordChanger">Forgot your password?</a>
            <button type="submit">Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => {
                  setContainerClass('container');
                }}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                className="ghost"
                id="signUp"
                onClick={() => {
                  setContainerClass('container right-panel-active');
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
