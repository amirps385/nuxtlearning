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

  // Push order and get reference to newly created order
  user.orders.push(newOrder)
  const savedUser = await user.save()

  // ✅ Get the last inserted order's _id
  const insertedOrder = savedUser.orders[savedUser.orders.length - 1]
  const orderId = insertedOrder._id.toString()

  return {
    message: 'Order placed successfully',
    orderId // ✅ this will be used in redirect
  }
})
