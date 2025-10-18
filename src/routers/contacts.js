import { Router } from 'express';
import { upload } from '../middlewares/multer.js';

import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  upsertContactController,
  patchContactController,
} from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkContactOwner } from '../middlewares/checkContactOwner.js';

const router = Router();
router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));
router.get(
  '/:contactId',
  isValidId,
  checkContactOwner,
  ctrlWrapper(getContactByIdController),
);
router.post(
  '/',
  upload.single('photo'),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);
router.delete(
  '/:contactId',
  isValidId,
  checkContactOwner,
  ctrlWrapper(deleteContactController),
);
router.put(
  '/:contactId',
  isValidId,
  upload.single('photo'),
  checkContactOwner,
  ctrlWrapper(upsertContactController),
);
router.patch(
  '/:contactId',
  isValidId,
  upload.single('photo'),
  checkContactOwner,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

export default router;
