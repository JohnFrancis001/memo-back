
// middleware for note update check
const updCheck = (req, res, next) => {
    try{   
        const { title, description } = req.body;
        if( !title?.trim() || !description?.trim() ) return res.status(400).json({message: "Field must not be empty!"});
        next();
    }catch(e){
        res.status(400).json({message: "Server Error"});
    }
}

module.exports = updCheck;