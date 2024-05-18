import { WorkItemModel } from '../models/index.js';


export const getAll = async (req, res) => {
    try {
        const workItems = await WorkItemModel.findAll({ raw: true });

        res.json(workItems);
    }
    catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось переглянути робочі елементи"
        });
    }
};

export const getById = async (req, res) => {
    try {
        const workItemId = req.params.id;
        if (!workItemId) {
            return res.status(404).json({
                success: false,
                message: 'Введіть ідентифікатор робочого елемента'
            });
        }

        const workItem = await WorkItemModel.findOne({ where: { workItemId: workItemId } });
        if (!workItem) {
            return res.status(404).json({
                success: false,
                message: 'Робочий елемент не знайдено'
            });
        }

        res.json({
            success: true,
            workItem
        });
    }
    catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось знайти робочий елемент"
        });
    }
};

export const create = async (req, res) => {
    try {
        const workItem = await WorkItemModel.create({
            userId: req.body.userId,
            projectId: req.body.projectId,
            sprintId: req.body.sprintId,
            stateId: req.body.stateId,
            title: req.body.title,
            description: req.body.description,
            state: req.body.state,
        });

        res.json({
            success: true,
            workItem
        });
    }
    catch(err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось створити робочий елемент"
        });
    }
};

export const update = async (req, res) => {
    try {
        const workItemId = req.body.workItemId;
        if (!workItemId) {
            return res.status(404).json({
                success: false,
                message: 'Введіть ідентифікатор робочого елемента'
            });
        }

        const workItem = await WorkItemModel.findOne({ where: { workItemId: workItemId } });
        if (!workItem) {
            return res.status(404).json({
                success: false,
                message: 'Робочий елемент не знайдено'
            });
        }

        workItem.userId = req.body.userId;
        workItem.projectId = req.body.projectId;
        workItem.sprintId = req.body.sprintId;
        workItem.stateId = req.body.stateId,
        workItem.title = req.body.title;
        workItem.description = req.body.description;
        workItem.state = req.body.state;
        workItem.updateDate = Date.now();
        
        const result = await workItem.save();
        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Не вдалось обновити робочий елемент'
            });
        }

        res.json({
            success: true,
            workItem
        });
    }
    catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось обновити робочий елемент"
        });
    }
};

export const remove = async (req, res) => {
    try {
        const workItemId = req.params.id;
        if (!workItemId) {
            return res.status(404).json({
                success: false,
                message: 'Введіть ідентифікатор робочого елемента'
            });
        }

        const workItem = await WorkItemModel.findOne({ where: { workItemId: workItemId } });
        if (!workItem) {
            return res.status(404).json({
                success: false,
                message: 'Робочий елемент не знайдено'
            });
        }

        const result = await workItem.destroy();
        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Не вдалось видалити робочий елемент'
            });
        }

        res.json({
            success: true,
            message: 'Робочий елемент успішно видалено'
        });
    }
    catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось знайти робочий елемент"
        });
    }
};