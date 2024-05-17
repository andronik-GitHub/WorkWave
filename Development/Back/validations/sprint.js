import { body } from "express-validator";

export const createSprintValidation = [
    body('sprintNumber', 'Номер спринта повинен бути цифрою').isNumeric(),
    body('projectId', 'Введіть ідентифікатор проєкту').isUUID(),
    body('startDate', 'Введіть початок спринта').isDate(),
    body('endDate', 'Введіть кінець спринта').isDate()
];

export const updateSprintValidation = [
    body('sprintNumber', 'Номер спринта повинен бути цифрою').isNumeric(),
    body('projectId', 'Введіть ідентифікатор проєкту').isUUID(),
    body('startDate', 'Введіть початок спринта').isDate(),
    body('endDate', 'Введіть кінець спринта').isDate()
];