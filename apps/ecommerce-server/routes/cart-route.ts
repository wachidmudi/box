import { Router } from 'express';

import CartController from '../controllers/CartController';
import {
  authCustomer,
  authentication,
  authorizationCart,
} from '../middleware/auth';

const router = Router();

router.use(authentication);
router.use(authCustomer);

router.get('/', CartController.getCarts);
router.post('/', CartController.addCart);
router.put('/:id', authorizationCart, CartController.editCart);
router.delete('/:id', authorizationCart, CartController.deleteCart);

router.get('/checkout', CartController.checkout);
router.get('/transaction', CartController.getTransaction);

export default router;
