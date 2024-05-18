import { body } from "express-validator";

export const createStateValidation = [
    body('title', 'Введіть заголовок стана').isLength({ min: 2 }).isString(),
    body('projectId', 'Введіть ідентифікатор проєкту').isUUID()
];

export const updateStateValidation = [
    body('title', 'Введіть заголовок стана').isLength({ min: 2 }).isString(),
    body('projectId', 'Введіть ідентифікатор проєкту').isUUID()
];