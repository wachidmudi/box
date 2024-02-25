import { Router } from 'express';

import TodosController from '../controllers/TodosController';
import { authentication, authorization } from '../middleware/auth';

const router = Router();

router.use(authentication);
router.get('/', TodosController.getAll);
router.post('/', TodosController.create);
router.put('/:id', authorization, TodosController.update);
router.delete('/:id', authorization, TodosController.delete);

router.get('/images', TodosController.getImage);
router.put('/update-image/:id', authorization, TodosController.updateImage);
router.put('/update-color/:id', authorization, TodosController.updateColor);
router.put('/update-status/:id', authorization, TodosController.updateStatus);

export default router;
