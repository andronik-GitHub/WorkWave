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



INSERT INTO Users (UserId, Email, PasswordHash, UserName, ProfileImage_Path, CreateDate, UpdateDate) 
VALUES 
('01b74f20-52cf-4cce-8713-82b1737ced71', 'user1@example.com', '$2b$10$Fjnae1pD5TOfncwR2J8MHOUp8AQ0KSuJuvFFtO7.0cTSn3eJM4LDy', 'User1', NULL, NOW(), NULL),
('01b74f20-52cf-4cce-8713-82b1737ced72', 'user2@example.com', '$2b$10$Fjnae1pD5TOfncwR2J8MHOUp8AQ0KSuJuvFFtO7.0cTSn3eJM4LDy', 'User2', '/path/to/image2', NOW(), NULL),
('01b74f20-52cf-4cce-8713-82b1737ced73', 'user3@example.com', '$2b$10$Fjnae1pD5TOfncwR2J8MHOUp8AQ0KSuJuvFFtO7.0cTSn3eJM4LDy', 'User3', NULL, NOW(), NULL),
('01b74f20-52cf-4cce-8713-82b1737ced74', 'user4@example.com', '$2b$10$Fjnae1pD5TOfncwR2J8MHOUp8AQ0KSuJuvFFtO7.0cTSn3eJM4LDy', 'User4', '/path/to/image2', NOW(), NULL),
('01b74f20-52cf-4cce-8713-82b1737ced75', 'user5@example.com', '$2b$10$Fjnae1pD5TOfncwR2J8MHOUp8AQ0KSuJuvFFtO7.0cTSn3eJM4LDy', 'User5', NULL, NOW(), NULL),
('01b74f20-52cf-4cce-8713-82b1737ced76', 'user6@example.com', '$2b$10$Fjnae1pD5TOfncwR2J8MHOUp8AQ0KSuJuvFFtO7.0cTSn3eJM4LDy', 'User6', '/path/to/image2', NOW(), NULL),
('01b74f20-52cf-4cce-8713-82b1737ced77', 'user7@example.com', '$2b$10$Fjnae1pD5TOfncwR2J8MHOUp8AQ0KSuJuvFFtO7.0cTSn3eJM4LDy', 'User7', NULL, NOW(), NULL),
('01b74f20-52cf-4cce-8713-82b1737ced78', 'user8@example.com', '$2b$10$Fjnae1pD5TOfncwR2J8MHOUp8AQ0KSuJuvFFtO7.0cTSn3eJM4LDy', 'User8', '/path/to/image2', NOW(), NULL),
('01b74f20-52cf-4cce-8713-82b1737ced79', 'user9@example.com', '$2b$10$Fjnae1pD5TOfncwR2J8MHOUp8AQ0KSuJuvFFtO7.0cTSn3eJM4LDy', 'User9', NULL, NOW(), NULL),
('01b74f20-52cf-4cce-8713-82b1737ced80', 'user10@example.com', '$2b$10$Fjnae1pD5TOfncwR2J8MHOUp8AQ0KSuJuvFFtO7.0cTSn3eJM4LDy', 'User10', '/path/to/image2', NOW(), NULL),
('01b74f20-52cf-4cce-8713-82b1737ced81', 'user11@example.com', '$2b$10$Fjnae1pD5TOfncwR2J8MHOUp8AQ0KSuJuvFFtO7.0cTSn3eJM4LDy', 'User11', '/path/to/image2', NOW(), NULL),
('01b74f20-52cf-4cce-8713-82b1737ced82', 'user12@example.com', '$2b$10$Fjnae1pD5TOfncwR2J8MHOUp8AQ0KSuJuvFFtO7.0cTSn3eJM4LDy', 'User12', NULL, NOW(), NULL),
('01b74f20-52cf-4cce-8713-82b1737ced83', 'user13@example.com', '$2b$10$Fjnae1pD5TOfncwR2J8MHOUp8AQ0KSuJuvFFtO7.0cTSn3eJM4LDy', 'User13', NULL, NOW(), NULL),
('01b74f20-52cf-4cce-8713-82b1737ced84', 'user14@example.com', '$2b$10$Fjnae1pD5TOfncwR2J8MHOUp8AQ0KSuJuvFFtO7.0cTSn3eJM4LDy', 'User14', NULL, NOW(), NULL),
('01b74f20-52cf-4cce-8713-82b1737ced85', 'user15@example.com', '$2b$10$Fjnae1pD5TOfncwR2J8MHOUp8AQ0KSuJuvFFtO7.0cTSn3eJM4LDy', 'User15', NULL, NOW(), NULL),
('01b74f20-52cf-4cce-8713-82b1737ced86', 'user16@example.com', '$2b$10$Fjnae1pD5TOfncwR2J8MHOUp8AQ0KSuJuvFFtO7.0cTSn3eJM4LDy', 'User16', '/path/to/image2', NOW(), NULL),
('01b74f20-52cf-4cce-8713-82b1737ced87', 'user17@example.com', '$2b$10$Fjnae1pD5TOfncwR2J8MHOUp8AQ0KSuJuvFFtO7.0cTSn3eJM4LDy', 'User17', '/path/to/image2', NOW(), NULL),
('01b74f20-52cf-4cce-8713-82b1737ced88', 'user18@example.com', '$2b$10$Fjnae1pD5TOfncwR2J8MHOUp8AQ0KSuJuvFFtO7.0cTSn3eJM4LDy', 'User18', '/path/to/image2', NOW(), NULL),
('01b74f20-52cf-4cce-8713-82b1737ced89', 'user19@example.com', '$2b$10$Fjnae1pD5TOfncwR2J8MHOUp8AQ0KSuJuvFFtO7.0cTSn3eJM4LDy', 'User19', '/path/to/image2', NOW(), NULL);

