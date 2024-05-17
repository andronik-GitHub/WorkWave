// mysql password: nsWp1A04!$sDVzdV#f34

import { Sequelize } from "sequelize";

export const sequelizeConnectoin = new Sequelize("WorkWave", "root", "nsWp1A04!$sDVzdV#f34", {
    dialect: "mysql",
    host: "localhost",
    define: {
        timestamps: false
    }
});

// const mySqlConnection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     database: "WorkWave",
//     password: "nsWp1A04!$sDVzdV#f34"
// });

// mySqlConnection.connect(err => {
//     if (err) return console.error("DB Error: " + err.message);
//     else console.log("DB OK");
// });

// mySqlConnection.end(err => {
//     if (err) return console.error("Error: " + err.message);
//     else console.log("Connection closed");
// });