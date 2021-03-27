require("dotenv").config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Routes
const authRoutes = require("./routes/auth")


// create express app
const app = express();

mongoose.Promise = global.Promise;

// DB Connection

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => {
        console.log("DB CONNECTED")
    })
    .catch((err) => {
        console.log("Could not connect to database...", err)
    })



// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use(cookieParser());
app.use(cors());

// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to DevSocial" });
});

const port = process.env.PORT || 8000;
// listen for requests
app.listen(port, () => {
    console.log("Server is listening on port ", port);
});