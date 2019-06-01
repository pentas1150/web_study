const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
    index: mongoose.Schema.Types.ObjectId,
    id: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    pw: {
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