import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/index.js';


export const register = async (req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await UserModel.create({
            email: req.body.email,
            passwordHash: hash,
            userName: req.body.userName,
            profileImage_Path: req.body.profileImage_Path
        });

        const token = jwt.sign(
            {
                userId: user.userId
            },
            "HL34HO20ACO020HBNDPQ103J8NCOP",
            {
                expiresIn: "30d",
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

        user.email = req.body.email;
        user.passwordHash = hash;
        user.userName = req.body.userName;
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