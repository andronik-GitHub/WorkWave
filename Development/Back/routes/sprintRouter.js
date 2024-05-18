import express from 'express';
import { SprintController } from "../controllers/index.js";
import { createSprintValidation, updateSprintValidation } from '../validations/sprint.js';
import { handleValidationErrors, checkAuth } from "../utils/index.js";

const sprintRouter = express.Router();

// CRUD Sprints
sprintRouter.get('/', SprintController.getAll);
sprintRouter.get('/:id', SprintController.getById);
sprintRouter.post('/create', checkAuth, createSprintValidation, handleValidationErrors, SprintController.create);
sprintRouter.patch('/update', checkAuth, updateSprintValidation, handleValidationErrors, SprintController.update);
sprintRouter.delete('/:id', checkAuth, SprintController.remove);

sprintRouter.get('/count-in-project/:id', checkAuth, SprintController.getCountByProjectId);
sprintRouter.get('/count-done-in-project/:id', checkAuth, SprintController.getCountOfDoneByProjectId);
sprintRouter.get('/active-sprint/:id', checkAuth, SprintController.getActiveSprint);
sprintRouter.get('/by-project/:id', checkAuth, SprintController.getSprintsByProject);

export default sprintRouter;