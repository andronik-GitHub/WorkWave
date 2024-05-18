import { Sequelize } from "sequelize";
import { sequelizeConnection } from "../db_settings.js";

export const StateModel = sequelizeConnection.define(
    "States", 
    {
        stateId: {
            type: Sequelize.STRING(38),
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        // foreign key
        projectId: {
            type: Sequelize.STRING(38),
            allowNull: false,
            references: {
                model: 'Projects',
                key: 'projectId'
            }
        },
        title: {
            type: Sequelize.STRING(20),
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