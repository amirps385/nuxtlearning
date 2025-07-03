// server/api/orders/create.post.ts

import { connectToDB } from '@/server/utils/mongoose'
import { User } from '@/server/models/User'

export default defineEventHandler(async (event) => {
  const { email, items, total, address, paymentMethod } = await readBody(event)

  if (!email || !items || !total || !address || !paymentMethod) {
    return createError({ statusCode: 400, statusMessage: 'Missing fields' })
  }

  await connectToDB()

  const updatedUser = await User.findOneAndUpdate(
    { email },
    {
      $push: {
        orders: {
          items,
          total,
          address,
          paymentMethod,
          createdAt: new Date()
        }
      }
    },
    { new: true }
  )

  if (!updatedUser) {
    return createError({ statusCode: 404, statusMessage: 'User not found' })
  }

  return { message: 'Order saved successfully' }
})
