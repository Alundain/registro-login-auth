const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');


//CONNECT MONGOOSE
require ('./server/config/config.mongoose');

app.use(cookieParser());
app.use(cors({credentials:false, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));




//routes
require("./server/routes/user.router")(app);



app.listen(8000, () => {
    console.log("Listening at port 8000")
})