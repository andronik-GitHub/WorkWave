CREATE DATABASE WorkWave;

USE WorkWave;



CREATE TABLE Users (
	UserId CHAR(38) PRIMARY KEY DEFAULT(uuid()),
	Email NVARCHAR(256) UNIQUE NOT NULL,
	PasswordHash NVARCHAR(255) NOT NULL,
	UserName NVARCHAR(80) UNIQUE NOT NULL,
	`ProfileImage_Path` VARCHAR(1024),
    
	CreateDate DATETIME DEFAULT(now()),
    UpdateDate DATETIME
);

CREATE TABLE Projects (
	ProjectId CHAR(38) PRIMARY KEY DEFAULT(uuid()),
	ProjectName NVARCHAR(100) NOT NULL,
	ProjectDescription NVARCHAR(1000) NOT NULL,
    
	CreateDate DATETIME DEFAULT(now()),
    UpdateDate DATETIME
);

CREATE TABLE States (
	StateId CHAR(38) NOT NULL PRIMARY KEY DEFAULT(uuid()),
	Title NVARCHAR(20) UNIQUE NOT NULL,
	ProjectId CHAR(38) NOT NULL, 
	FOREIGN KEY (ProjectId) REFERENCES Projects(ProjectId),
    
	CreateDate DATETIME DEFAULT(now()),
    UpdateDate DATETIME
);

CREATE TABLE Sprints (
	SprintId CHAR(38) PRIMARY KEY DEFAULT(uuid()),
	ProjectId CHAR(38) NOT NULL, 
	SprintNumber INT NOT NULL,
	StartDate DATETIME NOT NULL,
	EndDate DATETIME NOT NULL,
    
    FOREIGN KEY (ProjectId) REFERENCES Projects(ProjectId),
    
	CreateDate DATETIME DEFAULT(now()),
    UpdateDate DATETIME
);

CREATE TABLE WorkItems (
	WorkItemId CHAR(38) PRIMARY KEY DEFAULT(uuid()),
	Title NVARCHAR(100) NOT NULL,
	`Description` NVARCHAR(1000) NOT NULL,
	StateId CHAR(38) NOT NULL, 
	ProjectId CHAR(38) NOT NULL, 
	UserId CHAR(38) NOT NULL, 
	SprintId CHAR(38) NOT NULL, 
    
    FOREIGN KEY (StateId) REFERENCES States(StateId),
    FOREIGN KEY (ProjectId) REFERENCES Projects(ProjectId),
    FOREIGN KEY (UserId) REFERENCES Users(UserId),
    FOREIGN KEY (SprintId) REFERENCES Sprints(SprintId),
    
	CreateDate DATETIME DEFAULT(now()),
    UpdateDate DATETIME
);

CREATE TABLE PerformanceHistories (
	HistoryId CHAR(38) PRIMARY KEY DEFAULT(uuid()),
	ProjectId CHAR(38) NOT NULL, 
	UserId CHAR(38) NOT NULL, 
	`Date` DATETIME DEFAULT(now()),
	`Description` NVARCHAR(1000) NOT NULL,
    
    FOREIGN KEY (ProjectId) REFERENCES Projects(ProjectId),
    FOREIGN KEY (UserId) REFERENCES Users(UserId),
    
	CreateDate DATETIME DEFAULT(now()),
    UpdateDate DATETIME
);

CREATE TABLE Tags (
	TagId CHAR(38) PRIMARY KEY DEFAULT(uuid()),
	TagName NVARCHAR(50) NOT NULL,
	TagColor NVARCHAR(6) NOT NULL,
	WorkItemId CHAR(38) NOT NULL,
    
    FOREIGN KEY (WorkItemId) REFERENCES WorkItems(WorkItemId),
    
	CreateDate DATETIME DEFAULT(now()),
    UpdateDate DATETIME
);

CREATE TABLE Comments (
	CommentId CHAR(38) PRIMARY KEY DEFAULT(uuid()),
	CommentText NVARCHAR(1000) NOT NULL,
	CommentDate DATETIME DEFAULT(now()),
	UserId CHAR(38) NOT NULL,
	WorkItemId CHAR(38) NOT NULL,
    
    FOREIGN KEY (UserId) REFERENCES Users(UserId), 
    FOREIGN KEY (WorkItemId) REFERENCES WorkItems(WorkItemId),
    
	CreateDate DATETIME DEFAULT(now()),
    UpdateDate DATETIME
);

CREATE TABLE Members (
	ProjectId CHAR(38) NOT NULL,
	UserId CHAR(38) NOT NULL, 
	PRIMARY KEY (ProjectId, UserId),
	FOREIGN KEY (ProjectId) REFERENCES Projects(ProjectId),
	FOREIGN KEY (UserId) REFERENCES Users(UserId),
    
	CreateDate DATETIME DEFAULT(now()),
    UpdateDate DATETIME
);
