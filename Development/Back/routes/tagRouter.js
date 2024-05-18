import express from 'express';
import { TagController } from "../controllers/index.js";
import { createTagValidation, updateTagValidation } from '../validations/tag.js';
import { handleValidationErrors, checkAuth } from "../utils/index.js";

const tagRouter = express.Router();

// CRUD Tags
tagRouter.get('/', TagController.getAll);
tagRouter.get('/:id', TagController.getById);
tagRouter.post('/create', checkAuth, createTagValidation, handleValidationErrors, TagController.create);
tagRouter.patch('/update', checkAuth, updateTagValidation, handleValidationErrors, TagController.update);
tagRouter.delete('/:id', TagController.remove);

export default tagRouter;