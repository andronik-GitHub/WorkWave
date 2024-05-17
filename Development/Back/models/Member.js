import { Sequelize } from "sequelize";
import { sequelizeConnectoin } from "../db_settings.js";

export const MemberModel = sequelizeConnectoin.define(
    "Members", 
    {
        // foreign key
        userId: {
            type: Sequelize.STRING(38),
            allowNull: false,
            primaryKey: true, // primaryKey
            references: {
                model: 'Users',
                key: 'userId'
            }
        },
        // foreign key
        projectId: {
            type: Sequelize.STRING(38),
            allowNull: false,
            primaryKey: true, // primaryKey
            references: {
                model: 'Projects',
                key: 'projectId'
            }
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