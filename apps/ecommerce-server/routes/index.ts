import { Router } from 'express';

import HomeController from '../controllers/HomeController';
import UserController from '../controllers/UserController';

import cartRoute from './cart-route';
import categoriesRoute from './categories-route';
import productsRoute from './products-route';

const router = Router();

router.get('/', HomeController.home);

router.post('/register', UserController.register);
router.post('/login', UserController.login);

router.use('/products', productsRoute);
router.use('/categories', categoriesRoute);
router.use('/cart', cartRoute);

export default router;
