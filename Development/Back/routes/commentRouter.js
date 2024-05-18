import express from 'express';
import { CommentController } from "../controllers/index.js";
import { createCommentValidation, updateCommentValidation } from '../validations/comment.js';
import { handleValidationErrors, checkAuth } from "../utils/index.js";

const commentRouter = express.Router();

// CRUD Comments
commentRouter.get('/', CommentController.getAll);
commentRouter.get('/:id', CommentController.getById);
commentRouter.post('/create', checkAuth, createCommentValidation, handleValidationErrors, CommentController.create);
commentRouter.patch('/update', checkAuth, updateCommentValidation, handleValidationErrors, CommentController.update);
commentRouter.delete('/:id', CommentController.remove);

export default commentRouter;