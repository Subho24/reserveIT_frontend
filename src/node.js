// Importowanie niezbędnych modułów
// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');

// Inicjalizacja aplikacji Express
// Express application initialization
const app = express();
app.use(bodyParser.json());

// Konfiguracja danych bazy danych (przykładowo: MongoDB)
// Configuration of database data (example: MongoDB)
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const User = mongoose.model('User', {
  email: String,
  password: String,
  resetCode: String,
});

// Konfiguracja danych serwera SMTP (przykładowo: Gmail)
// Configuration of SMTP server data (example: Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '',
    pass: '',
  },
});

// Obsługa żądania wysłania e-maila z kodem resetu hasła
// Handling a request to send an email with a password reset code
app.post('/api/send-reset-email', async (req, res) => {
  const { email } = req.body;

  try {
    // Sprawdzenie, czy istnieje użytkownik o podanym adresie e-mail w bazie danych
    // Checking if there is a user with the given e-mail address in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Wygenerowanie i zapisanie unikalnego kodu resetu hasła dla użytkownika
    // Generate and save a unique password reset code for the user
    const resetCode = uuidv4();
    user.resetCode = resetCode;
    await user.save();

    // Wysłanie wiadomości e-mail z kodem resetu hasła
    // Sending an email with a password reset code
    await transporter.sendMail({
      from: '',
      to: email,
      subject: 'Reset Password Code',
      text: `Hello,\n\nHere is your password reset code: ${resetCode}\n\nBest regards,\nThe Example Team`,
    });

    return res.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('An error occurred:', error);
    return res.status(500).json({ message: 'An error occurred' });
  }
});

// Obsługa żądania sprawdzenia poprawności kodu resetu hasła
// Support for password reset code validation request
app.post('/api/check-reset-code', async (req, res) => {
  const { email, code } = req.body;

  try {
    // Sprawdzenie, czy istnieje użytkownik o podanym adresie e-mail i kodzie resetu hasła w bazie danych
    // Checking if there is a user with the given e-mail address and password reset code in the database
    const user = await User.findOne({ email, resetCode: code });
    if (!user) {
      return res.status(404).json({ message: 'Invalid reset code' });
    }

    return res.json({ message: 'Reset code is valid' });
  } catch (error) {
    console.error('An error occurred:', error);
    return res.status(500).json({ message: 'An error occurred' });
  }
});

// Obsługa żądania potwierdzenia nowego hasła
// Support for new password confirmation request
app.post('/api/confirm-password', async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Sprawdzenie, czy istnieje użytkownik o podanym adresie e-mail w bazie danych
    // Checking if there is a user with the given e-mail address in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Haszowanie nowego hasła
    // Hashing the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Aktualizacja hasła użytkownika w bazie danych
    // Updating the user's password in the database
    user.password = hashedPassword;
    user.resetCode = undefined;
    await user.save();

    return res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('An error occurred:', error);
    return res.status(500).json({ message: 'An error occurred' });
  }
});

// Obsługa żądania logowania
// Login request handling
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Sprawdzenie, czy istnieje użytkownik o podanym adresie e-mail w bazie danych
    // Checking if there is a user with the given e-mail address in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Porównanie hasła z hasłem zapisanym w bazie danych
    // Comparison of the password with the password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    return res.json({ message: 'Login successful' });
  } catch (error) {
    console.error('An error occurred:', error);
    return res.status(500).json({ message: 'An error occurred' });
  }
});

// Obsługa żądania rejestracji
// Registration request handling
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Sprawdzenie, czy istnieje użytkownik o podanym adresie e-mail w bazie danych
    // Checking if there is a user with the given e-mail address in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Haszowanie hasła
    // Hash password 
    const hashedPassword = await bcrypt.hash(password, 10);

    // Zapisanie nowego użytkownika w bazie danych
    // Saving a new user in the database
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    return res.json({ message: 'Registration successful' });
  } catch (error) {
    console.error('An error occurred:', error);
    return res.status(500).json({ message: 'An error occurred' });
  }
});

// Uruchomienie serwera na porcie 
// Starting the server on the port
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
