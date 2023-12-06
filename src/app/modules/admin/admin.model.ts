import { Schema, model } from 'mongoose';
import { TUserName } from '../../interfaces/global';
import { TAdmin } from './admin.interface';

const UserNameSchema = new Schema<TUserName>({
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const adminSchema = new Schema<TAdmin>({
  id: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, required: true },
  name: { type: UserNameSchema, required: true },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  email: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  contactNumber: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  managementDepartment: { type: Schema.Types.ObjectId, required: true },
  designation: { type: String, required: true },
  profile: { type: String },
  isDeleted: { type: Boolean, required: true },
});

adminSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
adminSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const Admin = model<TAdmin>('Admin', adminSchema);
