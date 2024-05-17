import { Sequelize } from "sequelize";
import { sequelizeConnectoin } from "../db_settings.js";

export const PerformanceHistoryModel = sequelizeConnectoin.define(
    "PerformanceHistories", 
    {
        historyId: {
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
        // foreign key
        userId: {
            type: Sequelize.STRING(38),
            allowNull: false,
            references: {
                model: 'Users',
                key: 'userId'
            }
        },
        date: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING(1000),
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