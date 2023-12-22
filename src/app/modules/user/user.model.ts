import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import config from '../../config';
import bcrypt from 'bcryptjs';

const userSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      select: 0,
      required: [true, 'Password is Required'],
      maxlength: [20, 'Password can not be more than 20 characters'],
    },
    needsPasswordChanged: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Pre save middleware /hook
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const student = this; //document
  // Hashing user password and save to the db
  student.password = await bcrypt.hash(
    student.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

//post save middleware /hook
userSchema.post('save', function (doc, next) {
  doc.password = '';

  next();
});

userSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isStudentExists = await User.findOne(query);

  if (!isStudentExists) {
    throw new Error('Student Does not Exist');
  } else {
    next();
  }
});
userSchema.pre('updateOne', async function (next) {
  const query = this.getQuery();
  const isStudentExists = await User.findOne(query);

  if (!isStudentExists) {
    throw new Error('Student Does not Exist');
  } else {
    next();
  }
});

userSchema.statics.isUserExistsWithCustomId = async function (id: string) {
  return await User.findOne({ id: id }).select('+password');
};
userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimeStamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimeStamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  HashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, HashedPassword);
};

export const User = model<TUser, UserModel>('User', userSchema);
