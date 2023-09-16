import express, { json } from 'express'

import cors from 'cors'
import router from './routes/movies.js'

// import fs from 'node:fs'
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))

const app = express()
app.use(cors())
app.use(json())

// todos los recursos MOVIES se identifican con la url MOVIES
app.use('/movies', router)

const PORT = process.env.PORT ?? 3001

app.listen(PORT, () => {
  console.log(`escuchando en el puerto http://localhost:${PORT}`)
})
