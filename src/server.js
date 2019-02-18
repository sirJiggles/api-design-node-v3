import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()

const log = (req, res, next) => {
  console.log('logging')
  // do the 'next' bit of middleware
  next()
}

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

// this would have it run for the entire app
// app.use(log)

// pass middleware here as an arg
app.get('/data', log, (req, res) => {
  res.send({
    message: 'hello'
  })
})

// pass an array of middle wares to this route
app.post('/data', [log, log], (req, res) => {
  res.send(req.body)
})

export const start = () => {
  app.listen(3000)
}
