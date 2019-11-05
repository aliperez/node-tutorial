const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const movies = [
    {id: 1, name: "A Bug's Life", genre: "Family"},
    {id: 2, name: "Idiocracy", genre: "Satire"},
    {id: 3, name: "Sweeny Todd", genre: "Musical"}
]

app.get('/api/movies', (req,res) => {
    res.send(movies);
})

app.post('/api/movies', (req, res) => {
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

app.get('/api/movies/:genre', (req, res) => {
    const movie = movies.find( c => c.genre.toLowerCase() === req.params.genre.toLowerCase());
    if (!movie) return res.status(404).send('There are no movies within the given genre.')
    res.send(movie);
})

app.put('/api/movies/:id', (req, res) => {
    const movie = movies.find( c => c.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('There are no movies within the given id.')
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    movie.name = req.body.name;
    movie.genre = req.body.genre;
    res.send(movie);
})

app.delete('/api/movies/:id', (req, res) => {
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


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})