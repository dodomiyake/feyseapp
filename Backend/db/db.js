const mongoose = require('mongoose');

const dbUrl = process.env.MONGO_URL;


const db = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log('DATABASE CONNECTED');
  } catch (error) {
    console.error('CONNECTION ERROR:', error);
  }
};

module.exports = db;
