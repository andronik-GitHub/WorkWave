import { ProjectModel, UserModel } from "../models/index.js";


export const create = async (req, res) => {
    try {
        const project = await ProjectModel.create({
            projectName: req.body.projectName,
            projectDescription: req.body.projectDescription
        });

        res.json({
            success: true,
            project
        });
    }
    catch(err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось створити проєкт"
        });
    }
};

export const getAll = async (req, res) => {
    try {
        const projects = await ProjectModel.findAll({ raw: true });

        res.json(projects);
    }
    catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось переглянути проєкти"
        });
    }
};

export const getById = async (req, res) => {
    try {
        const projectId = req.params.id;
        if (!projectId) {
            return res.status(404).json({
                success: false,
                message: 'Введіть ідентифікатор проєкта'
            });
        }

        const project = await ProjectModel.findOne({ where: { projectId: projectId } });
        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Проєкт не знайдений'
            });
        }

        res.json({
            success: true,
            project
        });
    }
    catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось знайти проєкт"
        });
    }
};

export const remove = async (req, res) => {
    try {
        const projectId = req.params.id;
        if (!projectId) {
            return res.status(404).json({
                success: false,
                message: 'Введіть ідентифікатор проєкта'
            });
        }

        const project = await ProjectModel.findOne({ where: { projectId: projectId } });
        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Проєкт не знайдений'
            });
        }

        const result = await project.destroy();
        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Не вдалось видалити проєкт'
            });
        }

        res.json({
            success: true,
            message: 'Проєкт успішно видалено'
        });
    }
    catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось знайти проєкт"
        });
    }
};

export const update = async (req, res) => {
    try {
        const projectId = req.body.projectId;
        if (!projectId) {
            return res.status(404).json({
                success: false,
                message: 'Введіть ідентифікатор проєкта'
            });
        }

        const project = await ProjectModel.findOne({ where: { projectId: projectId } });
        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Проєкт не знайдений'
            });
        }

        project.projectName = req.body.projectName;
        project.projectDescription = req.body.projectDescription;
        project.updateDate = Date.now();
        
        const result = await project.save();
        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Не вдалось обновити проєкт'
            });
        }

        res.json({
            success: true,
            project
        });
    }
    catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось обновити проєкт"
        });
    }
};


export const getMembersByProjectId = async (req, res) => {
    try {
        const projectId = req.params.id;
        if (!projectId) {
            return res.status(404).json({
                success: false,
                message: 'Введіть ідентифікатор проєкта'
            });
        }

        // Отримати список учасників для заданого проекту
        const members = await ProjectModel.findAll({
            where: { projectId: projectId },
            include: [{ 
                model: UserModel,
                attributes: [] 
            }],
            raw: true,
        });

        if (!members) {
            return res.status(404).json({
                success: false,
                message: 'Учасники не знайдені'
            });
        }

        // Отримати кількість учасників
        const count = members.length;

        res.json({
            success: true,
            count,
            members
        });
    } catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось отримати учасників проєкта"
        });
    }
};
