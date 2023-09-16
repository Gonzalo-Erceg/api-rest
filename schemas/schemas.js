import z from 'zod'

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'El titulo tiene que ser un string'
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  ratio: z.number().min(0).max(10),
  genre: z.array(z.string())
})

const validateMovie = (obj) => {
  return movieSchema.safeParse(obj)
}
const validateParcialMovie = (obj) => {
  return movieSchema.partial().safeParse(obj)
}
export { validateMovie, validateParcialMovie }
