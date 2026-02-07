const express = require("express");
const app = express();
const cors = require("cors");
const logApi = require("./routes/log");
const noteApi = require("./routes/note");
const userApi = require("./routes/user");
require("dotenv").config();
const db = require("./db");
const cookie_parser = require("cookie-parser");

// To allow the triggers from only one frontend to hit different APIs
app.use(
  cors({
    origin: [process.env.CLIENT_URL, http:localhost:5173/],
    credentials: true
  })
);


// Middleware to parse incoming JSON requests and populate req.body
app.use(express.json());
// Middleware to parse cookies and populate req.cookies
app.use(cookie_parser());

// DB connection
db();

// Different Api routes
app.use("/log", logApi);
app.use("/note", noteApi);
app.use("/user", userApi);

const PORT = process.env.PORT || 5000;

// server Start
app.listen(PORT, () => {
  console.log("Running at Port:", PORT);
});
