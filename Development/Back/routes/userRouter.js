import express from 'express';
import { UserController } from "../controllers/index.js";
import { updateUserValidation } from '../validations/user.js';
import { handleValidationErrors, checkAuth } from "../utils/index.js";

const userRouter = express.Router();

// CRUD Users
userRouter.get('/', UserController.getAll);
userRouter.get('/:id', UserController.getById);
userRouter.delete('/:id', UserController.remove);
userRouter.patch('/update', checkAuth, updateUserValidation, handleValidationErrors, UserController.update);

export default userRouter;