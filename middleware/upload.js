const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadPath = path.join(__dirname, "uploads");

if(!fs.existsSync(uploadPath)){
    fs.mkdirSync(uploadPath, {recursive: true});
    console.log("Uploads folder created!");
}

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "application/pdf"];

    if(allowed.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("File type not supported"), false);
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024},
    fileFilter
});

module.exports = upload;
