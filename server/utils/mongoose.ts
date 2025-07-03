import mongoose from 'mongoose'

let isConnected = false

export const connectToDB = async () => {
  if (isConnected) return

  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/notes-app', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any)

    isConnected = true
    console.log('✅ Connected to MongoDB')
  } catch (error) {
    console.error('❌ MongoDB connection error:', error)
    throw error
  }
}
