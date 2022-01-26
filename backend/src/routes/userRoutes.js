import { Router } from 'express';
import { registerUser,authUser,deleteUser } from '../controllers/userController.js';
import { admin,protect } from '../middlewares/authMiddlewares.js';

const router = Router();

router.post('/', registerUser);
router.post('/login', authUser);
router.delete('/:id',protect,admin,deleteUser);
//router.delete('/:id',deleteUser);

export default router;