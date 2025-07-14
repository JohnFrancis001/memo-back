const express = require('express');
const userRout = express.Router();
const authRout = require('../middleware/jwtauth')
const userUpd = require('../controllers/updatecontroller')
const User = require('../models/user')

// Route to send the current user name
userRout.get('/name', authRout, async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

    const user = await User.findById(req.user.id); 

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ user: { username: user.name } }); 
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to update the user
userRout.put('/update', authRout, userUpd.userUpd);

module.exports = userRout;