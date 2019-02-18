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

const router = express.Router()

// can make a route
router.get('/gareth', (req, res) => {
  res.send({
    message: 'rocks'
  })
})

// if you have a fully RESTFUL API you could also use the 'route' method
// as a short hand here at it is always the same routes when talking about
// these sort of resources
router
  .route('/item')
  .get((req, res) => {
    res.send({
      message: 'woop'
    })
  })
  .post()

router
  .route('/item/:id')
  .put()
  .get()
  .delete()

// but to use it we need to register it via middleware
// in this case anything under /api will use our new route 🎉
app.use('/api', router)

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
