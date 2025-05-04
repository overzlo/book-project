require('dotenv').config();
const app = require('./app');
const { connectMongoDB } = require('./config/db');

const PORT = process.env.PORT || 5000;

connectMongoDB();

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
