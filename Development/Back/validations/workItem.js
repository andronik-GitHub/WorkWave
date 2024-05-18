import { body } from "express-validator";

export const createWorkItemValidation = [
    body('userId', 'Введіть ідентифікатор користувача').isUUID(),
    body('projectId', 'Введіть ідентифікатор проєкту').isUUID(),
    body('sprintId', 'Введіть ідентифікатор спринта').isUUID(),
    body('stateId', 'Введіть ідентифікатор стана').isUUID(),
    body('title', 'Введіть заголовок робочого елемента').isLength({ min: 5 }).isString(),
    body('description', 'Введіть опис робочого елемента').isLength({ min: 5 }).isString(),
    body('state', 'Введіть стан робочого елемента').isLength({ min: 3 }).isString()
];

export const updateWorkItemValidation = [
    body('userId', 'Введіть ідентифікатор користувача').isUUID(),
    body('projectId', 'Введіть ідентифікатор проєкту').isUUID(),
    body('sprintId', 'Введіть ідентифікатор спринта').isUUID(),
    body('stateId', 'Введіть ідентифікатор стана').isUUID(),
    body('title', 'Введіть заголовок робочого елемента').isLength({ min: 5 }).isString(),
    body('description', 'Введіть опис робочого елемента').isLength({ min: 5 }).isString(),
    body('state', 'Введіть стан робочого елемента').isLength({ min: 3 }).isString()
];