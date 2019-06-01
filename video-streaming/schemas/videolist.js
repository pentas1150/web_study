const mongoose = require('mongoose');

const { Schema } = mongoose;
const videoSchema = new Schema({
    filename: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Videolist', videoSchema);