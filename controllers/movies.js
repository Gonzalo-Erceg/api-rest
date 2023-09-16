import { MovieModel } from '../models/movie.js'
import { validateMovie, validateParcialMovie } from '../schemas/schemas.js'

export class MovieController {
  static async getAll (req, res) {
    const { genre } = req.query

    const filterMovies = await MovieModel.getAll({ genre })
    res.json(filterMovies)
  }

  static async getById (req, res) {
    const { id } = req.params
    const movie = await MovieModel.getById({ id })
    if (movie) return res.json(movie)

    res.status(404).json({ message: 'Movie not found' })
  }

  static async create (req, res) {
    const result = validateMovie(req.body)
    if (result.error) return res.status(400).json({ error: JSON.parse(result.error.message) })

    const newMovie = await MovieModel.create({ input: result.data })
    res.status(201).json(newMovie)
  }

  static async patch (req, res) {
    const result = validateParcialMovie(req.body)

    if (!result.success) return res.status(400).json({ error: JSON.parse(result.error.message) })
    const { id } = req.params
    const movie = await MovieModel.patch({ id, input: result.data })
    if (movie.error) return res.status(404).json({ error: 'Movie not found' })

    res.status(200).json(movie.UpdateMovie)
  }

  static async delete (req, res) {
    const { id } = req.params
    const movie = await MovieModel.delete({ id })

    if (movie === false) return res.status(404).json({ error: 'Movie not found' })

    res.status(200).json({ message: 'deleted resource' })
  }
}
