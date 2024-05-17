import { MemberModel } from '../models/index.js';


export const getAll = async (req, res) => {
    try {
        const members = await MemberModel.findAll({ raw: true });

        res.json(members);
    }
    catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось переглянути учасників"
        });
    }
};

export const getById = async (req, res) => {
    try {
        const userId = req.params.userId;
        const projectId = req.params.projectId;

        if (!userId || !projectId) {
            return res.status(404).json({
                success: false,
                message: 'Введіть ідентифікатори користувача та проєкта'
            });
        }

        const member = await MemberModel.findOne({ where: { userId: userId, projectId: projectId } });
        if (!member) {
            return res.status(404).json({
                success: false,
                message: 'Учасник не знайдений'
            });
        }

        res.json({
            success: true,
            member
        });
    }
    catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось знайти учасника"
        });
    }
};

export const create = async (req, res) => {
    try {
        const member = await MemberModel.create({
            userId: req.body.userId,
            projectId: req.body.projectId
        });

        res.json({
            success: true,
            member
        });
    }
    catch(err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось створити учасника"
        });
    }
};

export const remove = async (req, res) => {
    try {
        const userId = req.params.userId;
        const projectId = req.params.projectId;

        if (!userId || !projectId) {
            return res.status(404).json({
                success: false,
                message: 'Введіть ідентифікатори користувача та проєкта'
            });
        }

        const member = await MemberModel.findOne({ where: { userId: userId, projectId: projectId } });
        if (!member) {
            return res.status(404).json({
                success: false,
                message: 'Учасник не знайдений'
            });
        }

        const result = await member.destroy();
        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Не вдалось видалити учасника'
            });
        }

        res.json({
            success: true,
            message: 'Учасника успішно видалено'
        });
    }
    catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось знайти учасника"
        });
    }
};