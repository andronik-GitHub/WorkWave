import { Op } from 'sequelize';
import { sequelizeConnection } from '../db_settings.js';
import { SprintModel } from '../models/Sprint.js';


export const getAll = async (req, res) => {
    try {
        const sprints = await SprintModel.findAll({ raw: true });

        res.json(sprints);
    }
    catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось переглянути спрінти"
        });
    }
};

export const getById = async (req, res) => {
    try {
        const sprintId = req.params.id;
        if (!sprintId) {
            return res.status(404).json({
                success: false,
                message: 'Введіть ідентифікатор спрінта'
            });
        }

        const sprint = await SprintModel.findOne({ where: { sprintId: sprintId } });
        if (!sprint) {
            return res.status(404).json({
                success: false,
                message: 'Спрінт не знайдений'
            });
        }

        res.json({
            success: true,
            sprint
        });
    }
    catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось знайти спрінт"
        });
    }
};

export const create = async (req, res) => {
    try {
        const sprint = await SprintModel.create({
            sprintNumber: req.body.sprintNumber,
            projectId: req.body.projectId,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
        });

        res.json({
            success: true,
            sprint
        });
    }
    catch(err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось створити спрінт"
        });
    }
};

export const remove = async (req, res) => {
    try {
        const sprintId = req.params.id;
        if (!sprintId) {
            return res.status(404).json({
                success: false,
                message: 'Введіть ідентифікатор спрінта'
            });
        }

        const sprint = await SprintModel.findOne({ where: { sprintId: sprintId } });
        if (!sprint) {
            return res.status(404).json({
                success: false,
                message: 'Спрінт не знайдений'
            });
        }

        const result = await sprint.destroy();
        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Не вдалось видалити спрінт'
            });
        }

        res.json({
            success: true,
            message: 'Спрінт успішно видалено'
        });
    }
    catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось знайти спрінт"
        });
    }
};

export const update = async (req, res) => {
    try {
        const sprintId = req.body.sprintId;
        if (!sprintId) {
            return res.status(404).json({
                success: false,
                message: 'Введіть ідентифікатор спрінта'
            });
        }

        const sprint = await SprintModel.findOne({ where: { sprintId: sprintId } });
        if (!sprint) {
            return res.status(404).json({
                success: false,
                message: 'Спрінт не знайдений'
            });
        }

        sprint.sprintNumber = req.body.sprintNumber;
        sprint.projectId = req.body.projectId ?? sprint.projectId;
        sprint.startDate = req.body.startDate;
        sprint.endDate = req.body.endDate;
        sprint.updateDate = Date.now();
        
        const result = await sprint.save();
        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Не вдалось обновити спрінт'
            });
        }

        res.json({
            success: true,
            sprint
        });
    }
    catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось обновити спрінт"
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

        const count = await SprintModel.count({ raw: true, where: { projectId: projectId }});
        if (!count) {
            return res.status(404).json({
                success: false,
                message: 'Кількість спринтів не знайдено'
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
            message: "Не вдалось знайти кількість спринтів"
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

        const count = await SprintModel.count({ 
            raw: true, 
            where: { 
                projectId: projectId,
                endDate: {
                    [Op.lt]: new Date()
                }
            }
        });
        if (!count) {
            return res.status(404).json({
                success: false,
                message: 'Кількість спринтів не знайдено'
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
            message: "Не вдалось знайти кількість спринтів"
        });
    }
};

export const getActiveSprint = async (req, res) => {
    try {
        const projectId = req.params.id;
        if (!projectId) {
            return res.status(404).json({
                success: false,
                message: 'Введіть ідентифікатор проєкта'
            });
        }

        const sprint = await SprintModel.findOne({
            where: {
                projectId: projectId, // ID поточного проєкту
                startDate: { [Op.lt]: new Date() }, // Початок спрінта менше за поточну дату і час
                endDate: { [Op.gt]: new Date() }, // Кінець спрінта більше за поточну дату і час
            },
            order: [['startDate', 'DESC']] // Сортування за датою початку спрінта у зворотньому порядку, щоб отримати останній спрінт
        });
        if (!sprint) {
            return res.status(404).json({
                success: false,
                message: 'Поточний спринт не знайдено'
            });
        }

        res.json({
            success: true,
            sprint
        });
    }
    catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось знайти поточний спринт"
        });
    }
};

export const getSprintsByProject = async (req, res) => {
    try {
        // Отримання ідентифікатора проєкту з параметрів запиту
        const projectId = req.params.id;

        // Запит до бази даних для отримання всіх спринтів, пов'язаних з цим проєктом
        const sprints = await SprintModel.findAll({ raw: true, where: { projectId: projectId }});

        // Перевірка, чи знайдені спринти
        if (!sprints) {
            return res.status(404).json({
                success: false,
                message: 'Спринти не знайдено'
            });
        }

        // Відправлення відповіді з переліком спринтів
        res.json({
            success: true,
            sprints
        });
    } catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: 'Не вдалось отримати спринти проєкту'
        });
    }
};
