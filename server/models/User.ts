// server/models/User.ts

import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  cart: [
    {
      productId: String,
      title: String,
      price: Number,
      quantity: Number,
      image: String
    }
  ],
  orders: [
    {
      items: [
        {
          productId: String,
          title: String,
          price: Number,
          quantity: Number,
          image: String
        }
      ],
      total: Number,
      address: String,
      paymentMethod: String,
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
})

export const User = mongoose.models.User || mongoose.model('User', userSchema)
