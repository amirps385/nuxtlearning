import { connectToDB } from '@/server/utils/mongoose'
import { User } from '@/server/models/User'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, orderId } = body
  

  await connectToDB()

  const user = await User.findOne({ email })
  if (!user) {
    return createError({ statusCode: 404, statusMessage: 'User not found' })
  }

  const order = user.orders.find((o: any) => o._id.toString() === orderId)


  if (!order) {
    return createError({ statusCode: 404, statusMessage: 'Order not found' })
  }

  return { order }
})
