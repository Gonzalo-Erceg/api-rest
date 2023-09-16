import { readJSON } from '../utils/readJSON.js'
import { randomUUID } from 'node:crypto'
const movies = readJSON('../movies.json')

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      return movies.filter(movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()))
    }
    return movies
  }

  static getById = async ({ id }) => {
    return movies.find(e => e.id === id)
  }

  static async create ({ input }) {
    const newMovie = {
      id: randomUUID(),
      ...input
    }
    movies.push(newMovie)
    return newMovie
  }

  static async delete ({ id }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if (movieIndex === -1) return false

    movies.splice(movieIndex, 1)
    return true
  }

  static async patch ({ id, input }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return { error: true }

    const UpdateMovie = {
      ...movies[movieIndex],
      ...input
    }
    movies[movieIndex] = UpdateMovie
    return { UpdateMovie, error: false }
  }
}
