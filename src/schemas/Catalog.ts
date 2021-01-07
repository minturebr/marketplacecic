import { Schema, model, Document, ObjectId } from 'mongoose'

interface CatalogInterface extends Document {
    title: String
    authors: String
    numPages: Number
    publicationDate: String
    publisher: String
    price: String
    sellerId: ObjectId
  }

const CatalogSchema = new Schema({
  title: String,
  authors: String,
  numPages: Number,
  publicationDate: String,
  publisher: String,
  price: String,
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: 'Seller'
  }
}, {
  timestamps: true
})

export default model<CatalogInterface>('Catalog', CatalogSchema)
