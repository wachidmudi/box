import { Router } from 'express';

import CategoriesController from '../controllers/CategoriesController';
import { authentication, authRole } from '../middleware/auth';

const router = Router();

router.use(authentication);

router.get('/', CategoriesController.getCategories);
router.post('/', authRole, CategoriesController.addCategories);
router.put('/:id', authRole, CategoriesController.updateCategories);
router.delete('/:id', authRole, CategoriesController.deleteCategories);

export default router;
