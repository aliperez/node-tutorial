const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

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

router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('name'); 
    res.send(movies);
})

router.post('/', async (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let movie = new Movie ({
        name: req.body.name,
        genre: req.body.genre
    });
    movie = await movie.save();
    res.send(movie);
})

router.get('/:genre', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send('There are no movies within the given genre.')
    res.send(movie);
})

router.put('/:id', async (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const movie = await Movie.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        genre: req.body.genre
    }, 
    { new: true 
    })
    if (!movie) return res.status(404).send('There are no movies within the given id.')
    res.send(movie);
})

router.delete('/:id', async(req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if (!movie) return res.status(404).send('There are no movies within the given id.')
    res.send(movie);
})

function validateMovie(movie) {
    const schema = {
        name: Joi.string().min(2).required(),
        genre: Joi.string().min(4).required()
    }
    return Joi.validate(movie, schema);
}

module.exports = router;