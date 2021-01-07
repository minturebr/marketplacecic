import Mongoose, { Schema, model, Document } from 'mongoose'

interface IBookInterface {
  title: String
  authors: String
  numPages: Number
  publicationDate: String
  publisher: String
  price: Number
  sellerId: Mongoose.Types.ObjectId
  catalogId: Mongoose.Types.ObjectId
}

interface BookInterface extends Document, IBookInterface {}

const BookSchema = new Schema({
  title: String,
  authors: String,
  numPages: Number,
  publicationDate: String,
  publisher: String,
  price: Number,
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: 'Seller'
  },
  catalogId: {
    type: Schema.Types.ObjectId,
    ref: 'Catalog'
  }
}, {
  timestamps: true
})

export default model<BookInterface>('Books', BookSchema)
export { IBookInterface }
