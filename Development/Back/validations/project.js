import { body } from "express-validator";

export const createProjectValidation = [
    body('projectName', 'Ім\'я проєкта повинно бути мінімум 5 символів').isLength({ min: 5 }).isString(),
    body('projectDescription', 'Введіть опис проєкта. Мінімум 3 символа').isLength({ min: 3 }).isString()
];

export const updateProjectValidation = [
    body('projectName', 'Ім\'я проєкта повинно бути мінімум 5 символів').isLength({ min: 5 }).isString(),
    body('projectDescription', 'Введіть опис проєкта. Мінімум 3 символа').isLength({ min: 3 }).isString()
];