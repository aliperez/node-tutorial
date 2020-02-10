const { Movie, validate } = require('../models/movie');
const { Genre } = require('../models/genre');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('title'); 
    res.send(movies);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre');

    const movie = new Movie ({
        title: req.body.title,
        genre: {  
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    // This is to demonstrate that save method returns a movie document
    // movie = await movie.save(); 

    await movie.save(); 

    res.send(movie);
});

// router.get('/:genre', async (req, res) => {
//     const movie = await Movie.find({ genre: req.params.genre});
//     if (!movie || movie.length == 0) return res.status(404).send('There are no movies within the given genre.');
//     res.send(movie);
// });

router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie || movie.length == 0) return res.status(404).send('There are no movies within the given id.');
    res.send(movie);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');

    const movie = await Movie.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        genre: {
          _id: genre._id,
          name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    }, 
    { 
        new: true 
    });
    if (!movie) return res.status(404).send('There are no movies within the given id.');
    res.send(movie);
});

router.delete('/:id', async(req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if (!movie) return res.status(404).send('There are no movies within the given id.');
    res.send(movie);
});

module.exports = router;