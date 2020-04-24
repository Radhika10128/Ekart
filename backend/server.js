const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
var bodyparser=require('body-parser');
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(cookieParser());
app.use(express.json());

//const port = 5000;



//const uri = process.env.ATLAS_URI;
mongoose.connect('mongodb+srv://dbUser:todoDB@cluster0-ku63s.mongodb.net/user?retryWrites=true&w=majority', {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);

const connection = mongoose.connection; 
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const userRouter = require('./routes/User');
app.use('/user',userRouter);

const WatchRouter = require('./routes/Watch');
app.use('/watch',WatchRouter);

app.listen(5000,()=>{
    console.log('express server started');
});




