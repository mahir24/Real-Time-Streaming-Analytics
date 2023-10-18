"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mysql = require("mysql");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
app.use(cors());
app.use(bodyParser.json());
//create a connection
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'anime_metrics_password',
    database: 'anime_metrics'
});
//connect to db
db.connect(function (err) {
    if (err)
        throw err;
    console.log('Connected to the database');
});
//insert into MySQL db
app.post('/insert', function (req, res) {
    var _a = req.body, anime = _a.anime, viewerCount = _a.viewerCount, averageWatchTime = _a.averageWatchTime;
    var sql = 'INSERT INTO anime_metrics.metrics (anime, viewerCount, averageWatchTime) VALUES (?, ?, ?)';
    db.query(sql, [anime, viewerCount, averageWatchTime], function (err, result) {
        if (err)
            throw err;
        res.send('Data inserted');
    });
});
app.listen(4000, function () {
    console.log('Server running on port 4000');
});