INSERT INTO Projects (ProjectId, ProjectName, ProjectDescription, CreateDate, UpdateDate)
VALUES 
('02b74f20-52cf-4cce-8713-82b1737ced71', 'Project1', 'Description of Project1', NOW(), NULL),
('02b74f20-52cf-4cce-8713-82b1737ced72', 'Project2', 'Description of Project2', NOW(), NULL),
('02b74f20-52cf-4cce-8713-82b1737ced73', 'Project3', 'Description of Project3', NOW(), NULL),
('02b74f20-52cf-4cce-8713-82b1737ced74', 'Project4', 'Description of Project4', NOW(), NULL),
('02b74f20-52cf-4cce-8713-82b1737ced75', 'Project5', 'Description of Project5', NOW(), NULL),
('02b74f20-52cf-4cce-8713-82b1737ced76', 'Project6', 'Description of Project6', NOW(), NULL),
('02b74f20-52cf-4cce-8713-82b1737ced77', 'Project7', 'Description of Project7', NOW(), NULL),
('02b74f20-52cf-4cce-8713-82b1737ced78', 'Project8', 'Description of Project8', NOW(), NULL),
('02b74f20-52cf-4cce-8713-82b1737ced79', 'Project9', 'Description of Project9', NOW(), NULL),
('02b74f20-52cf-4cce-8713-82b1737ced80', 'Project10', 'Description of Project10', NOW(), NULL),
('02b74f20-52cf-4cce-8713-82b1737ced81', 'Project11', 'Description of Project11', NOW(), NULL),
('02b74f20-52cf-4cce-8713-82b1737ced82', 'Project12', 'Description of Project12', NOW(), NULL),
('02b74f20-52cf-4cce-8713-82b1737ced83', 'Project13', 'Description of Project13', NOW(), NULL),
('02b74f20-52cf-4cce-8713-82b1737ced84', 'Project14', 'Description of Project14', NOW(), NULL),
('02b74f20-52cf-4cce-8713-82b1737ced85', 'Project15', 'Description of Project15', NOW(), NULL);

