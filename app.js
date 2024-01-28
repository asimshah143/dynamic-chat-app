require('dotenv').config();

var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://asimshahcs:chat-app@cluster0.lsyajya.mongodb.net/?retryWrites=true&w=majority');

const app = require('express')();

const http = require('http').Server(app);

http.listen(3000, ()=>{
    console.log('server is running');
});