export type TUser = {
  id: string;
  password: string;
  needsPasswordChanged: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};
