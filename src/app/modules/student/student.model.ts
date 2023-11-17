import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Stuedent,
  UserName,
} from './student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const guradianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherContact: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  motherContact: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
});

const localGuadianSchema = new Schema<LocalGuardian>({
  occupation: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const StudentSchema = new Schema<Stuedent>({
  id: { type: String },
  name: userNameSchema,
  email: {
    type: String,
    required: true,
  },
  gender: ['Male', 'Female'],
  dateOfBirth: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  emergencyContactNo: {
    type: String,
    required: true,
  },
  bloodGroup: ['A+', 'B+', 'AB+', 'O+'],
  presentAddress: {
    type: String,
    required: true,
  },
  permanentAddress: {
    type: String,
    required: true,
  },
  profile: { type: String },
  Guardian: guradianSchema,
  localGuardian: localGuadianSchema,
  isActive: ['active', 'block'],
});

export const StudentModel = model<Stuedent>('Student', StudentSchema);
