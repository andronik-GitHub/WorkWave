import { StateModel } from '../models/State.js';


export const getAll = async (req, res) => {
    try {
        const states = await StateModel.findAll({ raw: true });

        res.json(states);
    }
    catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось переглянути стани"
        });
    }
};

export const getById = async (req, res) => {
    try {
        const stateId = req.params.id;
        if (!stateId) {
            return res.status(404).json({
                success: false,
                message: 'Введіть ідентифікатор стана'
            });
        }

        const state = await StateModel.findOne({ where: { stateId: stateId } });
        if (!state) {
            return res.status(404).json({
                success: false,
                message: 'Стан не знайдений'
            });
        }

        res.json({
            success: true,
            state
        });
    }
    catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось знайти стан"
        });
    }
};

export const create = async (req, res) => {
    try {
        const state = await StateModel.create({
            title: req.body.title,
            projectId: req.body.projectId
        });

        res.json({
            success: true,
            state
        });
    }
    catch(err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось створити стан"
        });
    }
};

export const remove = async (req, res) => {
    try {
        const stateId = req.params.id;
        if (!stateId) {
            return res.status(404).json({
                success: false,
                message: 'Введіть ідентифікатор стана'
            });
        }

        const state = await StateModel.findOne({ where: { stateId: stateId } });
        if (!state) {
            return res.status(404).json({
                success: false,
                message: 'Стан не знайдений'
            });
        }
        else if ((state.title + "").toLowerCase() === 'new') {
            return res.status(400).json({
                success: false,
                message: 'Видалення стану заборонено'
            });
        }

        const result = await state.destroy();
        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Не вдалось видалити стан'
            });
        }

        res.json({
            success: true,
            message: 'Стан успішно видалено'
        });
    }
    catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось знайти Стан"
        });
    }
};

export const update = async (req, res) => {
    try {
        const stateId = req.body.stateId;
        if (!stateId) {
            return res.status(404).json({
                success: false,
                message: 'Введіть ідентифікатор стана'
            });
        }

        const state = await StateModel.findOne({ where: { stateId: stateId } });
        if (!state) {
            return res.status(404).json({
                success: false,
                message: 'Стан не знайдений'
            });
        }
        else if ((state.title + "").toLowerCase() === 'new') {
            return res.status(400).json({
                success: false,
                message: 'Редагування стану заборонено'
            });
        }

        state.title = req.body.title;
        state.projectId = req.body.projectId;
        state.updateDate = Date.now();
        
        const result = await state.save();
        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Не вдалось обновити стан'
            });
        }

        res.json({
            success: true,
            state
        });
    }
    catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось обновити стан"
        });
    }
};



export const getAllByProject = async (req, res) => {
    try {
        const projectId = req.params.id;
        if (!projectId) {
            return res.status(404).json({
                success: false,
                message: 'Введіть ідентифікатор робочого елемента'
            });
        }

        const states = await StateModel.findAll({ raw: true, where: { projectId: projectId } });

        res.json(states);
    }
    catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось переглянути стани"
        });
    }
};