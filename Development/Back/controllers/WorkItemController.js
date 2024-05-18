import { Op, Sequelize } from 'sequelize';
import { CommentModel, StateModel, TagModel, WorkItemModel } from '../models/index.js';


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



export const getCountByProjectId = async (req, res) => {
    try {
        const projectId = req.params.id;
        if (!projectId) {
            return res.status(404).json({
                success: false,
                message: 'Введіть ідентифікатор проєкта'
            });
        }

        const count = await WorkItemModel.count({ raw: true, where: { projectId: projectId }});
        if (!count) {
            return res.status(404).json({
                success: false,
                message: 'Кількість робочих елементів не знайдено'
            });
        }

        res.json({
            success: true,
            count
        });
    }
    catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось знайти кількість робочих елементів"
        });
    }
};

export const getCountOfDoneByProjectId = async (req, res) => {
    try {
        const projectId = req.params.id;
        if (!projectId) {
            return res.status(404).json({
                success: false,
                message: 'Введіть ідентифікатор проєкта'
            });
        }

        const count = await WorkItemModel.count({ 
            raw: true, 
            where: { projectId: projectId },
            include: [{
                model: StateModel,
                where: { title: 'Done' },
                attributes: [] // Виключаємо атрибути States з результату
            }]
        });
        if (!count) {
            return res.status(404).json({
                success: false,
                message: 'Кількість робочих елементів не знайдено'
            });
        }

        res.json({
            success: true,
            count
        });
    }
    catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось знайти кількість робочих елементів"
        });
    }
};

export const getWorkItemsInProgressCount = async (req, res) => {
    try {
        const projectId = req.params.id;
        if (!projectId) {
            return res.status(404).json({
                success: false,
                message: 'Введіть ідентифікатор проєкта'
            });
        }

        // Отримання ідентифікаторів станів "Done" і "New"
        const doneState = await StateModel.findOne({ where: { title: 'Done', projectId: projectId } });
        const newState = await StateModel.findOne({ where: { title: 'New', projectId: projectId } });

        if (!doneState || !newState) {
            return res.status(404).json({
                success: false,
                message: 'Стани "Done" або "New" не знайдені для даного проєкта'
            });
        }

        // Запит до бази даних для отримання кількості робочих елементів в розробці
        const count = await WorkItemModel.count({
            where: {
                projectId: projectId,
                stateId: { [Op.notIn]: [doneState.stateId, newState.stateId] } // Виключаємо стани "Done" і "new"
            }
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
            message: "Не вдалось отримати кількість робочих елементів в розробці"
        });
    }
};

export const getAllByProjectId = async (req, res) => {
    try {
        const projectId = req.params.id;
        if (!projectId) {
            return res.status(404).json({
                success: false,
                message: 'Введіть ідентифікатор проєкта'
            });
        }

        const workItems = await WorkItemModel.findAll({ raw: true, where: { projectId: projectId }});

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

export const removeSomeItems = async (req, res) => {
    try {
        const ids = req.body.ids;
        if (!ids || !Array.isArray(ids)) {
            return res.status(400).json({
                success: false,
                message: 'Введіть ідентифікатори робочих елементів у форматі масиву'
            });
        }

        // Перевірка, чи існують робочі елементи з вказаними ідентифікаторами
        const workItems = await WorkItemModel.findAll({ where: { workItemId: ids } });
        if (workItems.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Робочі елементи не знайдено'
            });
        }

        // Видалення робочих елементів
        const result = await WorkItemModel.destroy({ where: { workItemId: ids } });

        if (!result) {
            return res.status(500).json({
                success: false,
                message: 'Не вдалось видалити робочі елементи'
            });
        }

        res.json({
            success: true,
            message: 'Робочі елементи успішно видалено'
        });
    } catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: 'Не вдалось знайти робочі елементи'
        });
    }
};

