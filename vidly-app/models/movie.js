const mongoose = require('mongoose');
const Joi = require('joi');
const genreSchema = require('./genre');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: Array,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true
    },
    dailyRentalRate: {
        type: Number,
        required: true
    },
    date: { type: Date, default: Date.now }
});

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie) {
    const schema = {
        title: Joi.string().min(2).required(),
        genre: Joi.array().required(),
        numberInStock: Joi.number().required(),
        dailyRentalRate: Joi.number().required()
    }
    return Joi.validate(movie, schema);
};

module.exports.Movie = Movie;
module.exports.validate = validateMovie;