import { body } from "express-validator";

export const createTagValidation = [
    body('workItemId', 'Введіть ідентифікатор робочого елемента').isUUID(),
    body('tagName', 'Введіть заголовок тега').isLength({ min: 5 }).isString(),
    body('tagColor', 'Введіть колір тега ').isLength({ min: 3, max: 6 }).isString()
];

export const updateTagValidation = [
    body('workItemId', 'Введіть ідентифікатор робочого елемента').isUUID(),
    body('tagName', 'Введіть заголовок тега').isLength({ min: 5 }).isString(),
    body('tagColor', 'Введіть колір тега ').isLength({ min: 3, max: 6 }).isString()
];