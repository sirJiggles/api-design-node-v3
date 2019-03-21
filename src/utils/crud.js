// import { Model } from 'mongoose'

export const getOne = model => async (req, res) => {
  const id = req.params.id
  const userId = req.user._id

  const doc = await model.findOne({ _id: id, createdBy: userId }).exec()
  if (!doc) {
    return res.status(400).end()
  }
  return res.status(200).json({ data: doc })
}

export const getMany = model => async (req, res) => {
  const userId = req.user._id
  const documents = await model.find({ createdBy: userId }).exec()
  if (!documents) {
    return res.status(400).end()
  }
  return res.status(200).json({ data: documents })
}

export const createOne = model => async (req, res) => {
  const doc = await model.create({ ...req.body, createdBy: req.user._id })
  if (!doc) {
    return res.status(400).end()
  }
  return res.status(201).json({ data: doc })
}

export const updateOne = model => async (req, res) => {
  const doc = await model
    .findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true }
    )
    .lean()
    .exec()
  if (!doc) {
    return res.status(400).end()
  }
  return res.status(200).json({ data: doc })
}

export const removeOne = model => async (req, res) => {
  const doc = await model
    .findOneAndDelete({ _id: req.params.id, createdBy: req.user._id })
    .lean()
    .exec()
  if (!doc) {
    return res.status(400).end()
  }
  return res.status(200).json({ data: doc })
}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
})
