import { Sequelize } from "sequelize";
import { sequelizeConnection } from "../db_settings.js";

export const CommentModel = sequelizeConnection.define(
    "Comments", 
    {
        commentId: {
            type: Sequelize.STRING(38),
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        // foreign key
        userId: {
            type: Sequelize.STRING(38),
            allowNull: false,
            references: {
                model: 'Users',
                key: 'userId'
            }
        },
        // foreign key
        workItemId: {
            type: Sequelize.STRING(38),
            allowNull: false,
            references: {
                model: 'WorkItems',
                key: 'workItemId'
            }
        },
        commentText: {
            type: Sequelize.STRING(1000),
            allowNull: false
        },
        commentDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        createDate: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false
        },
        updateDate: {
            type: Sequelize.DATE,
            allowNull: true
        }
    },
    {
        freezeTableName: true
    }
);