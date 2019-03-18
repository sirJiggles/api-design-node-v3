import mongoose from 'mongoose'

var ObjectId = mongoose.Schema.Types.ObjectId

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 50
    },
    status: {
      default: 'active',
      required: true,
      type: String,
      enum: ['active', 'complete', 'pastdue']
    },
    notes: String,
    due: Date,
    createdBy: {
      ref: 'user',
      required: true,
      type: ObjectId
    },
    list: {
      ref: 'list',
      required: true,
      type: ObjectId
    }
  },
  { timestamps: true }
)
export const Item = mongoose.model('item', itemSchema)
