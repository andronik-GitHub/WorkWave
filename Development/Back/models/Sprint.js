import { Sequelize } from "sequelize";
import { sequelizeConnectoin } from "../db_settings.js";

export const SprintModel = sequelizeConnectoin.define(
    "Sprints", 
    {
        sprintId: {
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
        sprintNumber: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        startDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        endDate: {
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