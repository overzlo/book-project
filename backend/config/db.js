const mongoose = require('mongoose');
require('dotenv').config();

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoDB подключен");
    } catch (error) {
        console.error("Ошибка подключения MongoDB:", error);
    }
};

module.exports = { connectMongoDB};
