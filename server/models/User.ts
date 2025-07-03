// server/models/User.ts

import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  cart: [
    {
      productId: String,
      title: String,
      price: Number,
      quantity: Number,
      image: String
    }
  ]
})

export const User = mongoose.models.User || mongoose.model('User', userSchema)
