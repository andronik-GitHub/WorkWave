import express from 'express';
import { ProjectController } from "../controllers/index.js";
import { createProjectValidation, updateProjectValidation } from '../validations/project.js';
import { handleValidationErrors, checkAuth } from "../utils/index.js";

const projectRouter = express.Router();

// CRUD Projects
projectRouter.get('/', ProjectController.getAll);
projectRouter.get('/:id', ProjectController.getById);
projectRouter.post('/create', checkAuth, createProjectValidation, handleValidationErrors, ProjectController.create);
projectRouter.delete('/:id', checkAuth, ProjectController.remove);
projectRouter.patch('/update', checkAuth, updateProjectValidation, handleValidationErrors, ProjectController.update);

projectRouter.get('/members-count-by-projectId/:id', checkAuth, ProjectController.getMembersByProjectId);

export default projectRouter;