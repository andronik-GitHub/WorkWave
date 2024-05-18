import { body } from "express-validator";

export const createCommentValidation = [
    body('workItemId', 'Введіть ідентифікатор робочого елемента').isUUID(),
    body('userId', 'Введіть ідентифікатор користувача').isUUID(),
    body('commentText', 'Введіть текст коментаря').isLength({ min: 5 }).isString(),
    body('commentDate', 'Введіть дату коментаря').isDate()
];

export const updateCommentValidation = [
    body('workItemId', 'Введіть ідентифікатор робочого елемента').isUUID(),
    body('userId', 'Введіть ідентифікатор користувача').isUUID(),
    body('commentText', 'Введіть текст коментаря').isLength({ min: 5 }).isString(),
    body('commentDate', 'Введіть дату коментаря').isDate()
];