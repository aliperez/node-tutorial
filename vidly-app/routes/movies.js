
const Joi = require('joi');
const express = require('express');
const router = express.Router();

const movies = [
    {id: 1, name: "A Bug's Life", genre: "Family"},
    {id: 2, name: "Idiocracy", genre: "Satire"},
    {id: 3, name: "Sweeny Todd", genre: "Musical"}
]

router.get('/', (req,res) => {
    res.send(movies);
})

router.post('/', (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const movie = {
        id: movies.length + 1,
        name: req.body.name,
        genre: req.body.genre
    }
    movies.push(movie);
    res.send(movie);
})

router.get('/:genre', (req, res) => {
    const movie = movies.find( c => c.genre.toLowerCase() === req.params.genre.toLowerCase());
    if (!movie) return res.status(404).send('There are no movies within the given genre.')
    res.send(movie);
})

router.put('/:id', (req, res) => {
    const movie = movies.find( c => c.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('There are no movies within the given id.')
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    movie.name = req.body.name;
    movie.genre = req.body.genre;
    res.send(movie);
})

router.delete('/:id', (req, res) => {
    const movie = movies.find( c => c.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('There are no movies within the given id.')
    const index = movies.indexOf(movie);
    movies.splice(index, 1);
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