import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AdminControllers } from './admin.controllers';
import { AdminValidationShcemas } from './admin.validation';

const router = express.Router();

router.get('/', AdminControllers.getAllAdmins);

router.get('/:id', AdminControllers.getSingleAdmin);

router.delete('/:id', AdminControllers.deleteAdmin);

router.put(
  '/:id',
  validateRequest(AdminValidationShcemas.updateAdminSchema),
  AdminControllers.updateAdminData,
);

export const AdminRoutes = router;
