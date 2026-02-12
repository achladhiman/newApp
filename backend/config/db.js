const mongoose = require('mongoose');
const { Sequelize } = require('sequelize');
require('dotenv').config();

// MongoDB Connection
const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    // Do not exit process, so MySQL can still try to connect or we can handle it
  }
};

// MySQL Connection
const sequelize = new Sequelize(
  process.env.MYSQL_DB,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

const connectMySQL = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL connected successfully');
    await sequelize.sync(); // Sync models
  } catch (err) {
    console.error('MySQL connection error:', err.message);
  }
};

module.exports = { connectMongoDB, connectMySQL, sequelize };
