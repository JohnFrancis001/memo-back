const express = require('express');
const rout = express.Router();
const User = require('../models/user')
const bcrypt = require('bcrypt');
require('dotenv').config();
const middleAuth = require('../middleware/authmiddleware')
const middleContr = require('../controllers/authcontroller')
const jwtAuth = require('../middleware/jwtauth')

// New User Registration route
rout.post('/new', async (req, res) => {
    try{
        const { name, email, password } = req.body;
        const exists = await User.findOne({ name });
        if (exists) return res.status(400).json({ message: "Email already registered" });
        if(!name || !email || !password) return res.status(400).json({message: "Empty Field"})
            const hashPass = await bcrypt.hash(password, 10);
            console.log(hashPass);
            const user = User(
        {
            name,
            email,
            password: hashPass
        }
    );
    await user.save();
        console.log("Working Fine");
        res.status(200).json({message: "User Saved"});
    }catch(e){
        console.log(e);
        res.status(500).json({ message: "Something went wrong" });

    }
})

// User Login route
rout.post('/auth', middleAuth, middleContr.loginUser);

// User logout route
rout.get('/logout', jwtAuth, middleContr.logoutUser)

module.exports = rout;