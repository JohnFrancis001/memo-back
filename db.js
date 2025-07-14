const mongoose = require('mongoose');
require('dotenv').config(); 

// Connection to the database
const db = async () => {
    try{
        await mongoose.connect(process.env.db_address);
        console.log("✅ MongoDB connected successfully.");
    }catch(e){
        console.error(e);
        console.log("❌ MongoDB connection failed.");
    }
}

module.exports = db;