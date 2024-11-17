const mongoose = require("mongoose");

let chatSchema = new mongoose.Schema({
    from:{
        type: String,
        required: true,
    }, 
    to:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true,
        maxLength: [50, "Message length is upto 50 characters"]
    }, 
    created_at:{
        type: Date,
    required: true
    }
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;