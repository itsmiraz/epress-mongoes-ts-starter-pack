import { Types } from 'mongoose';
import { TUserName } from '../../interfaces/global';

export type TAdmin = {
  id: string;
  user: Types.ObjectId;
  name: TUserName;
  gender: 'Male' | 'Female';
  email: string;
  dateOfBirth: string;
  contactNumber: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  managementDepartment: Types.ObjectId;
  designation: string;
  profile?: string;
  isDeleted: boolean;
};
