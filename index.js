const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/connection');
const response = require('./response');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    db.query("SELECT * FROM user", (error, fields) => {
        console.log(fields);
        response(200, fields, "get all user", res);
    });
});

app.get('/:id', (req, res) => {
    const id = req.params.id;
    db.query(`SELECT * FROM user WHERE id = ${id}`, (error, fields) => {
        console.log(fields);
        response(200, fields, "get user by id", res);
    });
});

app.post('/', (req, res) => {
    const { username, password, name } = req.body;
    console.log(req.body);
    const sql = `INSERT INTO user (username, password, name) VALUES
    ('${username}', '${password}', '${name}')`;

    db.query(sql, (err, fields) => {
        if (err) response(500, "Invalid", "Error", res);
        if (fields.affectedRows) {
            response(201, fields, "Berhasil ditambahkan", res);
        };
    })

    res.send('coba post');
});

app.put('/:id', (req, res) => {
    const id = req.params.id;
    const { username, password, name } = req.body;

    const sql = `UPDATE user SET username = '${username}', 
    password = '${password}', name = '${name}' WHERE id = ${id}`;

    db.query(sql, (err, fields) => {
        if(err) response(500, "Invalid", "Error", res);
        if (fields.affectedRows) {
            response(200, fields, "Berhasil ubah", res);
        };
    })
});

app.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.query(`DELETE FROM user WHERE id = ${id}`, (error, fields) => {
        console.log(fields);
        response(200, fields, "get user by id", res);
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});