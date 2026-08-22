import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser {
  fullname: string
  email: string
  password: string
  role: 'admin' | 'user'
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
    role: {
      type: String,
      enum: ['admin', 'user'], // allowed values
      default: 'user',
    },
  },
  { timestamps: true }
)

UserSchema.pre('save', function (next) {
  this.role = 'user'
  next()
})

// Pre-save hook to hash password
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})


export const User = model<IUser>('User', UserSchema)
