import { body } from "express-validator";

export const createMemberValidation = [
    body('projectId', 'Введіть ідентифікатор проєкту').isUUID(),
    body('userId', 'Введіть ідентифікатор користувача').isUUID()
];