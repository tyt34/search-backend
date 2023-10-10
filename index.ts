const cors = require('cors')
const express = require('express')
import { randomRoute } from './routes'

const PORT = 3001
const app = express()

const options = {
  origin: ['http://localhost:3000'],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true
}

app.use('*', cors(options))

app.use('/', randomRoute)

app.listen(PORT, () => {
  console.log(`backend start on port: ${PORT}`)
  console.log(
    `you can get random number on http://localhost:${PORT}/random`
  )
})
