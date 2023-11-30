import { Model, Types } from 'mongoose';

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContact: string;
  motherName: string;
  motherOccupation: string;
  motherContact: string;
};

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};
export type TLocalGuardian = {
  name: string;
  occupation: string;
  contact: string;
  address: string;
};

export type TStuedent = {
  id: string;
  user: Types.ObjectId;

  name: TUserName;
  gender: 'Male' | 'Female';
  email: string;
  dateOfBirth: Date;
  contactNumber: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'B+' | 'AB+' | 'O+';
  presentAddress: string;
  permanentAddress: string;
  Guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profile?: string;
  admissionSemister: Types.ObjectId;
  isDeleted: boolean;
};

// for creating static

export interface StudentModel extends Model<TStuedent> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TStuedent | null>;
}

//For creating instance

// export interface StudentMethods {
//   isUserExists(id: string): Promise<TStuedent | null>;
// }

// export type StudentModel = Model<TStuedent, Record<string, never>>;
