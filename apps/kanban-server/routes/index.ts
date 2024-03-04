import { Router } from 'express';

import categoriesRoute from './categoriesRoute';
import tagsRoute from './tagsRoute';
import tasksRoute from './tasksRoute';
import usersRoute from './usersRoute';

import HomeController from '../controllers/HomeController';

const router = Router();

router.get('/', HomeController.home);
router.use('/users', usersRoute);
router.use('/tasks', tasksRoute);
router.use('/categories', categoriesRoute);
router.use('/tags', tagsRoute);

export default router;
