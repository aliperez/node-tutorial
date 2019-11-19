const mongoose = require('mongoose');
const Joi = require('joi');

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    date: { type: Date, default: Date.now }
});

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie) {
    const schema = {
        name: Joi.string().min(2).required(),
        genre: Joi.string().min(4).required()
    }
    return Joi.validate(movie, schema);
};

module.exports.Movie = Movie;
module.exports.validate = validateMovie;