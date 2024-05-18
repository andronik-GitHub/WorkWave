import express from 'express';
import { UserController } from "../controllers/index.js";
import { handleValidationErrors, checkAuth } from "../utils/index.js";
import { loginValidation, registrationValidation } from '../validations/auth.js';

const authRouter = express.Router();

// authorization
authRouter.post('/login', loginValidation, handleValidationErrors, UserController.login);
authRouter.post('/registration', registrationValidation, handleValidationErrors, UserController.register);
authRouter.get('/me', checkAuth, UserController.getMe);
authRouter.get('/my-projects', checkAuth, UserController.getMyProjects);
authRouter.get('/count-active-users-today/:id', checkAuth, UserController.getActiveUsersCountToday);
authRouter.get('/items-assigned-me', checkAuth, UserController.getItemsAssignedMe);
authRouter.get('/completion-percentage/:id', checkAuth, UserController.getCompletionPercentage);

export default authRouter;