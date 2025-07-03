// server/api/cart/update.post.ts

import { connectToDB} from '@/server/utils/mongoose'
import { User } from '@/server/models/User'

export default defineEventHandler(async (event) => {
  const { email, cart } = await readBody(event)

  await connectToDB()
  await User.findOneAndUpdate({ email }, { cart })

  return { message: 'Cart updated' }
})
