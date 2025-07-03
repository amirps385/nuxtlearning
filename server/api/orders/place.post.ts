// server/api/orders/place.post.ts
import { connectToDB } from '@/server/utils/mongoose'
import { User } from '@/server/models/User'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, items, total, address, paymentMethod } = body

  if (!email || !items || !total || !address || !paymentMethod) {
    return createError({ statusCode: 400, statusMessage: 'Missing order data' })
  }

  await connectToDB()

  const user = await User.findOne({ email })
  if (!user) {
    return createError({ statusCode: 404, statusMessage: 'User not found' })
  }

  const newOrder = {
    items,
    total,
    address,
    paymentMethod,
    createdAt: new Date()
  }

  user.orders.push(newOrder)
  await user.save()

  return { message: 'Order placed successfully' }
})
