const mongoose = require('mongoose');
require('dotenv').config(); 

// Connection to the database
const db = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB connected successfully.");
    }catch(e){
        console.error(e);
        console.log("❌ MongoDB connection failed.");
    }
}

module.exports = db;