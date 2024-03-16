import { Router } from 'express';

import ProductController from '../controllers/ProductController';
import { authAdmin, authentication, authorization } from '../middleware/auth';

const router = Router();

router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getOneProduct);

router.use(authentication);
router.post('/', authAdmin, ProductController.postProduct);

router.put('/:id', authAdmin, authorization, ProductController.updateProduct);
router.delete(
  '/:id',
  authAdmin,
  authorization,
  ProductController.deleteProduct
);

export default router;
