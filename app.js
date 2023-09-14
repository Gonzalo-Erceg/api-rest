const express = require('express')
const crypto = require('node:crypto')
const movies = require('./movies.json')
const cors = require('cors')
const { validateMovie, validateParcialMovie } = require('./schemas/schemas')

const app = express()
app.use(cors())
app.use(express.json())

// todos los recursos MOVIES se identifican con la url MOVIES
app.get('/movies', (req, res) => {
  const { genre } = req.query

  if (!genre) return res.json(movies)
  const filterMovies = movies.filter(movie => movie.genre.includes(genre))
  res.json(filterMovies)
})

// endpoint con ruta dinámica
app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(e => e.id === id)
  if (movie) return res.json(movie)

  res.status(404).json({ message: 'Movie not found' })
})

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)
  if (result.error) return res.status(400).json({ error: JSON.parse(result.error.message) })

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data
  }
  movies.push(newMovie)
  res.status(201).json(newMovie)
})

app.patch('/movies/:id', (req, res) => {
  const result = validateParcialMovie(req.body)

  if (!result.success) return res.status(400).json({ error: JSON.parse(result.error.message) })
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)
  if (movieIndex === -1) return res.status(404).json({ error: 'Movie not found' })

  const UpdateMovie = {
    ...movies[movieIndex],
    ...result.data
  }
  movies[movieIndex] = UpdateMovie
  res.status(200).json(UpdateMovie)
})

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) return res.status(404).json({ error: 'Movie not found' })

  movies.splice(movieIndex, 1)
  res.status(200).json({ message: 'deleted resource' })
})

const PORT = process.env.PORT ?? 3000

app.listen(3000, () => {
  console.log(`escuchando en el puerto http://localhost:${PORT}`)
})
