import mongoose from 'mongoose'
import dotenv from 'dotenv'
import uniqueValidator from 'mongoose-unique-validator'

dotenv.config()

const url = process.env.MONGODB_URI
console.log('connecting to', url)

try {
  await mongoose.connect(url)
  console.log('connected to MongoDB')
} catch (error) {
  console.error('error connecting to MongoDB: ', error)
  process.exit(5)
}

const personSchema = new mongoose.Schema({
  name: { type: String, minlength: 3, required: true, unique: true },
  number: { type: String, minlength: 8, required: true },
  date: { type: Date },
})
personSchema.plugin(uniqueValidator)
const Person = mongoose.model('Person', personSchema)

export default Person