INSERT INTO States (StateId, Title, ProjectId, CreateDate, UpdateDate)
VALUES 
('03b74f20-52cf-4cce-8713-82b1737ced71', 'State1', '02b74f20-52cf-4cce-8713-82b1737ced71', NOW(), NULL),
('03b74f20-52cf-4cce-8713-82b1737ced72', 'State2', '02b74f20-52cf-4cce-8713-82b1737ced71', NOW(), NULL),
('03b74f20-52cf-4cce-8713-82b1737ced73', 'State3', '02b74f20-52cf-4cce-8713-82b1737ced72', NOW(), NULL),
('03b74f20-52cf-4cce-8713-82b1737ced74', 'State4', '02b74f20-52cf-4cce-8713-82b1737ced72', NOW(), NULL),
('03b74f20-52cf-4cce-8713-82b1737ced75', 'State5', '02b74f20-52cf-4cce-8713-82b1737ced73', NOW(), NULL),
('03b74f20-52cf-4cce-8713-82b1737ced76', 'State6', '02b74f20-52cf-4cce-8713-82b1737ced73', NOW(), NULL),
('03b74f20-52cf-4cce-8713-82b1737ced77', 'State7', '02b74f20-52cf-4cce-8713-82b1737ced74', NOW(), NULL),
('03b74f20-52cf-4cce-8713-82b1737ced78', 'State8', '02b74f20-52cf-4cce-8713-82b1737ced75', NOW(), NULL),
('03b74f20-52cf-4cce-8713-82b1737ced79', 'State9', '02b74f20-52cf-4cce-8713-82b1737ced76', NOW(), NULL),
('03b74f20-52cf-4cce-8713-82b1737ced80', 'State10', '02b74f20-52cf-4cce-8713-82b1737ced77', NOW(), NULL),
('03b74f20-52cf-4cce-8713-82b1737ced81', 'State11', '02b74f20-52cf-4cce-8713-82b1737ced78', NOW(), NULL),
('03b74f20-52cf-4cce-8713-82b1737ced82', 'State12', '02b74f20-52cf-4cce-8713-82b1737ced79', NOW(), NULL),
('03b74f20-52cf-4cce-8713-82b1737ced83', 'State13', '02b74f20-52cf-4cce-8713-82b1737ced80', NOW(), NULL),
('03b74f20-52cf-4cce-8713-82b1737ced84', 'State14', '02b74f20-52cf-4cce-8713-82b1737ced80', NOW(), NULL),
('03b74f20-52cf-4cce-8713-82b1737ced85', 'State15', '02b74f20-52cf-4cce-8713-82b1737ced81', NOW(), NULL);

INSERT INTO Sprints (SprintId, ProjectId, SprintNumber, StartDate, EndDate, CreateDate, UpdateDate)
VALUES 
('04b74f20-52cf-4cce-8713-82b1737ced71', '02b74f20-52cf-4cce-8713-82b1737ced71', 1, '2024-01-01', '2024-01-15', NOW(), NULL),
('04b74f20-52cf-4cce-8713-82b1737ced72', '02b74f20-52cf-4cce-8713-82b1737ced72', 1, '2024-01-01', '2024-01-15', NOW(), NULL),
('04b74f20-52cf-4cce-8713-82b1737ced73', '02b74f20-52cf-4cce-8713-82b1737ced73', 1, '2024-01-01', '2024-01-15', NOW(), NULL),
('04b74f20-52cf-4cce-8713-82b1737ced74', '02b74f20-52cf-4cce-8713-82b1737ced74', 1, '2024-01-01', '2024-01-15', NOW(), NULL),
('04b74f20-52cf-4cce-8713-82b1737ced75', '02b74f20-52cf-4cce-8713-82b1737ced75', 1, '2024-01-01', '2024-01-15', NOW(), NULL);

INSERT INTO WorkItems (WorkItemId, Title, Description, StateId, ProjectId, UserId, SprintId, CreateDate, UpdateDate)
VALUES 
('05b74f20-52cf-4cce-8713-82b1737ced71', 'WorkItem1', 'Description of WorkItem1', '03b74f20-52cf-4cce-8713-82b1737ced71', '02b74f20-52cf-4cce-8713-82b1737ced71', '01b74f20-52cf-4cce-8713-82b1737ced71', '04b74f20-52cf-4cce-8713-82b1737ced71', NOW(), NULL),
('05b74f20-52cf-4cce-8713-82b1737ced72', 'WorkItem2', 'Description of WorkItem2', '03b74f20-52cf-4cce-8713-82b1737ced72', '02b74f20-52cf-4cce-8713-82b1737ced71', '01b74f20-52cf-4cce-8713-82b1737ced72', '04b74f20-52cf-4cce-8713-82b1737ced71', NOW(), NULL),
('05b74f20-52cf-4cce-8713-82b1737ced73', 'WorkItem3', 'Description of WorkItem3', '03b74f20-52cf-4cce-8713-82b1737ced73', '02b74f20-52cf-4cce-8713-82b1737ced72', '01b74f20-52cf-4cce-8713-82b1737ced73', '04b74f20-52cf-4cce-8713-82b1737ced72', NOW(), NULL),
('05b74f20-52cf-4cce-8713-82b1737ced74', 'WorkItem4', 'Description of WorkItem4', '03b74f20-52cf-4cce-8713-82b1737ced74', '02b74f20-52cf-4cce-8713-82b1737ced73', '01b74f20-52cf-4cce-8713-82b1737ced74', '04b74f20-52cf-4cce-8713-82b1737ced73', NOW(), NULL),
('05b74f20-52cf-4cce-8713-82b1737ced75', 'WorkItem5', 'Description of WorkItem5', '03b74f20-52cf-4cce-8713-82b1737ced75', '02b74f20-52cf-4cce-8713-82b1737ced74', '01b74f20-52cf-4cce-8713-82b1737ced75', '04b74f20-52cf-4cce-8713-82b1737ced74', NOW(), NULL);

