// server/api/auth/login.post.ts

import { connectToDB } from '@/server/utils/mongoose'
import { User } from '@/server/models/User'
import bcrypt from 'bcrypt'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  await connectToDB()

  const user = await User.findOne({ email })

  if (!user) {
    return createError({ statusCode: 401, statusMessage: 'Invalid email or password' })
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    return createError({ statusCode: 401, statusMessage: 'Invalid email or password' })
  }

  // ✅ Return cart as well
  return {
    message: 'Login successful',
    user: {
      name: user.name,
      email: user.email
    },
    token: 'dummy-jwt-token',
    cart: user.cart || []
  }
})
