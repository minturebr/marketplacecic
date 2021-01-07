import { Schema, model, Document, ObjectId } from 'mongoose'

interface BookInterface extends Document {
    title: String
    authors: String
    numPages: Number
    publicationDate: String
    publisher: String
    price: String
    sellerId: ObjectId
    catalogId: ObjectId
  }

const BookSchema = new Schema({
  title: String,
  authors: String,
  numPages: Number,
  publicationDate: String,
  publisher: String,
  price: String,
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: 'Seller'
  },
  catalogId: {
    type: Schema.Types.ObjectId,
    ref: 'Seller'
  }
}, {
  timestamps: true
})

export default model<BookInterface>('Books', BookSchema)
