const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
    userid: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    userpw: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', userSchema);