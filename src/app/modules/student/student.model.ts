import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  StudentModel,
  TStuedent,
} from './student.interface';
import AppError from '../../errors/AppError';
import { TUserName } from '../../interfaces/global';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is Required'],
  },
  middleName: {
    type: String,
    required: [true, 'Middle Name is Required'],
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is Required'],
  },
});

const guradianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Father Name is Required'],
  },
  fatherContact: {
    type: String,
    required: [true, 'Father Contact is Required'],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father Occupation is Required'],
  },
  motherContact: {
    type: String,
    required: [true, 'Mother Contact is Required'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother Occupation is Required'],
  },
  motherName: {
    type: String,
    required: [true, 'Mother Name is Required'],
  },
});

const localGuadianSchema = new Schema<TLocalGuardian>({
  occupation: {
    type: String,
    required: [true, 'Occupation is Required'],
  },
  name: {
    type: String,
    required: [true, 'Local Guardian Name is Required'],
  },
  contact: {
    type: String,
    required: [true, 'Local Guardian Contact is Required'],
  },
  address: {
    type: String,
    required: [true, 'Local Guardian Address is Required'],
  },
});

const studentSchema = new Schema<TStuedent, StudentModel>(
  {
    id: { type: String, unique: true, required: [true, 'Id is Required'] },

    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'Id is Required'],
      unique: true,
      ref: 'User',
    },
    name: {
      type: userNameSchema,
      required: [true, 'Student Name is Required'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is Required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['Male', 'Female'],
        message: '{VALUE} is not Valid',
      },
      required: [true, 'Gender is Required'],
    },
    dateOfBirth: {
      type: String,
      required: [true, 'Date of Birth is Required'],
    },
    contactNumber: {
      type: String,
      required: [true, 'Contact Number is Required'],
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency Contact Number is Required'],
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'B+', 'AB+', 'O+'],
    },
    presentAddress: {
      type: String,
      required: [true, 'Present Address is Required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent Address is Required'],
    },
    profile: { type: String },
    Guardian: {
      type: guradianSchema,
      required: [true, 'Guardian Information is Required'],
    },
    localGuardian: {
      type: localGuadianSchema,
      required: [true, 'Local Guardian Information is Required'],
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

studentSchema.pre('save', async function (next) {
  const isEmailExists = await Student.findOne({
    email: this.email,
  });
  if (isEmailExists) {
    console.log('ekhanei atkaise');
    throw new AppError(403, ` This email (${this.email}) Already Exists`);
  } else {
    next();
  }
});

studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// virtual
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

//Creating a custom static methods

studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });

  return existingUser;
};

//checking if the use exists or not

// StudentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });

//   return existingUser;
// };

export const Student = model<TStuedent, StudentModel>('Student', studentSchema);
