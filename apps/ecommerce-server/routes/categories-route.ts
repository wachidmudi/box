import { Router } from 'express';

import CategoriesController from '../controllers/CategoriesController';
import { authAdmin, authentication } from '../middleware/auth';

const router = Router();

router.get('/', CategoriesController.getCategories);

router.use(authentication);

router.post('/', authAdmin, CategoriesController.addCategories);
router.put('/:id', authAdmin, CategoriesController.updateCategories);
router.delete('/:id', authAdmin, CategoriesController.deleteCategories);

export default router;
