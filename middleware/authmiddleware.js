const bcrypt = require('bcrypt');
const User = require('../models/user')

const middleAuth = async (req, res, next) => {
        try{
                const {name, password} = req.body;
                if(!name || !password) return res.status(422).json({message: "Empty Credentials"});
                const user = await User.findOne({name});
                if(!user) return res.status(400).json({message: "User not found"});
                const isMatch = await bcrypt.compare(password, user.password);
                if(!isMatch) return res.status(400).json({message: "Wrong Credentials"});
                req.user = user;
                next(); 
        }catch(e){
                res.status(500).json({message: e});
        }       
}

module.exports = middleAuth;