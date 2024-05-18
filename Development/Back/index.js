// npm run start:dev - npm install nodemon
// mysql password: nsWp1A04!$sDVzdV#f34

import express from 'express';
import multer from 'multer';
import { sequelizeConnectoin } from './db_settings.js';
import { handleValidationErrors, checkAuth } from "./utils/index.js";

import { loginValidation, registrationValidation } from "./validations/auth.js";
import { createProjectValidation, updateProjectValidation } from './validations/project.js';
import { createSprintValidation, updateSprintValidation } from './validations/sprint.js';
import { createMemberValidation } from './validations/member.js';
import { createPerformanceHistoryValidation, updatePerformanceHistoryValidation } from './validations/performanceHistory.js';
import { createWorkItemValidation, updateWorkItemValidation } from './validations/workItem.js';
import { createTagValidation, updateTagValidation } from './validations/tag.js';
import { createCommentValidation, updateCommentValidation } from './validations/comment.js';
import { updateUserValidation } from './validations/user.js';

import { 
    UserController, 
    ProjectController, 
    SprintController, 
    MemberController,
    PerformanceHistoryController,
    WorkItemController,
    TagController,
    CommentController
} from "./controllers/index.js";



const app = express();

const storage = multer.diskStorage({
    destination: (temp1, temp, cb) => {
        cb(null, 'uploads');
    },
    filename: (temp1, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.post('/upload', upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});



// authorization
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/registration', registrationValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

// CRUD Users
app.get('/users', UserController.getAll);
app.get('/users/:id', UserController.getById);
app.delete('/users/:id', UserController.remove);
app.patch('/users/update', checkAuth, updateUserValidation, handleValidationErrors, UserController.update);

// CRUD Projects
app.get('/projects', ProjectController.getAll);
app.get('/projects/:id', ProjectController.getById);
app.post('/projects/create', checkAuth, createProjectValidation, handleValidationErrors, ProjectController.create);
app.delete('/projects/:id', checkAuth, ProjectController.remove);
app.patch('/projects/update', checkAuth, updateProjectValidation, handleValidationErrors, ProjectController.update);

// CRUD Sprints
app.get('/sprints', SprintController.getAll);
app.get('/sprints/:id', SprintController.getById);
app.post('/sprints/create', checkAuth, createSprintValidation, handleValidationErrors, SprintController.create);
app.patch('/sprints/update', checkAuth, updateSprintValidation, handleValidationErrors, SprintController.update);
app.delete('/sprints/:id', checkAuth, SprintController.remove);

// CRD Members
app.get('/members', MemberController.getAll);
app.get('/members/:userId/:projectId', MemberController.getById);
app.post('/members/create', checkAuth, createMemberValidation, handleValidationErrors, MemberController.create);
app.delete('/members/:userId/:projectId', checkAuth, MemberController.remove);

// CRUD PerformanceHistories
app.get('/performance-histories', PerformanceHistoryController.getAll);
app.get('/performance-histories/:id', PerformanceHistoryController.getById);
app.post(
    '/performance-histories/create', 
    checkAuth, 
    createPerformanceHistoryValidation, 
    handleValidationErrors, 
    PerformanceHistoryController.create
);
app.patch(
    '/performance-histories/update', 
    checkAuth, 
    updatePerformanceHistoryValidation, 
    handleValidationErrors, 
    PerformanceHistoryController.update
);
app.delete('/performance-histories/:id', checkAuth, PerformanceHistoryController.remove);

// CRUD WorkItems
app.get('/work-items', WorkItemController.getAll);
app.get('/work-items/:id', WorkItemController.getById);
app.post('/work-items/create', checkAuth, createWorkItemValidation, handleValidationErrors, WorkItemController.create);
app.patch('/work-items/update', checkAuth, updateWorkItemValidation, handleValidationErrors, WorkItemController.update);
app.delete('/work-items/:id', WorkItemController.remove);

// CRUD Tags
app.get('/tags', TagController.getAll);
app.get('/tags/:id', TagController.getById);
app.post('/tags/create', checkAuth, createTagValidation, handleValidationErrors, TagController.create);
app.patch('/tags/update', checkAuth, updateTagValidation, handleValidationErrors, TagController.update);
app.delete('/tags/:id', TagController.remove);

// CRUD Comments
app.get('/comments', CommentController.getAll);
app.get('/comments/:id', CommentController.getById);
app.post('/comments/create', checkAuth, createCommentValidation, handleValidationErrors, CommentController.create);
app.patch('/comments/update', checkAuth, updateCommentValidation, handleValidationErrors, CommentController.update);
app.delete('/comments/:id', CommentController.remove);


app.listen(4444, async (err) => {
    if (err) {
        return console.log(err);
    }
    
    try {
        await sequelizeConnectoin.authenticate();
        console.log("DB OK");
    }
    catch (error) {
        console.error("Unable to connect to the database: ", error);
    }

    console.log('Server OK');
});