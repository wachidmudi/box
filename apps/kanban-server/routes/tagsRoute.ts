import { Router } from 'express';

import TagsController from '../controllers/TagsController';
import { authentication, authRole } from '../middleware/auth';

const router = Router();

router.use(authentication);

router.get('/', TagsController.getTags);
router.post('/', authRole, TagsController.addTags);
router.put('/:id', authRole, TagsController.updateTags);
router.delete('/:id', authRole, TagsController.deleteTags);

export default router;
