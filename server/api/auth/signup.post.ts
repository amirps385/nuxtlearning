import { defineEventHandler, readBody } from 'h3'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { connectToDB } from '~/server/utils/mongoose'

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default defineEventHandler(async (event) => {
  await connectToDB()

  const body = await readBody(event)
  const { name, email, password } = body

  if (!name || !email || !password) {
    return { status: 400, message: 'All fields are required' }
  }

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return { status: 409, message: 'User already exists' }
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  await User.create({ name, email, password: hashedPassword })

  return { status: 200, message: 'User registered successfully' }
})
