import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { PerformanceHistoryModel, ProjectModel, StateModel, UserModel, WorkItemModel } from '../models/index.js';
import { Op } from 'sequelize';
import nodemailer from 'nodemailer';


export const getAll = async (req, res) => {
    try {
        const users = await UserModel.findAll({ raw: true });

        res.json(users);
    }
    catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось переглянути користувачів"
        });
    }
}

export const getById = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(404).json({
                success: false,
                message: 'Введіть ідентифікатор користувача'
            });
        }

        const user = await UserModel.findOne({ where: { userId: userId } });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Користувач не знайдений'
            });
        }


        const userWithoutPassword = user.toJSON();
        delete userWithoutPassword.passwordHash;

        res.json({
            success: true,
            userWithoutPassword
        });
    }
    catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось знайти користувача"
        });
    }
};

export const remove = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(404).json({
                success: false,
                message: 'Введіть ідентифікатор користувача'
            });
        }

        const user = await UserModel.findOne({ where: { userId: userId } });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Користувач не знайдений'
            });
        }

        const result = await user.destroy();
        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Не вдалось видалити користувача'
            });
        }

        res.json({
            success: true,
            message: 'Користувач успішно видалено'
        });
    }
    catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось знайти користувача"
        });
    }
};

export const update = async (req, res) => {
    try {
        const userId = req.body.userId;
        if (!userId) {
            return res.status(404).json({
                success: false,
                message: 'Введіть ідентифікатор користувача'
            });
        }

        const user = await UserModel.findOne({ where: { userId: userId } });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Користувача не знайдений'
            });
        }


        const isValidEmail = await UserModel.findOne({ where: { email: req.body.email } });
        const isValidPassword = await bcrypt.compare(req.body.password, user.passwordHash);

        if (!isValidPassword && !isValidEmail) {
            return res.status(400).json({
                success: false,
                message: 'Не вірний логін або пароль'
            });
        }

        
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        user.email = req.body.email ?? user.email;
        user.passwordHash = hash ?? user.passwordHash;
        user.userName = req.body.userName ?? user.userName;
        user.profileImage_Path = req.body.profileImage_Path ?? user.profileImage_Path;
        user.updateDate = Date.now();

        const result = await user.save();
        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Не вдалось обновити користувача'
            });
        }

        
        const userWithoutPassword = user.toJSON();
        delete userWithoutPassword.passwordHash;

        res.json({
            success: true,
            userWithoutPassword
        });
    }
    catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось обновити дані користувача"
        });
    }
}




export const register = async (req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await UserModel.create({
            email: req.body.email,
            passwordHash: hash,
            userName: (req.body.email + "").split('@')[0],
            profileImage_Path: req.body.profileImage_Path
        });

        const token = jwt.sign(
            { userId: user.userId },
            "HL34HO20ACO020HBNDPQ103J8NCOP",
            { expiresIn: "30d" },
        );

        const userWithoutPassword = user.toJSON();
        delete userWithoutPassword.passwordHash;

        res.json({ 
            success: true, 
            user: userWithoutPassword, 
            token 
        });
    }
    catch(err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось зареєструвати користувача"
        });
    }
};

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ where: { email: req.body.email } });

        if (!user) {
            return res.status(400).json({
                message: 'Не вірний логін або пароль'
            });
        }

        const isValidPassword = await bcrypt.compare(req.body.password, user.passwordHash);

        if (!isValidPassword) {
            return res.status(400).json({
                message: 'Не вірний логін або пароль'
            });
        }

        const token = jwt.sign(
            {
                userId: user.userId,
            },
            "HL34HO20ACO020HBNDPQ103J8NCOP",
            {
                expiresIn: '30d',
            },
        );


        const userWithoutPassword = user.toJSON();
        delete userWithoutPassword.passwordHash;

        res.json({
            success: true,
            user: userWithoutPassword,
            token
        });
    }
    catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось авторизуватись"
        });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const email = req.body.email;
        console.log(req.params);
        if (!email) {
            return res.status(404).json({
                success: false,
                message: 'Введіть електронну адресу'
            });
        }
        
        const user = await UserModel.findOne({ where: { email: req.body.email } });

        if (!user) {
            return res.status(400).json({
                message: 'Не вірно введено електронну пошту'
            });
        }


        let transporter = nodemailer.createTransport(
            {
                host: 'smtp.ethereal.email',
                port: 587,
                secure: false,
                auth: {
                    user: 'savion.conn28@ethereal.email',
                    pass: 'HMyDMrx2EpmNMDG7e5'
                },
                tls: {
                    rejectUnauthorized: false // Add this to ignore self-signed certificate
                }
            },
            {
                from: 'savion.conn28@ethereal.email',
            }
        );

        let mailOptions = {
            to: email,
            subject: 'Test Email from Node.js',
            html: `
            <form action="/reset-continue" method="post">
            <input type="hidden" name="email" value="${email}"/>
            For reset password go to <a href="http://localhost:3000/reset-continue">link</a>
            </form>
            `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);

                return res.json({
                    success: false,
                    error
                });
            }

            console.log('Email sent: ' + info.response);
            return res.json({
                success: true,
                result: info.response
            });
        });
    } 
    catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось відновити пароль"
        });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findOne({ where: { userId: req.userId }});

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Користувач не знайдений'
            });
        }

        const userWithoutPassword = user.toJSON();
        delete userWithoutPassword.passwordHash;

        res.json({
            success: true,
            user: userWithoutPassword
        });
    }
    catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось получити дані користувача"
        });
    }
};

