import { Schema, model, connect } from 'mongoose';

export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContact: string;
  motherName: string;
  motherOccupation: string;
  motherContact: string;
};

export type Stuedent = {
  id: string;
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  gender: 'Male' | 'Female';
  email: string;
  contactNumber: string;
  dateOfBirth: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'B+' | 'AB+' | 'O+';
  presentAddress: string;
  permanentAddress: string;
};
