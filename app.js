require('dotenv').config();

var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://asimshahcs:chat-app@chat-app.4dv0kvq.mongodb.net/?retryWrites=true&w=majority');

const app = require('express')();

const http = require('http').Server(app);

const  userRoute = require('./routes/userRoute')

app.use('/',userRoute);

http.listen(3000, ()=>{
    console.log('server is running');
});