export const getMyProjects = async (req, res) => {
    try {
        // Знайти всі проекти, до яких належить користувач
        const myProjects = await ProjectModel.findAll({
            include: [{
                model: UserModel,
                where: { userId: req.userId },
                attributes: [] // Виключаємо атрибути Users з результату
            }],
            raw: true
        });

        res.json(myProjects);
    }
    catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось переглянути проєкти користувача"
        });
    }
};

export const getActiveUsersCountToday = async (req, res) => {
    try {
        const projectId = req.params.id;
        if (!projectId) {
            return res.status(404).json({
                success: false,
                message: 'Введіть ідентифікатор проєкта'
            });
        }

        // Отримання сьогоднішньої дати
        const today = new Date();
        const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() -1, 0, 0, 0);
        const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 23, 59, 59);
        console.log(`${startDate} - ${endDate}`)

        // Запит до бази даних для підрахунку кількості активних користувачів сьогодні
        const count = await PerformanceHistoryModel.count({
            where: {
                date: {
                    [Op.between]: [startDate, endDate]
                },
                projectId: projectId
            },
            col: 'userId' // Підрахунок унікальних користувачів
        });

        res.json({
            success: true,
            count
        });
    }
    catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось отримати кількість активних користувачів сьогодні"
        });
    }
};

export const getItemsAssignedMe = async (req, res) => {
    try {
        // Отримання ідентифікатора поточного користувача з запиту
        const userId = req.userId;

        // Запит до бази даних для отримання робочих елементів, призначених поточному користувачеві
        const assignedWorkItems = await WorkItemModel.findAll({
            where: {
                userId: userId // Ідентифікатор поточного користувача
            }
        });

        // Підрахунок кількості робочих елементів, призначених поточному користувачеві
        const assignedWorkItemCount = assignedWorkItems.length;

        res.json({
            success: true,
            assignedWorkItemCount,
            assignedWorkItems
        });
    } catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось отримати робочі елементи, призначені вам"
        });
    }
};

export const getCompletionPercentage = async (req, res) => {
    try {
        // Отримання ідентифікатора поточного користувача з запиту (припустимо, що ідентифікатор проєкту передається параметром)
        const projectId = req.params.id;
        if (!projectId) {
            return res.status(404).json({
                success: false,
                message: 'Введіть ідентифікатор проєкта'
            });
        }

        // Запит до бази даних для підрахунку загальної кількості робочих елементів у поточному проєкті
        const totalWorkItemCount = await WorkItemModel.count({
            where: {
                projectId: projectId // Ідентифікатор поточного проєкту
            }
        });

        // Запит до бази даних для підрахунку кількості робочих елементів зі статусом "зроблено" у поточному проєкті
        const completedWorkItemCount = await WorkItemModel.count({
            where: {
                projectId: projectId, // Ідентифікатор поточного проєкту
            },
            include: [{
                model: StateModel,
                where: { title: "Done" },
                attributes: [] // Виключаємо атрибути Users з результату
            }]
        });

        // Обчислення відсотка зробленої роботи
        const completionPercentage = (completedWorkItemCount / totalWorkItemCount) * 100;

        res.json({
            success: true,
            completionPercentage
        });
    } catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось отримати відсоток зробленої роботи"
        });
    }
};
