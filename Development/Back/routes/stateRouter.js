import express from 'express';
import { StateController } from "../controllers/index.js";
import { createStateValidation, updateStateValidation } from '../validations/state.js';
import { handleValidationErrors, checkAuth } from "../utils/index.js";

const stateRouter = express.Router();

// CRUD States
stateRouter.get('/', StateController.getAll);
stateRouter.get('/:id', StateController.getById);
stateRouter.post('/create', checkAuth, createStateValidation, handleValidationErrors, StateController.create);
stateRouter.patch('/update', checkAuth, updateStateValidation, handleValidationErrors, StateController.update);
stateRouter.delete('/:id', StateController.remove);

stateRouter.get('/by-project/:id', StateController.getAllByProject);

export default stateRouter;