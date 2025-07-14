const jwt = require('jsonwebtoken');
require('dotenv').config();

// The validation/authorization of the user on every api call
const verify = (req, res, next) => {
    try{
        const token = req.cookies.token;
        if(!token) return res.status(401).json({ message: "Unauthorized: No token provided" });
        const decoded = jwt.verify(token, process.env.sign);
        req.user = decoded;   
        next();
    }catch(e){
        console.error(e);
        res.status(500).json({message: "Server Error"});
    }
}

module.exports = verify;