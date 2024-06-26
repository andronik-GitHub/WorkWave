import { Sequelize } from "sequelize";
import { sequelizeConnection } from "../db_settings.js";

export const WorkItemModel = sequelizeConnection.define(
    "WorkItems", 
    {
        workItemId: {
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
        // foreign key
        sprintId: {
            type: Sequelize.STRING(38),
            allowNull: false,
            references: {
                model: 'Sprints',
                key: 'sprintId'
            }
        },
        // foreign key
        stateId: {
            type: Sequelize.STRING(38),
            allowNull: false,
            references: {
                model: 'States',
                key: 'stateId'
            }
        },
        title: {
            type: Sequelize.STRING(100),
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