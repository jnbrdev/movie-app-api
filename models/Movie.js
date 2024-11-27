const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    director: {
        type: String,
        required: true,
        trim: true,
    },
    year: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    genre: {
        type: String,
        required: true,
        trim: true,
    },
    comments: [
            {
            userId: {
                type: String,
                required: [true, 'User ID is Required']
            },
            comment: {
                type: String,
                required: [true, 'Comment is Required']
            },
        }
    ], 
});

module.exports = mongoose.model("Movie", movieSchema);