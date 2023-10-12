import cors = require('cors')
import express = require('express')
import { Client } from '@opensearch-project/opensearch'
import { filterRoute, randomRoute, searchRoute } from './routes'
import { PORT, messageOnStart, opensearchConf } from './constants'

const app = express()

// export const router = require('express').Router()

const options = {
  origin: ['http://localhost:3000'],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true
}

export const client = new Client({
  node: `${opensearchConf.protocol}://${opensearchConf.auth}@${opensearchConf.host}:${opensearchConf.port}`,
  ssl: { rejectUnauthorized: false }
})

app.use('*', cors(options))

app.use('/', randomRoute)
app.use('/', filterRoute)
app.use('/', searchRoute)

app.listen(PORT, () => {
  console.log(`backend start on port: ${PORT}`)
  console.log(messageOnStart)
})
