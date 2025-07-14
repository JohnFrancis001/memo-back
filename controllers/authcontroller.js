const jwt = require('jsonwebtoken');
require('dotenv').config();

// Controller for logging the user in with initializing a JWT token for authorization
const loginUser = async (req, res) => {
    try{
        const user = req.user;
        const payload = {
            id: user._id,
            name: user.name,
            email: user.email
        }
        const token = jwt.sign(payload, process.env.sign, {
            expiresIn: '1h',
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 3600000
        }).status(200).json({message: "Logged in"});

    }catch(e){
        console.log(e);
        res.status(500).json({error: "Internal Server Error"});
    }
}


// Controller to log out the user by clearing up cookie in which JWT token was also saved 
const logoutUser = async (req, res) => {
    try{
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        })
        res.status(200).json({message: "Logout Successfully!"});
    }catch(e){  
        console.error(e);
        res.status(400).json({message: "Failure logout"})
    }
}

module.exports = {loginUser, logoutUser};