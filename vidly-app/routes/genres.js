const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Genre, validate } = require('../models/genre');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    // throw new Error('Could not get the genres.');
    const genres = await Genre.find().sort('name'); 
    res.send(genres);
});

router.post('/', auth, async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let genre = new Genre ({
        name: req.body.name
    });
    genre = await genre.save();
    res.send(genre);
});

// router.get('/:genre', async (req, res) => {
//     const genre = await Genre.find({ genre: req.params.genre});
//     if (!genre || genre.length == 0) return res.status(404).send('There are no genres within the given genre.');
//     res.send(genre);
// });

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre || genre.length == 0) return res.status(404).send('There are no genres with the given id.');
    res.send(genre);
});

router.put('/:id', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = await Genre.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    }, 
    { 
        new: true 
    });
    if (!genre) return res.status(404).send('There are no genres with the given id.');
    res.send(genre);
});

router.delete('/:id', [auth, admin] , async(req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(404).send('There are no genres within the given id.');
    res.send(genre);
});

module.exports = router;