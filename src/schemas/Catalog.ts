import { Schema, model, Document } from 'mongoose'

interface CatalogInterface extends Document {
    title: String
    authors: String
    numPages: Number
    publicationDate: String
    publisher: String
    price: String
  }

const CatalogSchema = new Schema({
  title: String,
  authors: String,
  numPages: Number,
  publicationDate: String,
  publisher: String,
  price: String
}, {
  timestamps: true
})

export default model<CatalogInterface>('Catlaog', CatalogSchema)
