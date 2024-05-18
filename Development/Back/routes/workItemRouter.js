import express from 'express';
import { WorkItemController } from "../controllers/index.js";
import { createWorkItemValidation, updateWorkItemValidation } from '../validations/workItem.js';
import { handleValidationErrors, checkAuth } from "../utils/index.js";

const workItemRouter = express.Router();

// CRUD WorkItems
workItemRouter.get('/', WorkItemController.getAll);
workItemRouter.get('/:id', WorkItemController.getById);
workItemRouter.post('/create', checkAuth, createWorkItemValidation, handleValidationErrors, WorkItemController.create);
workItemRouter.patch('/update', checkAuth, updateWorkItemValidation, handleValidationErrors, WorkItemController.update);
workItemRouter.delete('/:id', WorkItemController.remove);

workItemRouter.get('/count-in-project/:id', checkAuth, WorkItemController.getCountByProjectId);
workItemRouter.get('/count-done-in-project/:id', checkAuth, WorkItemController.getCountOfDoneByProjectId);
workItemRouter.get('/items-in-progress/:id', checkAuth, WorkItemController.getWorkItemsInProgressCount);
workItemRouter.get('/by-project/:id', checkAuth, WorkItemController.getAllByProjectId);
workItemRouter.delete('/', checkAuth, WorkItemController.removeSomeItems);
workItemRouter.get('/by-sprint-user/:id', checkAuth, WorkItemController.getWorkItemsBySprintOrUser);
workItemRouter.get('/done-by-sprint-user/:id', checkAuth, WorkItemController.getDoneWorkItemsBySprintOrUser);
workItemRouter.get('/include-comments-tags/:id', checkAuth, WorkItemController.getByIdIncludeCommentsAndTags);
workItemRouter.get('/by-state/:id', checkAuth, WorkItemController.getWorkItemsByState);

export default workItemRouter;