blater
#5850



blater — 2021.03.01. 오후 1:32
大田区東海
blater — 오늘 오후 7:53
cap.cgkniduhfo36.ap-northeast-2.rds.amazonaws.com
blater — 오늘 오후 8:56
const express = require("express"); // npm i express | yarn add express
const cors    = require("cors");    // npm i cors | yarn add cors
const mysql   = require("mysql");   // npm i mysql | yarn add mysql
const app     = express();
const bodyParser = require('body-parser');
const moment  = require('moment');
확장
message.txt
5KB
﻿
const express = require("express"); // npm i express | yarn add express
const cors    = require("cors");    // npm i cors | yarn add cors
const mysql   = require("mysql");   // npm i mysql | yarn add mysql
const app     = express();
const bodyParser = require('body-parser');
const moment  = require('moment');
const PORT    = 3001; // 포트번호 설정

// MySQL 연결
const db = mysql.createPool({
    host: "cap.cgkniduhfo36.ap-northeast-2.rds.amazonaws.com", // 호스트
    user: "mastart",      // 데이터베이스 계정
    password: "alsgh7127",      // 데이터베이스 비밀번호
    database: "station_1",  // 사용할 데이터베이스
});

app.use(cors({
    origin: "*",                // 출처 허용 옵션
    credentials: true,          // 응답 헤더에 Access-Control-Allow-Credentials 추가
    optionsSuccessStatus: 200,  // 응답 상태 200으로 설정
}))

app.use(bodyParser.json());
// post 요청 시 값을 객체로 바꿔줌
app.use(express.urlencoded({ extended: true }));


// 서버 연결 시 발생
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});


app.get("/api/company", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    
    const sqlQuery = "SELECT * FROM station_1";

    db.query(sqlQuery, (err, result) => {
        res.send(result);
    });
});

app.get("/edge_server_data_1", (req, res) => {
    const sqlQuery = "SELECT * FROM edge_server_data WHERE ID = 1;";

    console.log(`abc`);
    db.query(sqlQuery, (err, result) => {
        if (err) {
            console.log(error);
            res.status(500).send('Error retrieving data from database');
            } else {
            res.json(result);
            }
    });
});

app.get("/edge_server_data_2", (req, res) => {
    const sqlQuery = "SELECT * FROM edge_server_data_2 WHERE ID = 1;";

    db.query(sqlQuery, (err, result) => {
        if (err) {
            console.log(error);
            res.status(500).send('Error retrieving data from database');
            } else {
            res.json(result);
            }
    });
});


app.get('/data', (req, res) => {
    // const { date } = req.query;
  
    // const query = `SELECT * FROM data_time WHERE DATE(DATA_time) = '${date}'`;
  
    // db.query(query, (error, results, fields) => {
    //   if (error) throw error;
    //   res.json(results);
    // });
    const selectedDate = req.query.date;
    const nextDay = moment(selectedDate).add(1, 'day').format('YYYY-MM-DD');
    const query = `SELECT * FROM data_time WHERE DATE(DATA_time) = '${nextDay}'`;

    db.query(query, (error, results) => {
        if (error) {
        console.log(error);
        res.status(500).send('Error retrieving data from database');
        } else {
        res.json(results);
        }
    });
  });

app.post('/install', (req, res) => {
    const { option1, option2 } = req.body;
    console.log(req.body);
    console.log(req.body.data.option1);

    const sql = `UPDATE edge_server_data SET edge_server_memory = '${req.body.data.option1}' , edge_server_ip = '${req.body.data.option2}' WHERE ID = 1;`;

    db.query(sql, (err, result) => {
        if (err) {
            console.log(sql);
            console.log('Error');
            res.sendStatus(500);
        } else {
            console.log('Data inserted successfully');
            res.sendStatus(200);
        }
    });
});

app.post('/num1', (req, res) => {
    const { num1 } = req.body;
    console.log(req.body.num1);

    const sql = `UPDATE station_1.edge_server_data SET edge_server_memory = edge_server_memory - '${req.body.num1}' WHERE ID=1;`;

    db.query(sql, (err, result) => {
        if (err) {
            console.log(sql);
            console.log('Error');
            res.sendStatus(500);
        } else {
            console.log('Data inserted successfully');
            res.sendStatus(200);
        }
    });
});

app.post('/num2', (req, res) => {
    const { num2 } = req.body;
    console.log(req.body.num2);

    const sql = `UPDATE station_1.edge_server_data_2 SET edge_server_memory = edge_server_memory - '${req.body.num2}' WHERE ID=1;`;

    db.query(sql, (err, result) => {
        if (err) {
            console.log(sql);
            console.log('Error');
            res.sendStatus(500);
        } else {
            console.log('Data inserted successfully');
            res.sendStatus(200);
        }
    });
});


app.use(express.urlencoded({ extended: true }))