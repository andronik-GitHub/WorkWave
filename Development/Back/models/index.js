import { MemberModel } from "./Member.js";
import { PerformanceHistoryModel } from "./PerformanceHistory.js";
import { ProjectModel } from "./Project.js";
import { SprintModel } from "./Sprint.js";
import { UserModel } from "./User.js";
import { WorkItemModel } from "./WorkItem.js";
import { TagModel } from "./Tag.js";

// one-to-many - Projects-to-Sprints
ProjectModel.hasMany(SprintModel, { foreignKey: 'projectId' });
SprintModel.belongsTo(ProjectModel, { foreignKey: 'projectId' });

// many-to-many - Projects-to-Users (Members)
ProjectModel.belongsToMany(UserModel, { through: MemberModel, foreignKey: 'projectId' });
UserModel.belongsToMany(ProjectModel, { through: MemberModel, foreignKey: 'userId' });

// one-to-many - Users-to-PerformanceHistories
UserModel.hasMany(PerformanceHistoryModel, { foreignKey: 'userId' });
PerformanceHistoryModel.belongsTo(UserModel, { foreignKey: 'userId' });

// one-to-many - Project-to-PerformanceHistories
ProjectModel.hasMany(PerformanceHistoryModel, { foreignKey: 'projectId' });
PerformanceHistoryModel.belongsTo(ProjectModel, { foreignKey: 'projectId' });

// one-to-many - Projects-to-WorkItems
ProjectModel.hasMany(WorkItemModel, { foreignKey: 'projectId' });
WorkItemModel.belongsTo(ProjectModel, { foreignKey: 'projectId' });

// one-to-many - Users-to-WorkItems
UserModel.hasMany(WorkItemModel, { foreignKey: 'userId' });
WorkItemModel.belongsTo(UserModel, { foreignKey: 'userId' });

// one-to-many - Sprints-to-WorkItems
SprintModel.hasMany(WorkItemModel, { foreignKey: 'sprintId' });
WorkItemModel.belongsTo(SprintModel, { foreignKey: 'sprintId' });

// one-to-many - WorkItems-to-Tags
WorkItemModel.hasMany(TagModel, { foreignKey: 'workItemId' });
TagModel.belongsTo(WorkItemModel, { foreignKey: 'workItemId' });


export {
    ProjectModel, 
    SprintModel, 
    UserModel, 
    MemberModel, 
    PerformanceHistoryModel, 
    WorkItemModel,
    TagModel
}