const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

// Endpoint do obsługi logowania
// Login endpoint
app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Połączenie z bazą danych
      // Database connection
      const uri = 'mongodb://localhost:27017';
      const client = new MongoClient(uri, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db('reserveIT');
      const collection = db.collection('users');
  
      // Wyszukiwanie użytkownika w bazie
      // Searching for a user in the database
      const user = await collection.findOne({ email, password });
  
      if (user) {
        // Znaleziono użytkownika, zwsróć dane użytkownika
        // User found, return user details
        res.status(200).json(user);
      } else {
        // Nie znaleziono użytkownika, zwróć błąd uwierzytelniania
        // User not found, return authentication error
        res.status(401).send('Nieprawidłowy email lub hasło.');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Wystąpił błąd podczas logowania.');
    } finally {
      // Zamykanie połączenia z bazą danych
      // Closing the database connection
      client.close();
    }
  });
  

// Nasłuchiwanie na określonym porcie
// Listening on a specific port
app.listen(port, () => {
  console.log(`Serwer nasłuchuje na porcie ${port}`);
});
