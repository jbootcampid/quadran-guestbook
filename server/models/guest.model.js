import mongoose from 'mongoose'


const GuestSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: 'FirstName is required'
  },
  lastName: {
    type: String,
    trim: true,
    required: 'LastName is required'
  },
  email: {
    type: String,
    trim: true,
    unique: 'Email already exists',
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required'
  },
  phoneNumber: {
    type: String,
    trim: true,
    required: 'PhoneNumber is required'
  },
  image: {
    data: Buffer,
    contentType: String
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
})


export default mongoose.model('Guest', GuestSchema)