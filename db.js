const mysql = require ('mysql');

const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: '(xampp nya eror pak)'
})

db.connect ((err) => {
    if (err) throw err;
    console.log('Database connected...');
});
module.exports = db;