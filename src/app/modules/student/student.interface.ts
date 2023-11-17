export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContact: string;
  motherName: string;
  motherOccupation: string;
  motherContact: string;
};

export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};
export type LocalGuardian = {
  name: string;
  occupation: string;
  contact: string;
  address: string;
};

export type Stuedent = {
  id: string;
  name: UserName;
  gender: 'Male' | 'Female';
  email: string;
  dateOfBirth: string;
  contactNumber: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'B+' | 'AB+' | 'O+';
  presentAddress: string;
  permanentAddress: string;
  Guardian: Guardian;
  localGuardian: LocalGuardian;
  profile?: string;
  isActive: 'active' | 'block';
};
