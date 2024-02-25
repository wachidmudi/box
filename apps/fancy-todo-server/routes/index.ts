import { Router } from 'express';

import todosRoute from './todos-route';
import usersRoute from './users-route';

import HomeController from '../controllers/HomeController';

const router = Router();

router.get('/', HomeController.home);
router.use('/users', usersRoute);
router.use('/todos', todosRoute);

export default router;
