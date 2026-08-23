import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser {
  fullname: string
  email: string
  password: string
  role: 'admin' | 'user'
  address?: string
  city?: string
  state?: string
  country?: string
  pincode?: string
  mobile?: string
}

const UserSchema = new Schema<IUser>(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    mobile: {
      type: Number,
      default: ''
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    address: {
      type: String,
      default: '',
      trim: true,
    },
    city: {
      type: String,
      default: '',
      trim: true,
    },
    state: {
      type: String,
      default: '',
      trim: true,
    },
    country: {
      type: String,
      default: '',
      trim: true,
    },
    pincode: {
      type: String,
      default: '',
      trim: true,
    },
  },
  { timestamps: true }
)

UserSchema.pre('save', function (next) {
  this.role = 'user'
  next()
})

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password.toString(), 10)
  next()
})

export const User = model<IUser>('User', UserSchema)
