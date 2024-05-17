import { Sequelize } from "sequelize";
import { sequelizeConnectoin } from "../db_settings.js";

export const ProjectModel = sequelizeConnectoin.define(
    "Projects", 
    {
        projectId: {
            type: Sequelize.STRING(38),
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        projectName: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        projectDescription: {
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