export const getWorkItemsBySprintOrUser = async (req, res) => {
    try {
        const projectId = req.params.id;
        if (!projectId) {
            return res.status(404).json({
                success: false,
                message: 'Введіть ідентифікатор проєкта'
            });
        }
        
        // Отримання ідентифікатора спринта та користувача з параметрів запиту
        const sprintId = req.body.sprintId;
        const userId = req.body.userId;
        if (!sprintId && !userId) {
            return res.status(404).json({
                success: false,
                message: 'Введіть ідентифікатори спринта або користувача'
            });
        }


        // Запит до бази даних для отримання робочих елементів за умовами
        let workItems;
        if (sprintId && userId)
            workItems = await WorkItemModel.findAll({ 
                raw: true,
                where: {
                    sprintId: sprintId,
                    userId: userId
                }
            });
        else if (sprintId && !userId)
            workItems = await WorkItemModel.findAll({ 
                raw: true,
                where: {
                    sprintId: sprintId
                }
            });
        else if (!sprintId && userId)
            workItems = await WorkItemModel.findAll({ 
                raw: true,
                where: {
                    userId: userId
                }
            });

        // Перевірка, чи знайдені робочі елементи
        if (!workItems) {
            return res.status(404).json({
                success: false,
                message: 'Робочі елементи не знайдено'
            });
        }

        res.json({
            success: true,
            count: workItems.length,
            workItems
        });
    } catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: 'Не вдалось отримати робочі елементи'
        });
    }
};

export const getDoneWorkItemsBySprintOrUser = async (req, res) => {
    try {
        const projectId = req.params.id;
        if (!projectId) {
            return res.status(404).json({
                success: false,
                message: 'Введіть ідентифікатор проєкта'
            });
        }
        
        // Отримання ідентифікатора спринта та користувача з параметрів запиту
        const sprintId = req.body.sprintId;
        const userId = req.body.userId;
        if (!sprintId && !userId) {
            return res.status(404).json({
                success: false,
                message: 'Введіть ідентифікатори спринта або користувача'
            });
        }


        // Запит до бази даних для отримання робочих елементів за умовами
        let workItems;
        if (sprintId && userId)
            workItems = await WorkItemModel.findAll({ 
                raw: true,
                where: {
                    sprintId: sprintId,
                    userId: userId
                },
                include: [{
                    model: StateModel,
                    where: { title: 'Done' },
                    attributes: [] // Виключаємо атрибути States з результату
                }]
            });
        else if (sprintId && !userId)
            workItems = await WorkItemModel.findAll({ 
                raw: true,
                where: {
                    sprintId: sprintId
                },
                include: [{
                    model: StateModel,
                    where: { title: 'Done' },
                    attributes: [] // Виключаємо атрибути States з результату
                }]
            });
        else if (!sprintId && userId)
            workItems = await WorkItemModel.findAll({ 
                raw: true,
                where: {
                    userId: userId
                },
                include: [{
                    model: StateModel,
                    where: { title: 'Done' },
                    attributes: [] // Виключаємо атрибути States з результату
                }]
            });

        // Перевірка, чи знайдені робочі елементи
        if (!workItems) {
            return res.status(404).json({
                success: false,
                message: 'Робочі елементи не знайдено'
            });
        }

        res.json({
            success: true,
            count: workItems.length
        });
    } catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: 'Не вдалось отримати робочі елементи'
        });
    }
};

export const getByIdIncludeCommentsAndTags = async (req, res) => {
    try {
        const workItemId = req.params.id;
        if (!workItemId) {
            return res.status(404).json({
                success: false,
                message: 'Введіть ідентифікатор робочого елемента'
            });
        }

        const workItem = await WorkItemModel.findOne({ 
            where: { workItemId: workItemId },
            include: [
                {
                    model: CommentModel
                },
                {
                    model: TagModel
                }
            ]
        });
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

export const getWorkItemsByState = async (req, res) => {
    try {
        // Отримання ідентифікатора проекту з параметрів запиту
        const projectId = req.params.id;
        if (!projectId) {
            return res.status(404).json({
                success: false,
                message: 'Введіть ідентифікатор робочого елемента'
            });
        }

        // Запит до бази даних для підрахунку робочих елементів за станом
        const workItemsByState = await WorkItemModel.findAll({
            where: { projectId: projectId },
            attributes: [
                'stateId',
                [Sequelize.fn('COUNT', Sequelize.col('workItemId')), 'workItemCount']
            ],
            group: ['stateId'],
            include: [{
                model: StateModel,
                attributes: ['title']
            }]
        });

        // Форматування результатів
        const result = workItemsByState.map(item => ({
            state: item.State.title,
            count: item.dataValues.workItemCount
        }));

        res.json({
            success: true,
            data: result
        });
    } catch (err) {
        console.error("Errors: ", err);
        res.status(500).json({
            success: false,
            message: "Не вдалося отримати робочі елементи за станом"
        });
    }
};