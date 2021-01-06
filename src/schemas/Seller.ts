import { Schema, model, Document } from 'mongoose'

interface SellerInterface extends Document {
  name: String
  lastName?: String
  email: String
}

const SellerSchema = new Schema({
  name: String,
  lastName: String,
  email: String
}, {
  timestamps: true
})

export default model<SellerInterface>('Seller', SellerSchema)
