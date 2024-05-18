import { CommentModel } from '../models/index.js';


export const getAll = async (req, res) => {
    try {
        const comments = await CommentModel.findAll({ raw: true });

        res.json(comments);
    }
    catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось переглянути коментарі"
        });
    }
};

export const getById = async (req, res) => {
    try {
        const commentId = req.params.id;
        if (!commentId) {
            return res.status(404).json({
                success: false,
                message: 'Введіть ідентифікатор коментаря'
            });
        }

        const comment = await CommentModel.findOne({ where: { commentId: commentId } });
        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'Коментар не знайдено'
            });
        }

        res.json({
            success: true,
            comment
        });
    }
    catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось знайти коментар"
        });
    }
};

export const create = async (req, res) => {
    try {
        const comment = await CommentModel.create({
            userId: req.body.userId,
            workItemId: req.body.workItemId,
            commentText: req.body.commentText,
            commentDate: req.body.commentDate,
        });

        res.json({
            success: true,
            comment
        });
    }
    catch(err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось створити коментар"
        });
    }
};

export const update = async (req, res) => {
    try {
        const commentId = req.body.commentId;
        if (!commentId) {
            return res.status(404).json({
                success: false,
                message: 'Введіть ідентифікатор коментаря'
            });
        }

        const comment = await CommentModel.findOne({ where: { commentId: commentId } });
        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'Коментар не знайдено'
            });
        }

        comment.workItemId = req.body.workItemId;
        comment.userId = req.body.userId;
        comment.commentText = req.body.commentText;
        comment.commentDate = req.body.commentDate;
        comment.updateDate = Date.now();
        
        const result = await comment.save();
        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Не вдалось обновити коментар'
            });
        }

        res.json({
            success: true,
            comment
        });
    }
    catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось обновити коментар"
        });
    }
};

export const remove = async (req, res) => {
    try {
        const commentId = req.params.id;
        if (!commentId) {
            return res.status(404).json({
                success: false,
                message: 'Введіть ідентифікатор коментаря'
            });
        }

        const comment = await CommentModel.findOne({ where: { commentId: commentId } });
        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'Коментар не знайдено'
            });
        }

        const result = await comment.destroy();
        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Не вдалось видалити коментар'
            });
        }

        res.json({
            success: true,
            message: 'Коментар успішно видалено'
        });
    }
    catch (err) {
        console.error("Errors: ", err);

        res.status(500).json({
            success: false,
            message: "Не вдалось знайти коментар"
        });
    }
};