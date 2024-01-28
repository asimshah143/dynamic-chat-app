const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    sender_id:{
        type: mongoose.Schema.Types.ObjectId,
        req: 'User'
    },
    reciver_id:{
        type: mongoose.Schema.Types.ObjectId,
        req: 'User'
    },
    message:{
        type: String,
        required: true
    },
   
},
{ timestamps: true }
    
);

module.exports = mongoose.Model('User', chatSchema)