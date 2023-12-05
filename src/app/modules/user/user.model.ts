import { Schema, model } from 'mongoose'
import { TUser } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config/config'

const UserSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    needsPasswordChange: {
      type: Boolean,
      default: true
    },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty']
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress'
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias, prefer-const
  let user = this
  const hash = await bcrypt.hashSync(user.password, Number(config.salt))
  user.password = hash
  next()
})

UserSchema.post('save', function (docs, next) {
  // console.log('Post Middleware ', docs)
  docs.password = ''
  next()
})

export const User = model<TUser>('User', UserSchema)
