import config from '../config';
import { USER_ROLE } from '../modules/user/user.contstant';
import { User } from '../modules/user/user.model';

const SuperAdminData = {
  id: '00000',
  email: 'miraj!2@gmail.com',
  password: config.super_admin_pass,
  role: USER_ROLE.super_admin,
  status: 'in-progress',
  isDeleted: false,
};

const seedSuperAdmin = async () => {
  const isSuperAdminExists = await User.findOne({
    role: USER_ROLE.super_admin,
  });

  if (!isSuperAdminExists) {
    await User.create(SuperAdminData);
  }
};
export default seedSuperAdmin;
