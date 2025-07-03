// server/api/orders/save.post.ts
import { connectToDB } from '@/server/utils/mongoose'
import { User } from '@/server/models/User'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, cart, total, address } = body

  await connectToDB()

  const order = {
    items: cart,
    total,
    address,
    date: new Date()
  }

  await User.findOneAndUpdate(
    { email },
    { $push: { orders: order } }
  )

  return { message: 'Order saved' }
})
