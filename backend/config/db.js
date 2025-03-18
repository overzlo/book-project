const mongoose = require('mongoose');
const neo4j = require('neo4j-driver');
require('dotenv').config();

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoDB подключен");
    } catch (error) {
        console.error("Ошибка подключения MongoDB:", error);
    }
};

const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);
async function testNeo4jConnection() {
    const session = driver.session();
    try {
        await session.run('RETURN "Neo4j подключен"');
        console.log("Neo4j подключен");
    } catch (error) {
        console.error("Ошибка подключения к Neo4j:", error);
    } finally {
        await session.close();
    }
}

module.exports = { connectMongoDB, driver, testNeo4jConnection };
