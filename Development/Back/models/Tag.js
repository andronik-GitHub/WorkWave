import { Sequelize } from "sequelize";
import { sequelizeConnection } from "../db_settings.js";

export const TagModel = sequelizeConnection.define(
    "Tags", 
    {
        tagId: {
            type: Sequelize.STRING(38),
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false
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
        tagName: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        tagColor: {
            type: Sequelize.STRING(6),
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