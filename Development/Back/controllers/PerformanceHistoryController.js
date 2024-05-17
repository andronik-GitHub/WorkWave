import { PerformanceHistoryModel } from '../models/index.js';


export const getAll = async (req, res) => {
    try {
        const performanceHistories = await PerformanceHistoryModel.findAll({ raw: true });

        res.json(performanceHistories);
    }
    catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось переглянути історію діяльностей"
        });
    }
};

export const getById = async (req, res) => {
    try {
        const historyId = req.params.id;
        if (!historyId) {
            return res.status(404).json({
                success: false,
                message: 'Введіть ідентифікатор історії діяльності'
            });
        }

        const performanceHistory = await PerformanceHistoryModel.findOne({ where: { historyId: historyId } });
        if (!performanceHistory) {
            return res.status(404).json({
                success: false,
                message: 'Історію діяльності не знайдено'
            });
        }

        res.json({
            success: true,
            performanceHistory
        });
    }
    catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось знайти історію діяльності"
        });
    }
};

export const create = async (req, res) => {
    try {
        const performanceHistory = await PerformanceHistoryModel.create({
            userId: req.body.userId,
            projectId: req.body.projectId,
            date: req.body.date,
            description: req.body.description,
        });

        res.json({
            success: true,
            performanceHistory
        });
    }
    catch(err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось створити історію діяльності"
        });
    }
};

export const update = async (req, res) => {
    try {
        const historyId = req.body.historyId;
        if (!historyId) {
            return res.status(404).json({
                success: false,
                message: 'Введіть ідентифікатор історії діяльності'
            });
        }

        const performanceHistory = await PerformanceHistoryModel.findOne({ where: { historyId: historyId } });
        if (!performanceHistory) {
            return res.status(404).json({
                success: false,
                message: 'Історія діяльності не знайдено'
            });
        }

        performanceHistory.userId = req.body.userId;
        performanceHistory.projectId = req.body.projectId;
        performanceHistory.date = req.body.date;
        performanceHistory.description = req.body.description;
        performanceHistory.updateDate = Date.now();
        
        const result = await performanceHistory.save();
        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Не вдалось обновити історію діяльності'
            });
        }

        res.json({
            success: true,
            performanceHistory
        });
    }
    catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось обновити історію діяльності"
        });
    }
};

export const remove = async (req, res) => {
    try {
        const historyId = req.params.id;
        if (!historyId) {
            return res.status(404).json({
                success: false,
                message: 'Введіть ідентифікатор історії діяльності'
            });
        }

        const performanceHistory = await PerformanceHistoryModel.findOne({ where: { historyId: historyId } });
        if (!performanceHistory) {
            return res.status(404).json({
                success: false,
                message: 'Історію діяльності не знайдено'
            });
        }

        const result = await performanceHistory.destroy();
        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Не вдалось видалити історію діяльності'
            });
        }

        res.json({
            success: true,
            message: 'Історію діяльності успішно видалено'
        });
    }
    catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось знайти історію діяльності"
        });
    }
};