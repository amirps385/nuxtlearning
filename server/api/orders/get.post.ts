// server/api/orders/get.post.ts
import { connectToDB } from '@/server/utils/mongoose'
import { User } from '@/server/models/User'

export default defineEventHandler(async (event) => {
  const { email } = await readBody(event)

  await connectToDB()
  const user = await User.findOne({ email })

  if (!user) {
    return createError({ statusCode: 404, statusMessage: 'User not found' })
  }

  return { orders: user.orders || [] }
})
