const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//[Routes]
const userRoutes = require("./routes/user");
const movieRoutes = require("./routes/movie");


//[Environment Setup]
require('dotenv').config();

//[Server Setup]
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));   

const corsOptions = {
    origin: [`http://localhost:8000`, 
        'http://localhost:3000', 
        'http://zuitt-bootcamp-prod-461-7670-delavictoria.s3-website.us-east-1.amazonaws.com', 
        'http://zuitt-bootcamp-prod-461-7836-rebuta.s3-website.us-east-1.amazonaws.com'],
    credentials: true, 
    optionsSuccessStatus:200 
};
app.use(cors(corsOptions));

//[Database Connection]
mongoose.connect(process.env.MONGODB_STRING);
mongoose.connection.once('open',()=>console.log("Now connected to MongoDB Atlas"));

//app.use('/b7/uploads', express.static('uploads'));
//[Backend Routes]
app.use("/users", userRoutes);
app.use("/movies", movieRoutes);



if(require.main === module){
    app.listen( process.env.PORT || 4000, () => {
        console.log(`API is now online on port ${ process.env.PORT || 4000 }`)
    });
}

module.exports = { app, mongoose };