INSERT INTO PerformanceHistories (HistoryId, ProjectId, UserId, Date, Description, CreateDate, UpdateDate)
VALUES 
('06b74f20-52cf-4cce-8713-82b1737ced71', '02b74f20-52cf-4cce-8713-82b1737ced71', '01b74f20-52cf-4cce-8713-82b1737ced71', NOW(), 'Performance history 1', NOW(), NULL),
('06b74f20-52cf-4cce-8713-82b1737ced72', '02b74f20-52cf-4cce-8713-82b1737ced72', '01b74f20-52cf-4cce-8713-82b1737ced72', NOW(), 'Performance history 2', NOW(), NULL),
('06b74f20-52cf-4cce-8713-82b1737ced73', '02b74f20-52cf-4cce-8713-82b1737ced73', '01b74f20-52cf-4cce-8713-82b1737ced73', NOW(), 'Performance history 3', NOW(), NULL),
('06b74f20-52cf-4cce-8713-82b1737ced74', '02b74f20-52cf-4cce-8713-82b1737ced74', '01b74f20-52cf-4cce-8713-82b1737ced74', NOW(), 'Performance history 4', NOW(), NULL),
('06b74f20-52cf-4cce-8713-82b1737ced75', '02b74f20-52cf-4cce-8713-82b1737ced75', '01b74f20-52cf-4cce-8713-82b1737ced75', NOW(), 'Performance history 5', NOW(), NULL);

INSERT INTO Tags (TagId, TagName, TagColor, WorkItemId, CreateDate, UpdateDate)
VALUES 
('07b74f20-52cf-4cce-8713-82b1737ced71', 'Tag1', 'FFFFFF', '05b74f20-52cf-4cce-8713-82b1737ced71', NOW(), NULL),
('07b74f20-52cf-4cce-8713-82b1737ced72', 'Tag2', '000000', '05b74f20-52cf-4cce-8713-82b1737ced72', NOW(), NULL),
('07b74f20-52cf-4cce-8713-82b1737ced73', 'Tag3', 'FF0000', '05b74f20-52cf-4cce-8713-82b1737ced73', NOW(), NULL),
('07b74f20-52cf-4cce-8713-82b1737ced74', 'Tag4', '00FF00', '05b74f20-52cf-4cce-8713-82b1737ced74', NOW(), NULL),
('07b74f20-52cf-4cce-8713-82b1737ced75', 'Tag5', '0000FF', '05b74f20-52cf-4cce-8713-82b1737ced75', NOW(), NULL);

INSERT INTO Comments (CommentId, CommentText, CommentDate, UserId, WorkItemId, CreateDate, UpdateDate)
VALUES 
('08b74f20-52cf-4cce-8713-82b1737ced71', 'Comment1', NOW(), '01b74f20-52cf-4cce-8713-82b1737ced71', '05b74f20-52cf-4cce-8713-82b1737ced71', NOW(), NULL),
('08b74f20-52cf-4cce-8713-82b1737ced72', 'Comment2', NOW(), '01b74f20-52cf-4cce-8713-82b1737ced72', '05b74f20-52cf-4cce-8713-82b1737ced72', NOW(), NULL),
('08b74f20-52cf-4cce-8713-82b1737ced73', 'Comment3', NOW(), '01b74f20-52cf-4cce-8713-82b1737ced73', '05b74f20-52cf-4cce-8713-82b1737ced73', NOW(), NULL),
('08b74f20-52cf-4cce-8713-82b1737ced74', 'Comment4', NOW(), '01b74f20-52cf-4cce-8713-82b1737ced74', '05b74f20-52cf-4cce-8713-82b1737ced74', NOW(), NULL),
('08b74f20-52cf-4cce-8713-82b1737ced75', 'Comment5', NOW(), '01b74f20-52cf-4cce-8713-82b1737ced75', '05b74f20-52cf-4cce-8713-82b1737ced75', NOW(), NULL);





