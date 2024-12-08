const express = require('express');
const cors = require('cors');
const { connectMongoDB, testNeo4jConnection } = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true 
  }));
  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});

app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);



connectMongoDB();
testNeo4jConnection();
