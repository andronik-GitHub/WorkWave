import { body } from "express-validator";

export const registrationValidation = [
    body('email', 'Не вірний формат електронної адреси').isEmail(),
    body('password', 'Пароль повинен бути мінімум 5 символів').isLength({ min: 5 }),
    body('userName', 'Вказіть ім\'я користувача').optional().isLength({ min: 5 }),
    body('profileImage_Path', 'Не вірне посилання на аватарку').optional().isURL(),
];

export const loginValidation = [
    body('email', 'Не вірний формат електронної адреси').isEmail(),
    body('password', 'Пароль повинен бути мінімум 5 символів').isLength({ min: 5 })
];