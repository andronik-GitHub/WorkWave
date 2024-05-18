import express from 'express';
import { PerformanceHistoryController } from "../controllers/index.js";
import { createPerformanceHistoryValidation, updatePerformanceHistoryValidation } from '../validations/performanceHistory.js';
import { handleValidationErrors, checkAuth } from "../utils/index.js";

const performanceHistoryRouter = express.Router();

// CRUD PerformanceHistories
performanceHistoryRouter.get('/', PerformanceHistoryController.getAll);
performanceHistoryRouter.get('/:id', PerformanceHistoryController.getById);
performanceHistoryRouter.post(
    '/create', 
    checkAuth, 
    createPerformanceHistoryValidation, 
    handleValidationErrors, 
    PerformanceHistoryController.create
);
performanceHistoryRouter.patch(
    '/update', 
    checkAuth, 
    updatePerformanceHistoryValidation, 
    handleValidationErrors, 
    PerformanceHistoryController.update
);
performanceHistoryRouter.delete('/:id', checkAuth, PerformanceHistoryController.remove);

performanceHistoryRouter.get('/by-project/:id', checkAuth, PerformanceHistoryController.getAllByProjectId);

export default performanceHistoryRouter;