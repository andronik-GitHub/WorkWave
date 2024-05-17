import { TagModel } from '../models/index.js';


export const getAll = async (req, res) => {
    try {
        const tags = await TagModel.findAll({ raw: true });

        res.json(tags);
    }
    catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось переглянути теги"
        });
    }
};

export const getById = async (req, res) => {
    try {
        const tagId = req.params.id;
        if (!tagId) {
            return res.status(404).json({
                success: false,
                message: 'Введіть ідентифікатор тега'
            });
        }

        const tag = await TagModel.findOne({ where: { tagId: tagId } });
        if (!tag) {
            return res.status(404).json({
                success: false,
                message: 'Тег не знайдено'
            });
        }

        res.json({
            success: true,
            tag
        });
    }
    catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось знайти тег"
        });
    }
};

export const create = async (req, res) => {
    try {
        const tag = await TagModel.create({
            workItemId: req.body.workItemId,
            tagName: req.body.tagName,
            tagColor: req.body.tagColor,
        });

        res.json({
            success: true,
            tag
        });
    }
    catch(err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось створити тег"
        });
    }
};

export const update = async (req, res) => {
    try {
        const tagId = req.body.tagId;
        if (!tagId) {
            return res.status(404).json({
                success: false,
                message: 'Введіть ідентифікатор тега'
            });
        }

        const tag = await TagModel.findOne({ where: { tagId: tagId } });
        if (!tag) {
            return res.status(404).json({
                success: false,
                message: 'Тег не знайдено'
            });
        }

        tag.workItemId = req.body.workItemId;
        tag.tagName = req.body.tagName;
        tag.tagColor = req.body.tagColor;
        tag.updateDate = Date.now();
        
        const result = await tag.save();
        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Не вдалось обновити тег'
            });
        }

        res.json({
            success: true,
            tag
        });
    }
    catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось обновити тег"
        });
    }
};

export const remove = async (req, res) => {
    try {
        const tagId = req.params.id;
        if (!tagId) {
            return res.status(404).json({
                success: false,
                message: 'Введіть ідентифікатор тега'
            });
        }

        const tag = await TagModel.findOne({ where: { tagId: tagId } });
        if (!tag) {
            return res.status(404).json({
                success: false,
                message: 'Тег не знайдено'
            });
        }

        const result = await tag.destroy();
        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Не вдалось видалити тег'
            });
        }

        res.json({
            success: true,
            message: 'Тег успішно видалено'
        });
    }
    catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось знайти тег"
        });
    }
};