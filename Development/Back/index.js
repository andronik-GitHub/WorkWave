// npm run start:dev - npm install nodemon
// mysql password: nsWp1A04!$sDVzdV#f34
// send email: https://ethereal.email/messages

import express from 'express';
import multer from 'multer';
import { sequelizeConnection } from './db_settings.js';
import cors from 'cors';

import stateRouter from './routes/stateRouter.js';
import commentRouter from './routes/commentRouter.js';
import workItemRouter from './routes/workItemRouter.js';
import tagRouter from './routes/tagRouter.js';
import performanceHistoryRouter from './routes/performanceHistoryRouter.js';
import memberRouter from './routes/memberRouter.js';
import projectRouter from './routes/projectRouter.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';



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
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.post('/upload', upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

// Routes
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/projects', projectRouter);
app.use('/sprints', memberRouter);
app.use('/members', memberRouter);
app.use('/performance-histories', performanceHistoryRouter);
app.use('/tags', tagRouter);
app.use('/work-items', workItemRouter);
app.use('/comments', commentRouter);
app.use('/states', stateRouter);


app.listen(4444, async (err) => {
    if (err) {
        return console.log(err);
    }
    
    try {
        await sequelizeConnection.authenticate();
        console.log("DB OK");

        console.log('Server OK');
    }
    catch (error) {
        console.error("Unable to connect to the database: ", error);
    }
});