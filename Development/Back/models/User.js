import { Sequelize } from "sequelize";
import { sequelizeConnection } from "../db_settings.js";

export const UserModel = sequelizeConnection.define(
    "Users", 
    {
        userId: {
            type: Sequelize.STRING(38),
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING(256),
            allowNull: false
        },
        passwordHash: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        userName: {
            type: Sequelize.STRING(80),
            allowNull: false
        },
        profileImage_Path: {
            type: Sequelize.STRING(1024),
            allowNull: true
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