// npm run start:dev - npm install nodemon

import express from 'express';
import jwt from 'jsonwebtoken';
import sql from 'mssql';
import cors from 'cors';


const app = express();

app.use(cors());

const config = {
    user: "kazmi",
    password: "1234",
    server: "ANDRONIK-LAPTOP",
    database: "WorkWave",
    options: {
        trustServerCertificate: true,
        trustedConnection: false,
        enableArithAbort: true,
        instancename: "SQLEXPRESS",
    },
    port: 1433
};

app.get('/', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const data = pool.request().query("SELECT * FROM Users");
        data.then(res1 => {
            return res.json(res1);
        });
    }
    catch(err) {
        console.log(err);
    }
});


app.use(express.json());

app.post('/auth/login', (req, res) => {
    console.log(req.body);

    const token = jwt.sign({
        email: req.body.email,
        fullName: "UserName",
    }, 'BFDS83S30GS29JAD010KBHS204');

    res.json({
        success: true,
        token,
    });
});

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
});