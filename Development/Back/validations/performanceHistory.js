import { body } from "express-validator";

export const createPerformanceHistoryValidation = [
    body('userId', 'Введіть ідентифікатор користувача').isUUID(),
    body('projectId', 'Введіть ідентифікатор проєкту').isUUID(),
    body('date', 'Введіть дату дії').optional().isISO8601(),
    body('description', 'Введіть опис дії').isLength({ min: 5 }).isString()
];

export const updatePerformanceHistoryValidation = [
    body('userId', 'Введіть ідентифікатор користувача').isUUID(),
    body('projectId', 'Введіть ідентифікатор проєкту').isUUID(),
    body('date', 'Введіть дату дії').optional().isISO8601(),
    body('description', 'Введіть опис дії').isLength({ min: 5 }).isString()
];