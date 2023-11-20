import Joi from 'joi';

const userNameSchema = Joi.object({
  firstName: Joi.string().required().messages({
    'string.base': 'First Name must be a string',
    'string.empty': 'First Name is required',
  }),

  middleName: Joi.string().required().messages({
    'string.base': 'Middle Name must be a string',
    'string.empty': 'Middle Name is required',
  }),

  lastName: Joi.string().required().messages({
    'string.base': 'Last Name must be a string',
    'string.empty': 'Last Name is required',
  }),
});

const guardianSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    'string.base': 'Father Name must be a string',
    'string.empty': 'Father Name is required',
  }),

  fatherContact: Joi.string().required().messages({
    'string.base': 'Father Contact must be a string',
    'string.empty': 'Father Contact is required',
  }),

  fatherOccupation: Joi.string().required().messages({
    'string.base': 'Father Occupation must be a string',
    'string.empty': 'Father Occupation is required',
  }),

  motherContact: Joi.string().required().messages({
    'string.base': 'Mother Contact must be a string',
    'string.empty': 'Mother Contact is required',
  }),

  motherOccupation: Joi.string().required().messages({
    'string.base': 'Mother Occupation must be a string',
    'string.empty': 'Mother Occupation is required',
  }),

  motherName: Joi.string().required().messages({
    'string.base': 'Mother Name must be a string',
    'string.empty': 'Mother Name is required',
  }),
});

const localGuardianSchema = Joi.object({
  occupation: Joi.string().required().messages({
    'string.base': 'Occupation must be a string',
    'string.empty': 'Occupation is required',
  }),

  name: Joi.string().required().messages({
    'string.base': 'Local Guardian Name must be a string',
    'string.empty': 'Local Guardian Name is required',
  }),

  contact: Joi.string().required().messages({
    'string.base': 'Local Guardian Contact must be a string',
    'string.empty': 'Local Guardian Contact is required',
  }),

  address: Joi.string().required().messages({
    'string.base': 'Local Guardian Address must be a string',
    'string.empty': 'Local Guardian Address is required',
  }),
});

const studentValidationJoiSchema = Joi.object({
  id: Joi.string(),

  name: userNameSchema.required(),

  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string',
    'string.empty': 'Email is required',
    'string.email': 'Email must be a valid email address',
  }),

  gender: Joi.string().valid('Male', 'Female').required().messages({
    'string.base': 'Gender must be a string',
    'string.empty': 'Gender is required',
    'any.only': 'Gender must be either Male or Female',
  }),

  dateOfBirth: Joi.string().required().messages({
    'string.base': 'Date of Birth must be a string',
    'string.empty': 'Date of Birth is required',
  }),

  contactNumber: Joi.string().required().messages({
    'string.base': 'Contact Number must be a string',
    'string.empty': 'Contact Number is required',
  }),

  emergencyContactNo: Joi.string().required().messages({
    'string.base': 'Emergency Contact Number must be a string',
    'string.empty': 'Emergency Contact Number is required',
  }),

  bloodGroup: Joi.string().valid('A+', 'B+', 'AB+', 'O+').allow('').messages({
    'string.base': 'Blood Group must be a string',
    'any.only': 'Blood Group must be one of A+, B+, AB+, O+',
  }),

  presentAddress: Joi.string().required().messages({
    'string.base': 'Present Address must be a string',
    'string.empty': 'Present Address is required',
  }),

  permanentAddress: Joi.string().required().messages({
    'string.base': 'Permanent Address must be a string',
    'string.empty': 'Permanent Address is required',
  }),

  profile: Joi.string().allow(''),

  Guardian: guardianSchema.required(),

  localGuardian: localGuardianSchema.required(),

  isActive: Joi.string().valid('active', 'block').default('active'),
});
export default studentValidationJoiSchema;
