import config from '../config'
import { User } from '../resources/user/user.model'
import jwt from 'jsonwebtoken'

export const newToken = user => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  })
}

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

export const signup = async (req, res) => {
  // accept email pw
  // send back json web token on success
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).send({
      message: 'you need to give email and pw for this end point home slice!'
    })
  }
  const userDoc = await User.create(req.body)
  if (!userDoc) {
    return res.status(500)
  }
  const token = await newToken(userDoc)
  return res.status(201).send({ token })
}

export const signin = async (req, res) => {
  // check if the creds are valid
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).send({
      message: 'you need to give email and pw for this end point home slice!'
    })
  }

  const userDoc = await User.findOne({ email }).exec()
  if (!userDoc) {
    return res
      .status(401)
      .send({ message: 'could not find the user with the creds given' })
  }
  const pwChecksOut = await userDoc.checkPassword(password)
  if (!pwChecksOut) {
    return res.status(401).send({ message: 'password or email are incorrect' })
  }
  // if they are ok return jwt
  const token = await newToken(userDoc)
  return res.status(201).send({ token })
}

export const protect = async (req, res, next) => {
  // look for token in header
  // grab from the header and run verifyToken
  // `Bearer sdfsadfsdfdfdfsf`
  // the token is the end bit
  // get the user from the database, check if user is there
  // add the user to the req params (middleware)

  next()
}
