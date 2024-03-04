import { Router } from 'express';

import TasksController from '../controllers/TasksController';

import { authentication, authorization } from '../middleware/auth';

const router = Router();

router.use(authentication);

router.get('/', TasksController.getTasks);
router.post('/', TasksController.addTasks);
router.put('/:id', authorization, TasksController.updateTasks);
router.delete('/:id', authorization, TasksController.deleteTasks);
router.put('/:id/category', authorization, TasksController.updateCategoryTask);

export default router;
